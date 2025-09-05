<script lang="ts">
    import Window from "$lib/Window.svelte";
    import WindowManager from "$lib/WindowManager.svelte";

    let showPersonalWebsite = $state(true);

    let personalWebsiteTop = $state("0x");
    let personalWebsiteLeft = $state("300px");
    let personalWebsiteWidth = $state("300px");
    let personalWebsiteHeight = $state("300px");
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
                windowDragRegions={[
                    {width:"100%",height:"20px",top:"0px",left:"0px"}
                ]}
            >
                Personal Website Monitor
                <br>
                <button onclick={() => showPersonalWebsite = !showPersonalWebsite}>Toggle Personal Website</button>
                <p>Top: {personalWebsiteTop}</p>
                <p>Left: {personalWebsiteLeft}</p>
                <p>Width: {personalWebsiteWidth}</p>
                <p>Height: {personalWebsiteHeight}</p>
            </Window>
            {#if showPersonalWebsite}
                <Window
                    id="win04"
                    {context}
                    bind:top={personalWebsiteTop}
                    bind:left={personalWebsiteLeft}
                    bind:height={personalWebsiteHeight}
                    bind:width={personalWebsiteWidth}
                    windowDragRegions={[
                        {width:"10%",height:"10%",top:"0px",left:"0px", color:"#ff000033"},
                        {width:"10%",height:"10%",bottom:"0px",left:"0px", color:"blue"},
                        {width:"10%",height:"10%",top:"0px",right:"0px", color:"green"},
                        {width:"10%",height:"10%",bottom:"0px",right:"0px", color:"orange"}
                    ]}
                    resizable
                    inactiveColor="none"
                >
                    <iframe title="Personal Website" src="https://stephengruzin.dev" frameborder="0" style="width: 100%;height:100%"></iframe>
                </Window>
            {/if}
            <!-- <Window
                id="googlewin"
                {context}
                top="0px"
                left="300px"
                windowDragRegions={[]}
                resizable
            >
                <iframe src="https://challenge.clarkstudents.com" frameborder="0" style="width: 100%;height:100%"></iframe>
            </Window> -->
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