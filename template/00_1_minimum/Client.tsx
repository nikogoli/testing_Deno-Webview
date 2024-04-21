/** @jsx h */
import { h, hydrate } from "https://esm.sh/preact@10.15.1"

import App from "./App.tsx";

hydrate( <App/>, document.body )