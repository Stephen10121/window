<script lang="ts">
    import Window from "$lib/Window.svelte";
    import WindowManager from "$lib/WindowManager.svelte";
</script>

<section>

    <main>
        <WindowManager>
            <!-- {#snippet children(mouseContext, windowContext, closeWindow, parentDesktop)}
                <Window
                    id="wowxaadnstuff"
                    {mouseContext}
                    desktop={parentDesktop}
                    windowDragConfigs = {[]}
                    top="0px"
                    left="0px"
                    {windowContext}
                    close={() => closeWindow("wowxaadnstuff")}
                    name="The Best Application"
                >
                    wwo
                </Window>
                <Window
                    id="wowxaadnstuff2"
                    {mouseContext}
                    desktop={parentDesktop}
                    windowDragConfigs = {[]}
                    top="0px"
                    left="300px"
                    {windowContext}
                    close={() => closeWindow("wowxaadnstuff")}
                    name="The Best Application 2"
                >
                    wwo
                </Window>
            {/snippet} -->
        </WindowManager>
    </main>
</section>

<style>
    section {
        width: 100vw;
        height: 100vh;
        /* display: flex;
        padding: 1000px; */
    }
    main {
        /* width: 1000px;
        height: 500px;
        margin-top: 200px;
        margin-left: 100px; */
        width: 100%;
        height: 100%;
    }
</style>