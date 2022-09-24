# testing Deno + Webview
Applications using [webview_deno](https://github.com/webview/webview_deno) & solidJS / preact.

## starter
Simple-style projects for webview-App using solidJS / preact.
- **minimum**<br>最もシンプルな形式。基本的には、webview を起動する`main.tsx`と solidJS / preact 用の`App.jsx / App.tsx`の2つのみで動く。<br>Most simple style. Basically, just 2 files are needed; `main.tsx` for webview and `App.jsx / App.tsx` for solidJS / preact.
- **use_component**<br>自作コンポーネントをローカルの`Components.js / Components.tsx`から読み込んで使う形式。バンドル(のような)処理が追加される。<br>App using a custom component imported from a local `Components.js / Components.tsx`. So, some "bundling-like" process is added.
