//@ts-check
import html from "https://cdn.skypack.dev/solid-js/html"

/**
 * @param {Object} props
 * @param {function(void): string} props.time
 */
 export function MyTimePanel( props ){
  return html`
    <div class='text-2xl'>
      <span>${props.time}</span>
    </div>
  `
 }