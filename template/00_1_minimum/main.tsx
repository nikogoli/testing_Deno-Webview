/** @jsx h */
import { h } from "https://esm.sh/preact@10.15.1"
import { renderToString } from "https://esm.sh/preact-render-to-string@6.2.1?deps=preact@10.15.1"
import { bundle } from "https://deno.land/x/emit@0.31.0/mod.ts"
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
const script = await bundle(CRIENT_PATH).then(result => result.code)


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
        <App />
      </body>
    </html>
  )
}

const webview = new Webview(true, {width: 600, height: 400, hint: SizeHint.NONE})
webview.title = "Deno App"
webview.navigate(`data:text/html, ${encodeURIComponent(renderToString(View()))}`)

webview.run()