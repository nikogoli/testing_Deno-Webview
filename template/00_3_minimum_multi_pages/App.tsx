import IconBrandDeno from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-deno.tsx"
import IconFileText from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/file-text.tsx"


export default function App(props:{
  titles: Array<string>;
  max_len: number;
}){
  return (
    <div class={`h-screen grid gap-6 place-content-center justify-items-center`}>
      <span class='flex gap-3'>
        <IconBrandDeno size={36} stroke-width={1} />
        <span class='text-3xl'>Deno App</span>
      </span>
      <div class="flex flex-col gap-4">
        { props.titles.map( (title, idx) => {return (
          <div class="p-1 hover:bg-gray-200">
            <a href={`/page/${idx+1}`} class="flex gap-1 items-center">
              <IconFileText size={22} stroke-width={1}/>
              <span class="text-lg">{title}</span>
            </a>
          </div>
        )}) }
      </div>
    </div>
  )
}