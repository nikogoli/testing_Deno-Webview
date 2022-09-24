/** @jsx h */
//@ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "https://esm.sh/preact@10.10.6"

// @deno-types="https://esm.sh/v94/solid-js@1.5.4/types/index.d.ts"
import { createSignal, createEffect, onMount, onCleanup } from "https://cdn.skypack.dev/solid-js"
// @deno-types="https://esm.sh/v94/solid-js@1.5.4/web/types/index.d.ts"
import { Show  } from "https://cdn.skypack.dev/solid-js/web"

import { TbClock } from "https://esm.sh/solid-icons@1.0.1/tb"


/**
 * @template T
 * @typedef { import("https://esm.sh/v94/solid-js@1.5.4/types/index.d.ts").Accessor<T> } Accessor<T>
 */
/**
 * @template T
 * @typedef { import("https://esm.sh/v94/solid-js@1.5.4/types/index.d.ts").Setter<T> } Setter<T>
 */


/**
 * @param {HTMLElement} el
 * @param {function(boolean):void} closer
 */
function modal_closer(el, closer) {
  /** @type {function(MouseEvent):void} */
  const onClick = (e) => {
    if (e.target && el.contains(/** @type {Node} */(e.target)) == false){
      closer(false)
    }
  }
  document.body.addEventListener("click", onClick)
  onCleanup(() => { document.body.removeEventListener("click", onClick) })
}


/**
 * @param {Object} props
 * @param {function(void):boolean} props.value_getter
 * @param {function(void):void} props.toggle_func
 * @param {Array<never>} props.children
 */
