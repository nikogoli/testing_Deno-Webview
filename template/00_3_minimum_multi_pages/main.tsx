import { renderToString } from "https://esm.sh/preact-render-to-string@6.2.1?deps=preact@10.15.1"
import * as esbuild from "https://deno.land/x/esbuild@v0.19.2/mod.js"
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.2/mod.ts"
import { toFileUrl, resolve } from "https://deno.land/std@0.200.0/path/mod.ts"
import { join, dirname } from "https://deno.land/std@0.200.0/path/mod.ts"
import { Webview, SizeHint } from "jsr:@webview/webview"

import App from "./App.tsx"

import { defineConfig } from "https://esm.sh/@twind/core@1.1.3";
const TwindConfig =  {
  ...defineConfig({
    hash: false,
  })
}
const twind_config_script = `twind.install(${JSON.stringify(TwindConfig)})`


const CRIENT_PATH = "Client.tsx"
const _TEMP_MAP_NAME = "temp_map.json"

await Deno.readTextFile("./deno.json")
  .then(tx => JSON.parse(tx) as Record<string, Record<string, string>>).then(jdata => jdata.imports)
  .then(imports => {
    Deno.writeTextFile(_TEMP_MAP_NAME, JSON.stringify({imports}))
  })

const importMapURL = toFileUrl(resolve(_TEMP_MAP_NAME)).href

const TITLES = [
  "ページその1",
  "ページその2",
  "ページその3"
]


// ------- Set Web worker ----------
const myWorker =  new Worker(
      join(dirname(import.meta.url), "worker.tsx"),
      { type: "module" },
    )


// ------- bundle and create HTML ----------
esbuild.initialize({})
const script = await esbuild.build({
  plugins: [ ...denoPlugins({importMapURL}) ],
  entryPoints: { main: toFileUrl(resolve(CRIENT_PATH)).href },
  bundle: true,
  format: "esm",
  platform: "neutral",
  outfile: "bundled.js",
  jsx: "automatic",
  jsxImportSource: "preact",
}).then((_result: unknown) => Deno.readTextFile("./bundled.js"))
esbuild.stop()

await Deno.remove("./bundled.js")
await Deno.remove(_TEMP_MAP_NAME)

function View(){
  return(
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <script src="https://cdn.twind.style" crossOrigin="true"></script>
        <script dangerouslySetInnerHTML={{__html: twind_config_script}}></script>
        <script type="module" dangerouslySetInnerHTML={{__html: script}}></script>
      </head>
      <body>
        <App {...{titles:TITLES, max_len: TITLES.length}}/>
      </body>
    </html>
  )
}
const html = renderToString(View())


// ------- save HTML as a file ----------
const tempFilePath = await Deno.makeTempFile({suffix: ".html"})
await Deno.writeTextFile(tempFilePath, html)
Deno.env.delete("ToppageFilePath")
Deno.env.set("ToppageFilePath", tempFilePath)


// ------- navigate to webworker ----------
const webview = new Webview(true, {width: 600, height: 400, hint: SizeHint.NONE})
webview.title = "Deno App"
webview.navigate(`http://localhost:8080/`)

webview.run()
myWorker.terminate()