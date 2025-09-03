<script lang="ts">
    import type { ComponentProps } from 'svelte';
    // import { MouseContext, WindowContext } from "./utils";
    import Window from "./Window.svelte";
    import { MouseContext, WindowContext } from './utils.js';
    // import Taskbar from './Taskbar.svelte';
    // import ProgramIcon from './ProgramIcon.svelte';

    const mouseContext = new MouseContext();
    const windowContext = new WindowContext();

    type WindowProps = Omit<ComponentProps<Window>, 'id' | 'mouseContext' | 'windowContext'>;

    let windows: {[key: string]: { data: string, opts: WindowProps }} = {
        "win01": { opts: { left: "400px" }, data: "SomeStuff"},
        "win02": { opts: { top: "400px", left: "400px" }, data: "SomeStuff 2"}
    };

    function spawnWindow(id: string, option: any, data: string) {
        if (!Object.keys(windows).includes(id)) {
            windows[id] = { opts: option, data };
        } else {
            console.log("Window with this id already exists.");
        }
    }

    function closeWindow(id: string) {
        delete windows[id];
        windows = windows;
    }
</script>

<svelte:window 
    on:mousemove={(e) => mouseContext.mouseMoving(e)}
    on:mouseup={(e) => mouseContext.mouseIsUp(e)}
/>

<section>
    <img src="/background-dark.jpg" alt="Windows Background Dark" />
    <div class="rest">
        {#each Object.entries(windows) as [id, windata] (`spawningWindow${id}`)}
            <Window
                {mouseContext}
                {windowContext}
                {id}
                {...windata.opts}
                on:close={() => closeWindow(id)}
            >
                {windata.data}
                <button on:click={() => spawnWindow("win03test", {top: "20px"}, "Just a test")}>Test</button>
            </Window>
        {/each}
        <slot {mouseContext} {windowContext} />
    </div>
    <!-- <Taskbar>
        {#each Object.entries(windows) as [id, windata] (`spawningWindow${id}`)}
            <ProgramIcon {windowContext} {id} icon={windata.opts.icon ? windata.opts.icon : undefined} />
        {/each}
    </Taskbar> -->
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