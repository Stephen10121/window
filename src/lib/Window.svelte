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
        windowDragRegions = [],
        context,
        resizable = true,
        height = $bindable("300px"),
        minHeight = 300,
        width = $bindable("300px"),
        minWidth = 300,
        left = $bindable("100px"),
        top = $bindable("100px"),
        inactiveColor = "#1a1a1aa1",
        blurWindowBackground = true,
        id,
        children,
    }: ActualWindowProps = $props();

    let window: HTMLElement | undefined = $state();
    let active = $state(false);
    let somethingMoving = $state(false);
    let stackOrder = $state(1);

    const unsubscribeWindow = context.windowContext.registerWindow(id, (winId, winOrder) => {
        active = id == winId;
        stackOrder = winOrder.indexOf(id) * 10;
    });

    const unsubscribeMouseListener = context.mouseContext.subscribeActiveMouseSubscribers((activeMouseListener) => {
        somethingMoving = activeMouseListener !== "adawdawdklawdlawdmawldmawlkdmldm8321093289038i";
    });

    onDestroy(() => {
        unsubscribeWindow();
        unsubscribeMouseListener();
    });
</script>

<section class="{active?"active":"inactive"}{blurWindowBackground ? " blurBackground" :""}" style="--inactiveColor:{inactiveColor};--stackOrder:{stackOrder};width:max({width},min({Math.max(FORCEMINWIDTH, minWidth)}px, 100%));height:max({height},min({Math.max(FORCEMINHEIGHT, minHeight)}px, 100%));top:{top};left:{left};" {id} bind:this={window}>
    {#if context.desktop}
        <div class="draggers">
            {#each windowDragRegions as dragConfig, index (`windowDragger${id}${index}`)}
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
            {@render children()}
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
        background-color: var(--inactiveColor);
    }

    .cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: var(--inactiveColor);
        border-radius: var(--winRadius);
        pointer-events: all;
    }

    .covermoving {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        pointer-events: all;
    }

	.rest {
		width: 100%;
		height: 100%;
		border-radius: var(--winRadius2);
		overflow: hidden;
        pointer-events: all;
        isolation: isolate;
	}
</style>