import IconHome from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/home.tsx"
import IconSquareRoundedArrowLeft from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/square-rounded-arrow-left.tsx"
import IconSquareRoundedArrowRight from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/square-rounded-arrow-right.tsx"


type PageProps = {
  info: { page_idx:number, title: string, text:string },
  max_len: number,
}

export default function Page(props: PageProps) {
  const {title, text} = props.info
  
  return (
    <div class="h-screen p-8 flex flex-col gap-4">
      <div class="flex pb-4">
        <span class="text-3xl flex-1">{title}</span>
        <MovePageButtons {...props} />
      </div>
      <span>{text}</span>
    </div>
  )
}



function LeftIcon(props:{colorcode: string}){
  return (
    <IconSquareRoundedArrowLeft class={`text-[${props.colorcode}]`} size={30} stroke-width={"1px"}/>
  )
}


function RightIcon(props:{colorcode: string}){
  return (
    <IconSquareRoundedArrowRight class={`text-[${props.colorcode}]`} size={30} stroke-width={"1px"}/>
  )
}


function MovePageButtons(props:PageProps){
  const { info, max_len } = props
  return(
    <div class="p-1 border-2 rounded-xl flex gap-2" style={{height: "fit-content"}}>
      { info.page_idx > 1
          ? <a href={`/page/${info.page_idx-1}`}><LeftIcon colorcode="#2563eb" /></a>
          : <LeftIcon colorcode="#737373" />
      }
      <a href={`/`}>
        <IconHome class="text-[#2563eb]" size={30} stroke-width={"1px"}/>
      </a>
      { info.page_idx < max_len
          ? <a href={`/page/${info.page_idx+1}`}><RightIcon colorcode="#2563eb" /></a>
          : <RightIcon colorcode="#737373" />
      }
    </div>
  )
}