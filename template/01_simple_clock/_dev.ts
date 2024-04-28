import { cyan } from "niko-app/by-esbuild/mod.ts"


const ARGS = ["run", "-A", "--unstable-ffi", "main.ts"]

const command = new Deno.Command(Deno.execPath(), {
  args: ARGS,
  stdout: "piped",
  stderr: "piped"
})

console.log(`\n${cyan("Sub Process")} Deno ${ARGS.join(" ")}`)
const process = command.spawn()

// オプション設定は正直よくわからない
process.stdout.pipeTo(Deno.stdout.writable, {preventClose: true})
process.stderr.pipeTo(Deno.stderr.writable, {preventClose: true})

const status = await process.status
if (status.success){
  console.log(`${cyan("Sub Process")} Finished. \n`)
} else {
  throw new Error(`Error in the sub process.`)
}