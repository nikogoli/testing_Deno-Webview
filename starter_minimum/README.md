# Starter: Minimum
Most simple style for webview_deno + preact / solidJS.
- **preact**<br>Using preact. You can use JSX (TSX), but need a `Client.tsx` and [deno_emit](https://github.com/denoland/deno_emit).budle() for hydration.
- **solidJS_jsx**<br>Using solidJS. You can use JSX, but need to add many `@ts-ignore` and to compile `App.jsx` by imported Babel + solidJS-plug-in.
- **solidJS_template_literal**<br>Using solidJS's tagged template literals. You cannot use JSX, but do not need any additional conversion.

----
`deno task start` (`deno run -A --unstable main.tsx`)
![clip_mini](https://user-images.githubusercontent.com/49331838/192082036-cb276523-a3d5-4737-9319-a2e78bedc963.gif)
