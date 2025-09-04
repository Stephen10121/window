<script lang="ts">
    import Window from "$lib/Window.svelte";
    import WindowManager from "$lib/WindowManager.svelte";
</script>

<WindowManager>
    {#snippet children(mouseContext, windowContext, closeWindow, parentDesktop)}
        <Window
            id="win03"
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
            id="win04"
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
    {/snippet}
</WindowManager>