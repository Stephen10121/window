<script lang="ts">
    import type { Snippet } from "svelte";
    import { defaultWindowValues, MouseContext, WindowContext, type ActualWindowProps } from "./utils.js";
    import Window from "./Window.svelte";

    type CloseWindow = (id: string) => unknown;
    type ParentDesktop = HTMLElement | undefined;

    let {
        children = undefined,
        mouseContext = new MouseContext(),
        windowContext = new WindowContext()
    }: { 
        children?: Snippet<[{mouseContext: MouseContext, windowContext: WindowContext, desktop: ParentDesktop}, CloseWindow]>,
        mouseContext?: MouseContext,
        windowContext?: WindowContext,
    } = $props();
    let parentDesktop: ParentDesktop = $state();

    type WindowProps = Omit<ActualWindowProps, 'id' | 'context' | 'close' | 'children'>;

    let windows: {[key: string]: { data: string, opts: WindowProps }} = $state({
        "win01": { opts: { ...defaultWindowValues, left: "400px" }, data: "SomeStuff"},
        "win02": { opts: { ...defaultWindowValues, top: "400px", left: "400px" }, data: "SomeStuff 2"}
    });

    function spawnWindow(id: string, option: any, data: string) {
        if (!Object.keys(windows).includes(id)) {
            windows[id] = { opts: option, data };
        } else {
            console.log("Window with this id already exists.");
        }
    }

    function closeWindow(id: string) {
        console.log(id);
        delete windows[id];
        windows = windows;
    }
</script>

{#each Object.entries(windows) as [id, windata] (`spawningWindow${id}`)}
    <Window
        context={{desktop: parentDesktop, mouseContext, windowContext}}
        {id}
        {...windata.opts}
    >
        {windata.data}
    </Window>
{/each}