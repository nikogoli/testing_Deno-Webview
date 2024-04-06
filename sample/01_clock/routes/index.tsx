import { useState, useRef, useEffect } from "preact/hooks"
import IconBrandDeno from "tabler-icons-tsx/brand-deno.tsx"



export default function App(){

  const [is_dark, setDark] = useState(false)
  const sty = is_dark ? "bg-black text-white" : "bg-white text-black"

  const parRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spa = document.createElement("span")
    spa.style.width = "5rem"
    spa.innerText = new Date().toTimeString().split(" ")[0]
    parRef.current!.appendChild(spa)
}, [])

  useEffect(() => {
    const timer = setInterval(
      () => (parRef.current!.firstElementChild! as HTMLElement).innerText = new Date().toTimeString().split(" ")[0]
      , 1000
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <div class={`h-screen grid gap-6 place-content-center justify-items-center ${sty}`}>
      <span class='flex gap-3'>
        <IconBrandDeno size={36} stroke-width={1} />
        <span class='text-3xl'>Deno App</span>
      </span>
      <div class='text-2xl flex justify-center' ref={parRef}>
      </div>
      <button class='p-3 border-2 rounded-lg' onClick={() => setDark(prev => !prev)}>
        { is_dark ? "Dark Deno" : "Light Deno" }
      </button>
    </div>
  )
}