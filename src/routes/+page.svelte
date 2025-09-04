<script lang="ts">
    import Window from "$lib/Window.svelte";
    import WindowManager from "$lib/WindowManager.svelte";
</script>

<main>
    <WindowManager>
        {#snippet children(context)}
            <Window
                id="win03"
                {context}
                top="0px"
                left="0px"
                resizable
                windowDragConfigs={[{width:"100%",height:"100%",top:"0px",left:"0px", color:"#ff000033"}]}
            >
                The whole window is draggable
            </Window>
            <Window
                id="win04"
                {context}
                top="0px"
                left="300px"
                windowDragConfigs={[]}
                resizable
            >
                <iframe src="https://stephengruzin.dev" frameborder="0" style="width: 100%;height:100%"></iframe>
            </Window>
            <Window
                id="googlewin"
                {context}
                top="0px"
                left="300px"
                windowDragConfigs={[]}
                resizable
            >
                <iframe src="https://challenge.clarkstudents.com" frameborder="0" style="width: 100%;height:100%"></iframe>
            </Window>
        {/snippet}
    </WindowManager>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        --winRadius: 10px
    }
</style>