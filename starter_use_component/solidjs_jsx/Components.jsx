/** @jsx h */
//@ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h } from "https://esm.sh/preact@10.10.6"

/**
 * @template T
 * @typedef { import("https://esm.sh/v94/solid-js@1.5.4/types/index.d.ts").Accessor<T> } Accessor<T>
 */

/** @typedef { (props:{time: Accessor<string>}) => h.JSX.Element } MyTimePanel*/
/** @type {MyTimePanel} */
 export function MyTimePanel( props ){
  return (
    <div class='text-2xl'>
      <span>{props.time()}</span>
    </div>
  )
 }