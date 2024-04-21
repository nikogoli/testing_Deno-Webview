import { renderToString } from "https://esm.sh/preact-render-to-string@6.2.1?deps=preact@10.15.1"
import * as esbuild from "https://deno.land/x/esbuild@v0.19.2/mod.js"
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.2/mod.ts"
import { toFileUrl, resolve } from "https://deno.land/std@0.200.0/path/mod.ts"
import { contentType } from "https://deno.land/std@0.200.0/media_types/mod.ts"
import { green, blue, red, cyan } from "https://deno.land/std@0.200.0/fmt/colors.ts"

import Page from "./Page.tsx"

import { defineConfig } from "https://esm.sh/@twind/core@1.1.3";
const TwindConfig =  {
  ...defineConfig({
    hash: false,
  })
}
const twind_config_script = `twind.install(${JSON.stringify(TwindConfig)})`


const CRIENT_PATH = "Client.tsx"
const _TEMP_MAP_NAME = "temp_map.json"

const HEADER_OPTION = {
  'Access-Control-Allow-Method':  'OPTIONS, GET, POST',
  'Access-Control-Allow-Headers': 'Content-Type, Origin',
  'Access-Control-Allow-Origin': 'null'
}


const PAGE_PATHS = [
  "./page_1.txt",
  "./page_2.txt",
  "./page_3.txt",
]
const MAX_LEN = 3


Deno.serve(
  {port: 8080},
  async (req) => {
  const url = new URL(req.url)

  // ---------- to root ---------------
  if (url.href == "http://localhost:8080/"){
    const html = await Deno.readTextFile(Deno.env.get("ToppageFilePath")!)
    const headers = new Headers({...HEADER_OPTION, "Content-Type":contentType("text/html")})
    console.log(`[${cyan("Worker")}] ${green(url.href)} ${blue("OK")}`)
    return new Response(html, {headers, status: 200})
  }


  // ---------- to subpages ---------------
  else if (new URLPattern({ pathname: '/page/:page_idx' }).exec(url)){
    const page_idx = Number(new URLPattern({ pathname: '/page/:page_idx' }).exec(url)!.pathname.groups["page_idx"]!)
    const path = PAGE_PATHS.at(page_idx-1)!
    const title = path.split("/").at(-1)!.split(".")[0]
    const text = await Deno.readTextFile(path)

    await Deno.readTextFile("./deno.json")
      .then(tx => JSON.parse(tx) as Record<string, Record<string, string>>).then(jdata => jdata.imports)
      .then(imports => {
        Deno.writeTextFile(_TEMP_MAP_NAME, JSON.stringify({imports}))
      })

    const importMapURL = toFileUrl(resolve(_TEMP_MAP_NAME)).href

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
            <Page {...{info:{title, text, page_idx}, max_len:MAX_LEN}} />
          </body>
        </html>
      )
    }
    const headers = new Headers({...HEADER_OPTION, "Content-Type":contentType("html")})
    console.log(`[${cyan("Worker")}] ${green(url.href)} ${blue("OK")}`)
    return new Response(renderToString(View()), {headers, status: 200})
  }

  
  // ---------- 404 ---------------
  else {
    const headers = new Headers({...HEADER_OPTION, "Content-Type":contentType("text/plain")})
    console.log(`[${cyan("Worker")}] ${green(url.href)} ${red("404")}`)
    return new Response("", {headers, status: 404})
  }
})