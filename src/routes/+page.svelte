<script lang="ts">
    import Debugger from "$lib/Debugger.svelte";
    import Window from "$lib/Window.svelte";
    import WindowManager from "$lib/WindowManager.svelte";

    let showHitboxes = false;
    let makeResizable = true;
    let makeDraggable = true;
</script>

<Debugger>
    <label>
        <p>Show Hitboxes</p>
        <input type="checkbox" bind:checked={showHitboxes} />
    </label>
    <label>
        <p>Make it draggable</p>
        <input type="checkbox" bind:checked={makeDraggable} />
    </label>
    <label>
        <p>Make it resizeable</p>
        <input type="checkbox" bind:checked={makeResizable} />
    </label>
</Debugger>

<main>
    <WindowManager let:currentFocusStore setCurrentFocus="window1">
            <Window
                {showHitboxes}
                id="window1"
                {currentFocusStore}
                width={200}
                height={200}
                draggerHeight="100%"
                draggable={makeDraggable}
                resizable={makeResizable}
            >
                <div></div>
            </Window>
    </WindowManager>
</main>

<style>
    :global(*, *::before, *::after) {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    main {
        width: 100vw;
        height: 100vh;
        background-color: #f3f3f3;
    }

    div {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background-color: rgba(133, 77, 255, 0.247);
    }
</style>