function MyToggle(props){

  let check_elem = document.createElement("input")

  /** @type {(el:HTMLElement | null)=> void} */
  const ref_setter = (el) => {
    if (el && el.getAttribute("name") == "check"){
      check_elem = /** @type {HTMLInputElement} */ (el)
    }
  }
  
  onMount(() => { check_elem.checked = props.value_getter() })

  return (
    <span class='col-span-1 flex ml-4'>
      <input name='check' ref={ref_setter} type='checkbox'
          class='w-10 h-5 checked:sibling:bg-[#60a5fa] cursor-pointer
            checked:sibling:sibling:translate-x-6
            checked:sibling:sibling:border-[#60a5fa]'
          onChange={() => props.toggle_func()} />
      <span class='w-10 h-5 -ml-11 bg-gray-500 rounded-full pointer-events-none'></span>
      <span class='w-5 h-5 -ml-11 rounded-full transition pointer-events-none
          border-gray-500 bg-white border-1'></span>
    </span>
  )
}


/**
 * @param {Object} props
 * @param {Accessor<boolean>} props.value_getter
 * @param {function(void):void} props.toggle_func
 * @param {{on:string, off:string}} props.texts
 * @param {Array<never>} props.children
 */
 function MyToggleText(props){

  let check_elem = document.createElement("input")

  /** @type {(el:HTMLElement | null)=> void} */
  const ref_setter = (el) => {
    if (el && el.getAttribute("name") == "check"){
      check_elem = /** @type {HTMLInputElement} */ (el)
    }
  }
  
  onMount(() => { check_elem.checked = props.value_getter() })
  
  return (
    <span class='col-span-1 flex'>
      <input name='check' ref={ref_setter} type='checkbox'
        class='w-[4.5rem] h-7 checked:sibling:bg-[#93c5fd] cursor-pointer'
        onChange={() => props.toggle_func()} />
      <span class='w-[4.5rem] h-7 -ml-[4.5rem] bg-gray-300 rounded-lg text-center pointer-events-none'>{props.value_getter() ? props.texts.on : props.texts.off}</span>
    </span>
  )
}


/**
 * @typedef {Object} MyClockProps
 * @property {Accessor<string>} date_str
 * @property {Accessor<boolean>} show_second
 */
/** @type {function(MyClockProps):h.JSX.Element} */
export function MyClock( props ){

  const date_texts = () => {
    const [yobi, month, day, year, time] = props.date_str().split(" ").slice(0, 5)
    if (props.show_second()){
      return {day: `${year} ${month} ${day} (${yobi})`, time}
    } else {
      const no_sec = time.split(":").slice(0,-1).join(":")
      return {day: `${year} ${month} ${day} (${yobi})`, time:no_sec}
    }
  }

  return (
    <div class='w-56 -mt-8 flex flex-col gap-3 justify-center'>
      <p class='text-2xl text-center'>{date_texts().day}</p>
      <p class={props.show_second() ? 'text-5xl ml-8' : 'text-5xl ml-12'}>
        {date_texts().time}
      </p>
    </div>
  )
}



/**
 * @typedef {Object} MySettingProps
 * @property {function(void):HTMLImageElement} img_elem
 * @property {Accessor<boolean>} show_second
 * @property {Setter<boolean>} toggleShowSec
 * @property {Accessor<Array<string>>} bg_colors
 * @property {Setter<Array<string>>} setBgColors
 * @property {Array<never>} children
 */
/** @type {function(MySettingProps):h.JSX.Element} */
export function MySetting(props){
  const [is_set_mode, toggleSetMode] = createSignal(false)

  /** @type {Accessor<boolean>} */
  const is_grad = () => { return (props.bg_colors()[0] != props.bg_colors()[1]) }


  /** @type {function(void):void} */
  function bottom_color_setter(){
    const [top, bottom] = props.bg_colors()
    if (top == bottom){ props.setBgColors(() => [top, "#fef3c7"]) }
    else { props.setBgColors(() => [top, top]) }
  }

  let panel_elem = document.createElement("div")
  let top_picker_elem = document.createElement("input")
  let btm_picker_elem = document.createElement("input")
  let file_input_elem = document.createElement("input")

  /** @type {(elem: HTMLElement | null)=> void} */
  function ref_setter(elem){
    if (elem === null){ return }
    if (elem.getAttribute("name") == "panel"){
      panel_elem = /** @type {HTMLDivElement} */ (elem)
    }
    else if (elem.getAttribute("name") == "t_picker"){
      top_picker_elem = /** @type {HTMLInputElement} */ (elem)
    }
    else if (elem.getAttribute("name") == "b_picker"){
      btm_picker_elem = /** @type {HTMLInputElement} */ (elem)
    }
    else if (elem.getAttribute("name") == "file"){
      file_input_elem =  /** @type {HTMLInputElement} */ (elem)
    }
  }

  createEffect(() => {
    if (is_set_mode() === true){ modal_closer(panel_elem, toggleSetMode) }
  })

  /** @type {(e: Event)=> void} */
  function set_bg_colors(e){
    if (e.target !== null){
      const elem = /** @type {HTMLInputElement} */(e.target)
      const color = elem.value
      if (elem.getAttribute("name") == "t_picker"){
        if (is_grad()){ props.setBgColors(prev => [color, prev[1]]) }
        else { props.setBgColors(_prev => [color, color]) }
      } else {
        console.log({b_clor: color})
        props.setBgColors(prev => [prev[0], color] )
      }
    }
  }

  function change_image(){
    if (props.img_elem() === undefined){ return }
    if (file_input_elem.files === null){ return }
    const img_file = file_input_elem.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target !== null){
        const { result } = e.target
        if (typeof result == "string"){
          props.img_elem().src = result
        }
      }
    }
    reader.readAsDataURL(img_file)
  }

  function reset_image(){
    const func = async () => {
      // @ts-ignore: BIND_image_dataurl() is defined and provided by webview.bind() in main.tsx.
      props.img_elem().src = await BIND_image_URL()
    }
    func()
  }

  return (
    <div onClick={() => toggleSetMode(true)} >
      {/** @ts-ignore: This Icon's type is solid-js's JSX.Element */}
      <TbClock  size='36' class='hover:scale-125 transition-transform'
                style={ {"stroke-width": "1"} }></TbClock> 
      {/** @ts-ignore: solid-JS flow-component */}
      <Show when={is_set_mode()} fallback={<span></span>}>
        <div  name='panel' ref={ref_setter}
              class='fixed w-60 p-3 top-[4rem] left-[21rem] text-lg rounded-xl 
                    flex flex-col gap-3 bg-[#f5f5f4] border-1 border-[#a8a29e]'>
          <div class='flex items-center gap-3'>
            <span> 秒の表示 </span>
            <MyToggle   toggle_func={() => props.toggleShowSec(prev => !prev)}
                        value_getter={props.show_second}>
            </MyToggle>
          </div>
          <div class='flex items-center gap-3'>
            <span class='mr-2'> 背景色 </span>
            <MyToggleText value_getter={is_grad}
                          toggle_func={bottom_color_setter}
                          texts={{on:"グラデ", off:"単色"}}>
            </MyToggleText>
            <span class='flex gap-2'>
              <button class={`w-6 h-6 border-1 border-[#a8a29e] bg-[${props.bg_colors()[0]}]`}
                      onClick={() => top_picker_elem.click() }></button>
              <input name='t_picker' ref={ref_setter} type='color' list="true" 
                      class='w-0 invisible -ml-2' onInput={(e) => set_bg_colors(e)} />
              {/** @ts-ignore: solid-JS flow-component */}
              <Show when={is_grad()} fallback={<span></span>}>
                <button class={`w-6 h-6 border-1 border-[#a8a29e] bg-[${props.bg_colors()[1]}]`}
                        onClick={() => btm_picker_elem.click() }></button>
                <input  name='b_picker' ref={ref_setter} type='color' list="true"
                        class='w-0 invisible -ml-2' onInput={(e) => set_bg_colors(e)} />
              </Show>
            </span>
          </div>
          <div class='grid grid-cols-3 gap-2'>
            <span class='mr-2'>画像</span>
            <button class='px-2 rounded-lg bg-gray-300' onClick={() => file_input_elem.click()}>変更</button>
            <button class='px-2 rounded-lg bg-gray-300' onClick={() => reset_image()}>戻す</button>
            <input name='file' ref={ref_setter} type='file' onChange={() => change_image()}
                  accept='image/png, image/jpeg, image/bmp' class='hidden' />
          </div>
        </div>
      </Show>
    </div>
  )
}