
export type AppProps = {
  titles: Array<string>,
  max_len: number,
}


type Info = {page_idx:number, title: string, text:string}


export type HomeProps = {
  titles: Array<string>,
  max_len: number,
}


export type PageProps = {
  info: Info,
  max_len: number,
}