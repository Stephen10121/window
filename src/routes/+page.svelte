<script lang="ts">
    import Debugger from "$lib/Debugger.svelte";
    import Window from "$lib/Window.svelte";
    import WindowManager from "$lib/WindowManager.svelte";

    let showHitboxes = true;
</script>

<Debugger>
    <label>
        <input type="checkbox" bind:checked={showHitboxes} />
        <p>Show Hitboxes</p>
    </label>
</Debugger>

<main>
    <WindowManager let:currentFocusStore>
            <Window {showHitboxes} draggerHeight={100} id="window1" {currentFocusStore}>
                <div>
                    <iframe src="https://www.stephengruzin.dev/" title="Google" height="100%" width="100%" frameborder="0"></iframe>
                </div>
            </Window>
            <Window {showHitboxes}  id="window2" {currentFocusStore}>
                <div>
                    <iframe src="https://www.stephengruzin.dev/" title="Google" height="100%" width="100%" frameborder="0"></iframe>
                </div>
            </Window>
    </WindowManager>
</main>

<style>
    :global(body) {
        padding: 0;
        margin: 0;
    }

    main {
        width: 100vw;
        height: 100vh;
    }

    div {
        width: 100%;
        height: 100%;
    }
</style>