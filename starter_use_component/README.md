# Starter: Use Components
App using a custom component imported from a local `Components.jsx / Components.tsx`. 
- **preact**<br>
  Using preact. You can use JSX (TSX), but need a `Client.tsx` and [deno_emit](https://github.com/denoland/deno_emit).budle() for hydration.<br>
  You can use `import { ... } from "./Components.tsx"`, because `App.tsx` is to be bundled.
- **solidJS_jsx**<br>
  Using solidJS. You can use JSX, but need to add many `@ts-ignore` and to compile `App.jsx` by imported Babel + solidJS-plug-in.<br>
  You cannot use `import { ... } from "./Components.jsx"`, because `App.tsx` is not to be bundled.<br>
  So, in `main.tsx`, you read it by `Deno.readTextFile()` and complie to JS and pass the data as Data URL by `webview.bind()`, then import it by `import(...)` in `App.jsx`.
- **solidJS_template_literal**<br>
  Using solidJS's tagged template literals. You cannot use JSX, but do not need any additional conversion.<br>
  You cannot use `import { ... } from "./Components.jsx"`, because `App.tsx` is not to be bundled.<br>
  So, same as the case of solidJS_jsx, except that you do not need to compile any files.

----
![clip_comp](https://user-images.githubusercontent.com/49331838/192083057-a2bdfc14-4e8b-4949-a529-0a339e00ea00.gif)
