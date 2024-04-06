import { Signal } from "@preact/signals"

export type PanelProps = {
  text_sig: Signal<string>,
  filename_sig: Signal<string>
}

export type EditorProps = {
  text_sig: Signal<string>,
  filename_sig: Signal<string>
}

export type Hierarchy_x3 = Record<string, null|Record<string, null|Record<string, null>>>


export type ReturndHierarchy = {
  root: string,
  names: Hierarchy_x3
}