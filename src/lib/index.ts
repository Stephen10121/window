// Reexport your entry components here
export { default as WindowManager } from "./WindowManager.svelte";
export { default as Window } from "./Window.svelte";

export type { WindowDragConfig, ActualWindowProps } from "./utils.js";
export { MouseContext, WindowContext, defaultWindowValues } from "./utils.js";