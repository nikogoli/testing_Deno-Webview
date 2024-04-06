import { useRef, useEffect } from "preact/hooks"

export default function ClockArea(){
  const time = new Date().toTimeString().split(" ")[0]
  const parRef = useRef<HTMLDivElement>(null)

  

  useEffect(() => {
    console.log("comp")
    const timer = setInterval(
      () => {
        const spa = document.createElement("span")
        spa.innerText = new Date().toTimeString().split(" ")[0]
        Array.from(parRef.current!.children).forEach(el => el.remove())
        parRef.current!.appendChild(spa)
      }, 1000
    )
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div class='text-2xl' ref={parRef}>
      <span></span>
    </div>
  )
}