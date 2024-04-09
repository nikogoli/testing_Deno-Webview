import { ViewConfig } from 'niko-app/by-emit/mod.ts'

export const VIEW_CONFIG: ViewConfig = {
  title: "Clock (Deno + WebView)",
  size: [600, 400],
  crient_path: "./tempClient.tsx",
  google_fonts: [
    "Zen Maru Gothic",
    "Yusei Magic",
    "Yuji Syuku",
  ],
  use_worker: false,
  port: 8088,
}

export const IMPORT_MAP_PATH = ""

export const DENO_JSON_PATH = "../../deno.json"