import { ViewConfig } from 'niko-app/by-emit/mod.ts'

export const VIEW_CONFIG: ViewConfig = {
  title: "Deno App with Gluon",
  size: [900, 600],
  crient_path: "./tempClient.tsx",
  google_fonts: [
    "Zen Maru Gothic",
    "Yusei Magic",
    "Yuji Syuku",
  ],
  use_worker: true,
  port: 8088
}

export const IMPORT_MAP_PATH = ""

export const DENO_JSON_PATH = "../../deno.json"