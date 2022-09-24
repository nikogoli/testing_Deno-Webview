/** @jsx h */
import { h, type VNode } from "https://esm.sh/preact@10.10.6"
import { renderToString } from "https://esm.sh/preact-render-to-string@5.2.2"
import { bundle } from "https://deno.land/x/emit@0.9.0/mod.ts"
import { Webview, SizeHint } from "https://deno.land/x/webview@0.7.4/mod.ts"

import App from "./App.tsx"


let SIZE: undefined | {width:number, height:number} = undefined
let GoogleFonts: Array<string> = []

// ---------- Settings ---------

const TITLE = "Deno App"             // application name shown at the title bar
SIZE = { width: 600, height: 400 }   // size of the application window
const CRIENT_PATH = "Client.tsx"     // path to the preact file for hydration

GoogleFonts = [
  "Zen Maru Gothic",
  "Yusei Magic",
]

// ----------------------------

const script = await bundle(CRIENT_PATH).then(result => result.code)


const fontlink = (GoogleFonts.length > 0)
  ? GoogleFonts.reduce((txt, f) => txt+`family=${f.replaceAll(" ", "+")}&`, "https://fonts.googleapis.com/css2?") + "display=swap"
  : ""

function View(){
  return(
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <link href={fontlink} rel="stylesheet"></link>
        <script type="module" src="https://cdn.skypack.dev/twind/shim"></script>
        <script type="module" dangerouslySetInnerHTML={{__html: script}}></script>
      </head>
      <body>
        <App />
        <style> {`body { font-family: \'${GoogleFonts[0]}\'}`} </style>
      </body>
    </html>
  )
}

const webview = (SIZE !== undefined)
  ? new Webview(true, {...SIZE, hint: SizeHint.FIXED})
  : new Webview(true)

webview.navigate(`data:text/html, ${encodeURIComponent(renderToString(View()))}`)
webview.title = TITLE

webview.run()