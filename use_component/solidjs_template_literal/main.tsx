/** @jsx h */
import { Webview, SizeHint } from "https://deno.land/x/webview@0.7.4/mod.ts"
import { h, type VNode } from "https://esm.sh/preact@10.10.6"
import { renderToString } from "https://esm.sh/preact-render-to-string@5.2.2"
import { encode } from "https://deno.land/std@0.156.0/encoding/base64.ts"

let SIZE: undefined | {width:number, height:number} = undefined
let GoogleFonts: Array<string> = []

// ---------- Settings ---------

const TITLE = "Deno App"             // application name shown at the title bar
SIZE = { width: 600, height: 400 }   // size of the application window
const SCRIPT_PATH = "App.js"      // path to the main solidjs-script file
const COMPONENT_PATH = "Components.js" // path to the script file that defines components

GoogleFonts = [
  "Zen Maru Gothic",
  "Yusei Magic",
]

// ----------------------------

const script = await Deno.readTextFile(SCRIPT_PATH)

const fontlink = (GoogleFonts.length > 0)
  ? GoogleFonts.reduce((txt, f) => txt+`family=${f.replaceAll(" ", "+")}&`, "https://fonts.googleapis.com/css2?") + "display=swap"
  : ""

const component_URL = await Deno.readTextFile(COMPONENT_PATH)
    .then( data => encode(data) ).then( tx => `data:text/javascript;base64,${tx}` )

function View(){
  return (
    <html>
      <head>
        <meta charSet="utf-8"/>
        <link href={fontlink} rel="stylesheet"></link>
        <script type="module" src="https://cdn.skypack.dev/twind/shim"></script>
        <script type="module" dangerouslySetInnerHTML={{__html: script}}></script>
      </head>
      <body>
        <style> {`body { font-family: \'${GoogleFonts[0]}\'}`} </style>
      </body>
    </html>
  )
}

const webview = (SIZE !== undefined)
  ? new Webview(true, {...SIZE, hint: SizeHint.FIXED})
  : new Webview(true)

webview.navigate(`data: text/html; charset=utf-8, ${encodeURIComponent(renderToString(View()))}`)
webview.title = TITLE

webview.bind("BIND_component_URL", () => component_URL)

webview.run()