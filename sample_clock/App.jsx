/** @jsx h */
//@ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "https://esm.sh/preact@10.10.6"

// @deno-types="https://esm.sh/v94/solid-js@1.5.4/types/index.d.ts"
import { createSignal, onCleanup, onMount } from "https://cdn.skypack.dev/solid-js"
// @deno-types="https://esm.sh/v94/solid-js@1.5.4/web/types/index.d.ts"
import { render } from "https://cdn.skypack.dev/solid-js/web"

import { TbBrandDeno } from "https://esm.sh/solid-icons@1.0.1/tb"


/**
 * @typedef {Object} MyClockProps
 * @property {function(void): string} date_str
 * @property {function(void): boolean} show_second
 * @property {Array<never>} children
 */
/** @type {function(MyClockProps):h.JSX.Element} */
let MyClock

/**
 * @typedef {Object} MySettingProps
 * @property {function(void):HTMLImageElement} img_elem
 * @property {function(void):boolean} show_second
 * @property {function(boolean):void} toggleShowSec
 * @property {function(void):Array<string>} bg_colors
 * @property {function(function(Array<string>):Array<string>):void} setBgColors
 * @property {Array<never>} children
 */
/** @type {function(MySettingProps):h.JSX.Element} */
let MySetting

// @ts-ignore: BIND_component_URL() is defined and provided by webview.bind() in main.tsx.
const mod = await BIND_component_URL().then( data_url => import(data_url) )
MyClock = mod.MyClock
MySetting = mod.MySetting


const App = () => {

  const [date_str, setDateStr] = createSignal(Date());
  const [show_second, toggleShowSec] = createSignal(false);
  const [is_img_rotate, toggleImgRotate] = createSignal(false);
  const [bg_colors, setBgColors] = createSignal(["#ffffff", "#fef3c7"], { equals: false });

  let img_elem = new Image()

  /** @type {(elem: HTMLElement | null)=> void} */
  function ref_setter(elem){
    if(elem && elem.getAttribute("name")=="img"){
      img_elem = /** @type {HTMLImageElement} */(elem)
    }
  }
  
  onMount( async () => {
    // @ts-ignore: BIND_image_dataurl() is defined and provided by webview.bind() in main.tsx.
    img_elem.src = await BIND_image_URL()
  })  

  const timer = setInterval( () => setDateStr(Date()), 1000 )
  onCleanup( () => clearInterval(timer) )

  const img_style = () => {
    if (is_img_rotate()){
      const rotate = ["rotate-0", "rotate-12", "rotate-0", "-rotate-12"]
      const rem = Number(date_str().split(" ").at(4)?.split(":").at(-1)) %4
      return rotate[rem]
    } else {
      return ""
    }
  }

  const top_style = () => `bg-gradient-to-b from-[${bg_colors()[0]}] to-[${bg_colors()[1]}]`

  return (
    <div class={`h-full flex flex-col ${top_style()}`}>
      <div class='h-[92%] p-4 grid grid-rows-5 gap-4 justify-items-center'
            style={ {"flex-grow": 1} }>
        <div class='row-span-1 flex gap-3 items-center'>
          {/** @ts-ignore: This Icon's type is solid-js's JSX.Element, not preact.JSX.Element */}
          <TbBrandDeno size='36' stroke-width={1}></TbBrandDeno> 
          <span class='text-3xl mb-2'> Deno Clock </span>
          <MySetting  img_elem={ () => img_elem }
                      bg_colors={ bg_colors }
                      setBgColors={ setBgColors }
                      show_second={ show_second }
                      toggleShowSec={ toggleShowSec } >
          </MySetting>
        </div>
        <div class='row-span-4 flex'>
          <img  name='img' ref={ref_setter} onClick={() => toggleImgRotate(prev => !prev)}
                class={`max-w-[95%] max-h-[95%] ${img_style()}`}
                style={{ "width": "fit-content", "height": "fit-content" }} />
          <MyClock  date_str={ date_str }
                    show_second={ show_second }>
          </MyClock>
        </div>
      </div>
      <footer class='flex gap-4 p-1 justify-center items-center bg-[#e5e5e5]'>
        <span>画像 © <a href="https://icon-icons.com/users/KiwiiDesign/icon-sets/">KiwiiDesign</a></span>
        <span><a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a></span>
      </footer>
    </div>
  )
}

// @ts-ignore: render()'s requires solid-js's JSX.Element, but "App" evaluated as preact.JSX.Element because using "h".
render(App, document.body)