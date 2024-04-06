import { setHTML, serve, timeKeeper } from 'niko-app/by-esbuild/mod.ts'
import { contentType } from "https://deno.land/std@0.177.0/media_types/mod.ts"

import { PageProps, TextInfo } from "./types.ts"
import { VIEW_CONFIG, IMPORT_MAP_PATH, DENO_JSON_PATH } from "./settings.ts"

const HEADER_OPTION = {
  'Access-Control-Allow-Method':  'OPTIONS, GET, POST',
  'Access-Control-Allow-Headers': 'Content-Type, Origin',
  'Access-Control-Allow-Origin': 'null'
}


const Text_Info:TextInfo  = await Deno.readTextFile("./static/sango_shu/info.json").then(tx => JSON.parse(tx))


serve({
  "/" : async (_request) => {
    const html = await Deno.readTextFile(Deno.env.get("ToppageFilePath")!)
    const headers = new Headers({...HEADER_OPTION, "Content-Type":contentType("text/html")})
    return new Response(html, {headers, status: 200})
  },


  "/index/:title": async (_request, params) => {
    const keeper = timeKeeper("Worker")
    const title = params!["title"]!

    const PropsSetter: ()=>PageProps = () => {
      const data = Text_Info.texts_data.find(d => d.title == decodeURI(title))
      return data ?? { title: null }
    }

    const { html } = await setHTML({
      config: VIEW_CONFIG,
      route: "Page.tsx",
      save_file: false,
      props_setter: PropsSetter,
      import_map_path: IMPORT_MAP_PATH,
      deno_json_path: DENO_JSON_PATH,
    })
    
    keeper.count("page")
    keeper.total()
    const headers = new Headers({...HEADER_OPTION, "Content-Type":`text/html`})
    return new Response(html, {headers, status: 200})
  },

  404: (_request) => { 
    const headers = new Headers({...HEADER_OPTION, "Content-Type":contentType("text/plain")})
    return new Response("", {headers, status: 404})
  }
}, {port: VIEW_CONFIG.port})