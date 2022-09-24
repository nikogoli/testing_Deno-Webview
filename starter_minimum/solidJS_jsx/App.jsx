/** @jsx h */
//@ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "https://esm.sh/preact@10.10.6"

// @deno-types="https://esm.sh/v94/solid-js@1.5.4/types/index.d.ts"
import { createSignal, onCleanup, } from "https://cdn.skypack.dev/solid-js"
// @deno-types="https://esm.sh/v94/solid-js@1.5.4/web/types/index.d.ts"
import { render } from "https://cdn.skypack.dev/solid-js/web"

import { TbBrandDeno } from "https://esm.sh/solid-icons@1.0.1/tb"


const App = () => {

  const [time, setTime] = createSignal( new Date().toTimeString().split(" ")[0] )
  
  const timer = setInterval( () => setTime(new Date().toTimeString().split(" ")[0]), 1000 )
  onCleanup( () => clearInterval(timer) )

  return (
    <div class='h-screen'>
      <div class='p-4'>
        <div class='grid grid-cols-1 gap-6 justify-items-center'>
          <span class='flex gap-3'>
            {/** @ts-ignore: This Icon's type is solid-js's JSX.Element, not preact.JSX.Element */}
            <TbBrandDeno size='36' stroke-width={1}></TbBrandDeno>
            <span class='text-3xl'>Deno App</span>
          </span>
          <span class='text-2xl'>{time()}</span>
        </div>
      </div>
    </div>
  )
}

// @ts-ignore: render()'s requires solid-js's JSX.Element, but "App" evaluated as preact.JSX.Element because using "h".
render(App, document.body)