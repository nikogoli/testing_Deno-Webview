/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "https://esm.sh/preact@10.10.6"
import { useState, useEffect } from "https://esm.sh/preact@10.10.6/hooks"

//import IconBrandDeno from "https://raw.githubusercontent.com/hashrock/tabler-icons-tsx/main/tsx/brand-deno.tsx"
import { IconBrandDeno } from "./IconBrandDeno.tsx"


const App = () => {

  const [time, setTime] = useState(new Date().toTimeString().split(" ")[0])
 
  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toTimeString().split(" ")[0]), 1000
    )
    return () => clearInterval(timer)
  })

  return (
    <div class={`h-screen`}>
      <div class='p-4'>
        <div class='mt-8 grid grid-cols-1 gap-6 justify-items-center'>
          <span class='flex gap-3'>
            <IconBrandDeno size={36} stroke-width={1}></IconBrandDeno>
            <span class='text-3xl'>Deno App</span>
          </span>
          <span class='text-2xl'>{time}</span>
        </div>
      </div>
    </div>
  )
}

export default App