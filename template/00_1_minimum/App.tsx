/** @jsx h */
import { h } from "https://esm.sh/preact@10.15.1"
import { useState, useEffect } from "https://esm.sh/preact@10.15.1/hooks"


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
        <span class='text-3xl'>Deno App</span>
      </span>
      <div class='text-2xl'>
        <span>{time}</span>
      </div>
    </div>
  )
}