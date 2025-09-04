<script lang="ts">
    import { onDestroy } from "svelte";
    import type { ActualWindowProps } from "./utils.js";
    import WindowDragger from "./WindowDragger.svelte";
    import TopResize from "./TopResize.svelte";
    import RightResize from "./RightResize.svelte";
    import BottomResize from "./BottomResize.svelte";
    import LeftResize from "./LeftResize.svelte";

    const FORCEMINWIDTH = 300;
    const FORCEMINHEIGHT = 300;

    let {
        windowDragConfigs = [],
        context,
        resizable = true,
        height = "300px",
        minHeight = 300,
        width = "300px",
        minWidth = 300,
        left = "100px",
        top = "100px",
        id,
        blurWindowBackground = true,
        children,
    }: ActualWindowProps = $props();

    let windowDragConfig = $derived([{top: "0", left: "0", width: "calc(100% - 135px)", height: "28px"}, ...windowDragConfigs]);
    let window: HTMLElement | undefined = $state();
    let active = $state(false);
    let somethingMoving = $state(false);
    let stackOrder = $state(1);
    let ids = $derived([`windowresize${id}left`, `windowresize${id}bottom`, `windowresize${id}right`, `windowresize${id}top`, ...windowDragConfig.map((_, index) => `windowDragger${id}${index}`)]);

    const unsubscribeWindow = context.windowContext.registerWindow(id, (winId, winOrder) => {
        active = id == winId;
        stackOrder = winOrder.indexOf(id) * 10;
    });

    const unsubscribeMouseListener = context.mouseContext.subscribeActiveMouseSubscribers((activeMouseListener) => {
        somethingMoving = ids.includes(activeMouseListener);

        console.log(ids.includes(activeMouseListener) ? `${id} is active` : "");
    });

    onDestroy(() => {
        unsubscribeWindow();
        unsubscribeMouseListener();
    });
</script>

<section class="{active?"active":"inactive"}{blurWindowBackground ? " blurBackground" :""}" style="--stackOrder:{stackOrder};width:max({width},min({Math.max(FORCEMINWIDTH, minWidth)}px, 100%));height:max({height},min({Math.max(FORCEMINHEIGHT, minHeight)}px, 100%));top:{top};left:{left};" {id} bind:this={window}>
    {#if context.desktop}
        <div class="draggers">
            {#each windowDragConfig as dragConfig, index (`windowDragger${id}${index}`)}
                <WindowDragger
                    parentWindow={window}
                    desktop={context.desktop}
                    id="windowDragger{id}{index}"
                    mouseContext={context.mouseContext}
                    {dragConfig}
                    {active}
                    activated={() => context.windowContext.setActiveWindow(id)}
                    bind:top
                    bind:left
                />
            {/each}
        </div>
        {#if active && resizable}
            <TopResize
                id="windowresize{id}top"
                mouseContext={context.mouseContext}
                {minHeight}
                desktop={context.desktop}
                bind:height
                bind:top
            />
            <RightResize
                id="windowresize{id}right"
                parentWindow={window}
                mouseContext={context.mouseContext}
                desktop={context.desktop}
                bind:width
            />
            <BottomResize
                id="windowresize{id}bottom"
                parentWindow={window}
                mouseContext={context.mouseContext}
                desktop={context.desktop}
                bind:height
            />
            <LeftResize
                id="windowresize{id}left"
                mouseContext={context.mouseContext}
                {minWidth}
                desktop={context.desktop}
                bind:width
                bind:left
            />
        {/if}
    {/if}
    <div class="rest">
        {#if children}
            {@render children()}{stackOrder}
        {/if}
    </div>
    {#if !active}
        <div class="cover" onmousedown={() => context.windowContext.setActiveWindow(id)} role="none"></div>
    {/if}
    {#if somethingMoving}
        <div class="covermoving" role="none"></div>
    {/if}
</section>

<style>
    section {
        --winRadius2: var(--winRadius, 5px);
        position: absolute;
        isolation: isolate;
        z-index: var(--stackOrder);
        border-radius: var(--winRadius2);
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 1px;
    }

    .draggers {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        isolation: isolate;
        z-index: 200;
        border-radius: var(--winRadius);
        overflow: hidden;
        pointer-events: none;
    }

    section.active.blurBackground {
        backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		background-color: rgba(43, 43, 43, 0.534);
		filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
    }

    section.inactive {
        background-color: #1a1a1aa1;
    }

    .cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: #1a1a1aa1;
    }

    .covermoving {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
    }

	.rest {
		width: 100%;
		height: 100%;
		border-radius: var(--winRadius2);
		overflow: hidden;
	}
</style>