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
        children?: Snippet<[MouseContext, WindowContext, CloseWindow, ParentDesktop]>,
        mouseContext?: MouseContext,
        windowContext?: WindowContext,
    } = $props();
    let parentDesktop: ParentDesktop = $state();

    type WindowProps = Omit<ActualWindowProps, 'id' | 'mouseContext' | 'windowContext' | 'close' | 'children'>;

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

<svelte:window 
    on:mousemove={(e) => mouseContext.mouseMoving(e)}
    on:mouseup={(e) => mouseContext.mouseIsUp(e)}
/>

<section bind:this={parentDesktop}>
    <img src="/background-dark.jpg" alt="Windows Background Dark" />
    <div class="rest">
        {#each Object.entries(windows) as [id, windata] (`spawningWindow${id}`)}
            <Window
                desktop={parentDesktop}
                {mouseContext}
                {windowContext}
                {id}
                {...windata.opts}
                close={() => closeWindow(id)}
            >
                {windata.data}
                <button onclick={() => spawnWindow("win03test", {top: "20px"}, "Just a test")}>Test</button>
            </Window>
        {/each}
        {#if children}
            {@render children(mouseContext, windowContext, closeWindow, parentDesktop)}
        {/if}
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        display: grid;
        grid-template-rows: auto 48px;
        box-sizing: border-box;
    }
    
    section * {
        box-sizing: border-box;
        user-drag: none;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        text-decoration: none;
        -webkit-touch-callout: none; /* iOS Safari */
        -khtml-user-select: none; /* Konqueror HTML */
    }

    .rest {
        width: 100%;
        height: 100%;
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        max-height: 100%;
    }
</style>