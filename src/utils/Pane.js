import { Pane } from "tweakpane";

const pane = new Pane({
  expanded: false,
});

if (window.location.search.includes("?debug")) {
  pane.expanded = true;
}

export default pane;