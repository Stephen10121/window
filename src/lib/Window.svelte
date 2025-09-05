<script lang="ts">
    import type { ActualWindowProps } from "./utils.js";
    import WindowDragger from "./WindowDragger.svelte";
    import BottomResize from "./BottomResize.svelte";
    import RightResize from "./RightResize.svelte";
    import LeftResize from "./LeftResize.svelte";
    import TopResize from "./TopResize.svelte";
    import { onDestroy } from "svelte";

    const FORCEMINWIDTH = 300;
    const FORCEMINHEIGHT = 300;

    let {
        height = $bindable("300px"),
        width = $bindable("300px"),
        left = $bindable("100px"),
        top = $bindable("100px"),
        windowDragRegions = [],
        onActiveStateChanged,
        resizable = true,
        minHeight = 300,
        minWidth = 300,
        children,
        context,
        style,
        id
    }: ActualWindowProps = $props();

    let window: HTMLElement | undefined = $state();
    let somethingMoving = $state(false);
    let stackOrder = $state(1);
    let active = $state(false);

    function activeStateHasChanged(state: boolean) {
        if (onActiveStateChanged) onActiveStateChanged(state);
    }

    $effect(() => {
        activeStateHasChanged(active);
    });

    function windowOrderChanged(winId: string, winOrder: string[]) {
        stackOrder = winOrder.indexOf(id) * 10;
        active = id == winId;
    }

    function activeMouseStateChanged(activeMouseListener: string) {
        somethingMoving = activeMouseListener !== "senfjkenfsjkenfseffsefsefsef";
    }

    const unsubscribeMouseListener = context.mouseContext.subscribeActiveMouseSubscribers(activeMouseStateChanged);
    const unsubscribeWindow = context.windowContext.registerWindow(id, windowOrderChanged);

    onDestroy(() => {
        unsubscribeMouseListener();
        unsubscribeWindow();
    });
</script>

<section
    class="{active?"active":"inactive"}"
    style="--stackOrder:{stackOrder};width:max({width},min({Math.max(FORCEMINWIDTH, minWidth)}px, 100%));height:max({height},min({Math.max(FORCEMINHEIGHT, minHeight)}px, 100%));top:{top};left:{left};{style}"
    {id}
    bind:this={window}
>
    {#if context.desktop}
        <div class="draggers">
            {#each windowDragRegions as dragConfig, index (`windowDragger${id}${index}`)}
                <WindowDragger
                    activated={() => context.windowContext.setActiveWindow(id)}
                    mouseContext={context.mouseContext}
                    id="windowDragger{id}{index}"
                    desktop={context.desktop}
                    parentWindow={window}
                    {dragConfig}
                    bind:left
                    bind:top
                    {active}
                />
            {/each}
        </div>
        {#if active && resizable}
            <TopResize
                mouseContext={context.mouseContext}
                desktop={context.desktop}
                id="windowresize{id}top"
                bind:height
                {minHeight}
                bind:top
            />
            <RightResize
                mouseContext={context.mouseContext}
                id="windowresize{id}right"
                desktop={context.desktop}
                parentWindow={window}
                {minWidth}
                bind:width
            />
            <BottomResize
                mouseContext={context.mouseContext}
                id="windowresize{id}bottom"
                desktop={context.desktop}
                parentWindow={window}
                {minHeight}
                bind:height
            />
            <LeftResize
                mouseContext={context.mouseContext}
                id="windowresize{id}left"
                desktop={context.desktop}
                {minWidth}
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
        border-radius: var(--borderRadius, 0);
        box-shadow: var(--boxShadow);
        z-index: var(--stackOrder);
        position: absolute;
        isolation: isolate;
    }

    .draggers {
        pointer-events: none;
        position: absolute;
        isolation: isolate;
        overflow: hidden;
        z-index: 200;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
    }

    .cover {
        pointer-events: all;
        position: absolute;
        z-index: 100;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
    }

    .covermoving {
        pointer-events: all;
        position: absolute;
        height: 100%;
        z-index: 100;
        width: 100%;
        left: 0;
        top: 0;
    }

	.rest {
        pointer-events: all;
        isolation: isolate;
		overflow: hidden;
		height: 100%;
		width: 100%;
	}
</style>