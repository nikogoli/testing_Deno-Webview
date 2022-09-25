/** @jsx h */
// @ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { h } from "https://esm.sh/preact@10.10.6"

// @deno-types="https://esm.sh/v94/solid-js@1.5.4/types/index.d.ts"
import { createSignal, onCleanup } from "https://cdn.skypack.dev/solid-js"
// @deno-types="https://esm.sh/v94/solid-js@1.5.4/web/types/index.d.ts"
import { render } from "https://cdn.skypack.dev/solid-js/web"

import { TbBrandDeno } from "https://esm.sh/solid-icons@1.0.1/tb"


/** @type { import("./Components.jsx").MyTimePanel } */
let MyTimePanel

// @ts-ignore: BIND_component_URL() is defined and provided by webview.bind() in main.tsx.
const Components = await BIND_component_URL().then( dataURL => import(dataURL) )
MyTimePanel = Components.MyTimePanel



const App = () => {

  const [time, setTime] = createSignal(new Date().toTimeString().split(" ")[0])
  const [is_dark, setDark] = createSignal(false)

  const sty = () => is_dark() ? "bg-black text-white" : "bg-white text-black"
  const deno_type = () => is_dark() ? "Dark Deno" : "Light Deno"
  
  const timer = setInterval( 
    () => setTime(new Date().toTimeString().split(" ")[0]), 1000
  )
  onCleanup( () => clearInterval(timer) )

  return (
    <div class={`h-screen ${sty()}`}>
      <div class='p-4'>
        <div class='mt-8 grid grid-cols-1 gap-6 justify-items-center'>
          <span class='flex gap-3'>
            {/** @ts-ignore: This Icon's type is solid-js's JSX.Element, not preact.JSX.Element */}
            <TbBrandDeno size='36' stroke-width={1} />
            <span class='text-3xl'>Deno App</span>
          </span>
          <MyTimePanel time={time} />
          <button class='p-3 border-2 rounded-lg focus:outline-none'
                  onClick={() => setDark(prev => !prev)}>
            {deno_type()}
          </button>
        </div>
      </div>
    </div>
  )
}

// @ts-ignore: render()'s requires solid-js's JSX.Element, but "App" evaluated as preact.JSX.Element because using "h".
render(App, document.body)