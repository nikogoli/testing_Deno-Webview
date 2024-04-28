import { Webview, SizeHint } from "niko-app/mod_webview.ts"
import { setHTML, timeKeeper } from 'niko-app/by-esbuild/mod.ts'
import { join, dirname } from "https://deno.land/std@0.171.0/path/mod.ts"

import { VIEW_CONFIG, IMPORT_MAP_PATH, DENO_JSON_PATH } from "./settings.ts"

// ------- Set Web worker ----------
const myWorker = VIEW_CONFIG.use_worker
  ? new Worker(
      join(dirname(import.meta.url), "worker.ts"),
      { type: "module" },
    )
  : null


const keeper = timeKeeper("Main", "magenta")


// ------- Create Home html ---------

Deno.env.delete("ToppageFilePath")
const { html } = await setHTML({
  config: VIEW_CONFIG,
  route: "index.tsx",
  save_file: true,
  import_map_path: IMPORT_MAP_PATH,
  deno_json_path: DENO_JSON_PATH
})
.then(result => {
    keeper.count("setHTML")
    
    if (VIEW_CONFIG.use_worker){
      Deno.env.set("ToppageFilePath", result.file_path)
      Deno.env.delete("RoutesDict")
    }

    return result
  }
 )

 
// ------- Start WebView ---------
const webview = new Webview(true, {
  width: VIEW_CONFIG.size[0],
  height:VIEW_CONFIG.size[1],
  hint: SizeHint.FIXED
})
webview.title = VIEW_CONFIG.title

webview.navigate(
  (VIEW_CONFIG.use_worker)
    ? `http://localhost:${VIEW_CONFIG.port}/`
    : `data:text/html, ${encodeURIComponent(html)}`
)

keeper.count("start WebView")
webview.run()
myWorker?.terminate()
webview.destroy()
Deno.exit()