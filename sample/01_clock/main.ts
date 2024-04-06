import { Webview, SizeHint } from "niko-app/mod_webview.ts"
import { setHTML, timeKeeper } from 'niko-app/by-esbuild/mod.ts'
import { join, dirname } from "https://deno.land/std@0.171.0/path/mod.ts"

import { VIEW_CONFIG, IMPORT_MAP_PATH, DENO_JSON_PATH } from "./settings.ts"

// ------- Set Web worker ----------
const _myWorker = VIEW_CONFIG.use_worker
  ? new Worker(
      join(dirname(import.meta.url), "worker.ts"),
      { type: "module" },
    )
  : null


// -------- get import-map URL --------
const _TEMP_MAP_NAME = "temp_map.json"
let import_map_url: string | undefined = undefined
try {
  if (IMPORT_MAP_PATH){
    await Deno.readTextFile("./import_map.json")
    import_map_url = "./import_map.json"
  } else {
    throw new Error()
  }
} catch (_error) {
  if (DENO_JSON_PATH){
    try {
      const imports = await Deno.readTextFile(DENO_JSON_PATH)
      .then(tx => JSON.parse(tx) as Record<string, Record<string, string>>).then(jdata => jdata.imports)
      if (imports){
        await Deno.writeTextFile(_TEMP_MAP_NAME, JSON.stringify({imports}))
        import_map_url = `./${_TEMP_MAP_NAME}`  
      }
    } catch (_error) {
     // pass 
    }
  }
}
const keeper = timeKeeper("Main", "magenta")


// ------- Create Home html ---------

Deno.env.delete("ToppageFilePath")
const { html } = await setHTML({
  config: VIEW_CONFIG,
  route: "index.tsx",
  save_file: false,
  import_map_url: import_map_url,
})
.then( async result => {
    keeper.count("setHTML")
    
    if (VIEW_CONFIG.use_worker){
      Deno.env.set("ToppageFilePath", result.file_path)
      Deno.env.delete("RoutesDict")
    }
    if (import_map_url == `./${_TEMP_MAP_NAME}`){
      await Deno.remove(_TEMP_MAP_NAME)
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