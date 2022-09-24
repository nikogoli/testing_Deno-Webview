//@ts-check
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

// @deno-types="https://esm.sh/v94/solid-js@1.5.4/types/index.d.ts"
import { createSignal, onCleanup, } from "https://cdn.skypack.dev/solid-js"
// @deno-types="https://esm.sh/v94/solid-js@1.5.4/web/types/index.d.ts"
import { render } from "https://cdn.skypack.dev/solid-js/web"
// @deno-types="https://esm.sh/v94/solid-js@1.5.4/html/types/index.d.ts"
import html from "https://cdn.skypack.dev/solid-js/html"

import { TbBrandDeno } from "https://esm.sh/solid-icons@1.0.1/tb"



const App = () => {

  const [time, setTime] = createSignal( new Date().toTimeString().split(" ")[0] )
  
  const timer = setInterval( () => setTime(new Date().toTimeString().split(" ")[0]), 1000 )
  onCleanup( () => clearInterval(timer) )

  return html`
    <div class='h-screen'>
      <div class='p-4'>
        <div class='grid grid-cols-1 gap-6 justify-items-center'>
          <span class='flex gap-3'>
            <${TbBrandDeno} size='36' style=${{"stroke-width":1}}><//> 
            <span class='text-3xl'>Deno App</span>
          </span>
          <span class='text-2xl'>${time}</span>
        </div>
      </div>
    </div>
  `
}

render(App, document.body)