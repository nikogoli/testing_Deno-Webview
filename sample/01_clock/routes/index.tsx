import { useState, useEffect } from "preact/hooks"
import { signal } from "@preact/signals"

import ClockArea from "../components/ClockArea.tsx"
import IconBrandDeno from "tabler-icons-tsx/brand-deno.tsx"


export default function App(){

  const [is_dark, setDark] = useState(false)
  const sty = is_dark ? "bg-black text-white" : "bg-white text-black"

  const time_sig = signal(new Date().toTimeString().split(" ")[0])

  useEffect(() => {
    const timer = setInterval(
      () => time_sig.value = new Date().toTimeString().split(" ")[0], 1000
    )
    return () => clearInterval(timer)
  })

  return (
    <div class={`h-screen grid gap-6 place-content-center justify-items-center ${sty}`}>
      <span class='flex gap-3'>
        <IconBrandDeno size={36} stroke-width={1} />
        <span class='text-3xl'>Deno App</span>
      </span>
      <ClockArea time={time_sig} />
      <button class='p-3 border-2 rounded-lg' onClick={() => setDark(prev => !prev)}>
        { is_dark ? "Dark Deno" : "Light Deno" }
      </button>
    </div>
  )
}