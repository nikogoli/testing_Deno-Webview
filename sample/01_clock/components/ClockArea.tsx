import { Signal } from "@preact/signals"

export default function ClockArea(props: {time: Signal<string>}){
  return (
    <div class='text-2xl'>
      <span>{props.time}</span>
    </div>
  )
}