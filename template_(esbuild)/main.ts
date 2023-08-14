import { Webview, SizeHint } from "https://deno.land/x/webview@0.7.4/mod.ts"
import { join, dirname } from "https://deno.land/std@0.177.0/path/mod.ts"

import { setHTML } from "./utils/setHTML.tsx"
import { VIEW_CONFIG } from "./settings.ts"


// ------- Set Web worker ----------
const worker = (VIEW_CONFIG.USE_WORKER)
  ? new Worker(
      join(dirname(import.meta.url), "worker.ts"),
      { type: "module" },
    )
  : {terminate: () => {}}


// -------- get import-map URL --------
let import_map_url: string | undefined = undefined
try {
  import_map_url = await Deno.readTextFile("./deno.json")
    .then(tx => JSON.parse(tx) as Record<string, string>).then(jdata => jdata.importMap)
  if (import_map_url){
    Deno.env.set("import_map_url", import_map_url)
  }
} catch (_error) {
  // pass
}


// ------- Create Home html ---------
Deno.env.delete("RoutesDict")

const { file_path } = await setHTML({
  route: "index.tsx",
  save_file: true,
  import_map_url
})

if (VIEW_CONFIG.USE_WORKER){
  Deno.env.set("ToppageFilePath", file_path)
}

console.log({file_path})

// ------- Start webview ---------
const [width, height] = VIEW_CONFIG.SIZE
const webview = new Webview(true, {width, height, hint: SizeHint.FIXED})
const dat = await Deno.readTextFile(file_path)

webview.navigate( VIEW_CONFIG.USE_WORKER
  ? `data:text/html, ${encodeURIComponent(dat)}`//`http://localhost:${VIEW_CONFIG.PORT}/`
  : file_path
)

//worker.terminate()