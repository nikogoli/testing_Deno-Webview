import Babel from "https://esm.sh/@babel/standalone@7.19.2"
import solid from "https://esm.sh/babel-preset-solid@1.5.5"

type CompileResult = {
  ok: true,
  code: string
} | {
  ok: false,
  message: string
}

export async function Compile_to_JS( props: {
  path: string,
  SOLID_URL: { solidJS: string, solidJS_web: string},
}): Promise<CompileResult> {
  const {solidJS, solidJS_web} = props.SOLID_URL
  const script_text = await Deno.readTextFile(props.path)

  Babel.registerPreset("solid", solid())    
  const { code } = Babel.transform(script_text, {presets: ["solid"]})

  if (code){
    const url_resolved = code
      .replaceAll('"solid-js/web"', `"${solidJS_web}"`)
      .replaceAll('"solid-js"', `"${solidJS}"`)
    return { ok: true, code: url_resolved }
  } else {
    return { ok: false, message: "Babel.transform() failed to return code." }
  }
}