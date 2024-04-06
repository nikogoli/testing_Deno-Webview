import { serve, siftLog, red, timeKeeper } from 'niko-app/by-esbuild/mod.ts'
import { contentType } from "https://deno.land/std@0.177.0/media_types/mod.ts"
import { walk } from "https://deno.land/std@0.155.0/fs/mod.ts"
import { dirname } from "https://deno.land/std@0.171.0/node/path.ts"

import { ReturndHierarchy } from "./types.ts"
import { VIEW_CONFIG } from "./settings.ts"


const HEADER_OPTION = {
  'Access-Control-Allow-Method':  'OPTIONS, GET, POST',
  'Access-Control-Allow-Headers': 'Content-Type, Origin',
  'Access-Control-Allow-Origin': 'null'
}

const BASE_PATH = decodeURI(dirname(import.meta.url).replace("file:///", ""))

function set_data(names:Array<string>, data:Record<string, any>){
  if (names.length == 1){
    data[names[0]] = null
  } else {
    if (!(names[0] in data)){ data[names[0]] = {} }
    set_data(names.slice(1), data[names[0]])
  }
}

const file_iteratior = walk(BASE_PATH,
  { maxDepth: 3, match: [/\.tsx$/, /\.ts$/, /\.jsx$/, /\.js$/, /\.txt$/, /\.json$/, /\.md$/] }
)

const name_to_path_dict:  Record<string, string> = {}
const hierarchy: Record<string, any> = {}
for await (const fl of file_iteratior){
  const pathnames = fl.path.replaceAll("\\", "/").replace(BASE_PATH+"/", "").split("/")
  set_data(pathnames, hierarchy)
  name_to_path_dict[fl.name] = fl.path
}

serve({
  "/" : async (_request) => {
    const html = await Deno.readTextFile(Deno.env.get("ToppageFilePath")!)
    const headers = new Headers({...HEADER_OPTION, "Content-Type":contentType("text/html")})
    return new Response(html, {headers, status: 200})
  },


  "/api/files/:name": async (_request, params) => {
    const keeper = timeKeeper("Worker")
    const name = params!["name"]!
    let headers: Headers
    let output: string

    if (name == "all"){
      const Data: ReturndHierarchy = {names :hierarchy, root: BASE_PATH.split("/").at(-1)!}
      headers = new Headers({...HEADER_OPTION, "Content-Type":`application/json`})
      output = JSON.stringify(Data)
    }
    else if (name in name_to_path_dict){
      const tx = await Deno.readTextFile(name_to_path_dict[name])
      headers = new Headers({...HEADER_OPTION, "Content-Type":`text/plain`})
      output = tx
    }
    else {
      console.log("Failed: find file")
      throw new Error()
    }
    keeper.count("file")
    keeper.total()
    return new Response(output, {headers, "status" : 200 })
  },


  "/api/save/:name": async (request, params) => {
    const keeper = timeKeeper("Worker")
    const name = params!["name"]!

    const tx = await request.text()
    await Deno.writeTextFile(name_to_path_dict[name], tx)
    keeper.count("save")
    keeper.total()

    const headers = new Headers({...HEADER_OPTION, "Content-Type":`text/plain`})
    return new Response("", {headers: headers, status: 200})
  },

  404: (_request) => { 
    const headers = new Headers({...HEADER_OPTION, "Content-Type":contentType("text/plain")})
    return new Response("", {headers, status: 404})
  }
}, {port: VIEW_CONFIG.port})