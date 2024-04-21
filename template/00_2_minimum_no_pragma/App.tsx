import { useState, useEffect } from "preact/hooks"
import IconBrandDeno from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-deno.tsx"

export default function App(){
  const [time, setTime] = useState(new Date().toTimeString().split(" ")[0])

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toTimeString().split(" ")[0]), 1000
    )
    return () => clearInterval(timer)
  })

  return (
    <div class='h-screen grid gap-6 place-content-center justify-items-center'>
      <span class='flex gap-3'>
        <IconBrandDeno size={36} stroke-width={1} />
        <span class='text-3xl'>Deno App</span>
      </span>
      <div class='text-2xl'>
        <span>{time}</span>
      </div>
    </div>
  )
}