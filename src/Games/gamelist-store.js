import { readable } from "svelte/store";

import fivehundred from "./500/500.svelte";
import buggerme from "./BuggerMe/BuggerMe.svelte";
//import canasta from "./Canasta/Canasta.svelte";

export default readable([
  {
    name: "500",
    requiredPlayers: [2, 4, 6],
    component: fivehundred
  },
  {
    name: "Bugger Me!",
    requiredPlayers: [],
    component: buggerme
  }
  // {
  //   name: "Canasta",
  //   requiredPlayers: [2, 4],
  //   component: canasta
  // }
]);
