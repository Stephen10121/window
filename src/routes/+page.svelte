<script lang="ts">
    import WindowManager from "$lib/WindowManager.svelte";
    import Window from "$lib/Window.svelte";

    let exampleCode = `
<Window
    id="awindwo"
    {context}
    basicStyling={false}
    windowDragRegions={[{width:"100%",height:"100%",top:"0px",left:"0px"}]}
>
    <section style="width:100%;height:100%;background-color:black;">
        Drag or Resize Me!
    </section>
</Window>
    `;

    let showBox = $state(true);
    let boxWidth = $state("400px");
    let boxHeight = $state("300px");
    let boxTop = $state("0px");
    let boxLeft = $state("0px");
</script>

<main>
    <WindowManager>
        {#snippet children(context)}
            <Window
                id="awindow"
                {context}
                windowDragRegions={[{width:"100%",height:"100%",top:"0px",left:"0px"}]}
            >
                <section style="width: 100%;height:100%;background-color:black;">
                    Drag or Resize Me!
                    <pre><code>{exampleCode}</code></pre>
                </section>
            </Window>
            <Window
                id="setter"
                {context}
                windowDragRegions={[{width:"100%",height:"40px",top:"0px",left:"0px"}]}
                style="--boxShadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;--borderRadius: 10px;"
            >
                <div class="setter">
                    <div class="taskbar"></div>
                    <div class="rest">
                        Drag or Resize Me!
                        <pre><code>{exampleCode}</code></pre>
                    </div>
                </div>
            </Window>
        {/snippet}
    </WindowManager>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        background-color: #dfdfdf;
    }

    .setter {
        width: 100%;
        height: 100%;
        background-color: #272727;
        display: grid;
        grid-template-rows: 40px auto;
        border-radius: 5px;
        overflow: hidden;
    }

    .setter .taskbar {
        background-color: #202020;
        width: 100%;
        height: 100%;
    }
</style>