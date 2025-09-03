<script lang="ts">
    import WindowDragger from "./WindowDragger.svelte";
    import BottomResize from "./BottomResize.svelte";
    import RightResize from "./RightResize.svelte";
    import LeftResize from "./LeftResize.svelte";
    import TopResize from "./TopResize.svelte";
    import { fade } from 'svelte/transition';
    import { createEventDispatcher, onDestroy } from "svelte";
    import type { MouseContext, WindowContext, WindowDragConfig } from "./utils.js";

    const dispatch = createEventDispatcher();
    const FORCEMINWIDTH = 300;
    const FORCEMINHEIGHT = 300;

    export let windowDragConfigs: WindowDragConfig[] = []
    $: windowDragConfig = [{top: "0", left: "0", width: "calc(100% - 135px)", height: "28px"},...windowDragConfigs];
    export let mouseContext: MouseContext;
    export let windowContext: WindowContext;
    export let resizable = true;
    export let height = "300px";
    export let minHeight = 300;
    export let width = "300px";
    export let minWidth = 300;
    export let left = "100px";
    export let top = "100px";
    export let icon = "/defaulticon.svg";
    export let name = "Application";
    export let id: string;
    export let blurWindowBackground = true;

    let window: HTMLElement;
    let active = false;

    const unsubscribeWindow = windowContext.registerWindow(id, (winId) => {
        active = id == winId;
    });

    onDestroy(() => {
        unsubscribeWindow();
    });
</script>

<section class="{active?"active":"inactive"}{blurWindowBackground ? " blurBackground" :""}" style="width:max({width},min({Math.max(FORCEMINWIDTH, minWidth)}px, 100%));height:max({height},min({Math.max(FORCEMINHEIGHT, minHeight)}px, 100%));top:{top};left:{left};" {id} bind:this={window}>
    {#each windowDragConfig as dragConfig, index (`windowDragger${id}${index}`)}
        <WindowDragger
            parentWindow={window}
            id="windowDragger{id}{index}"
            {mouseContext}
            {dragConfig}
            {active}
            on:active={() => windowContext.setActiveWindow(id)}
            bind:top
            bind:left
        />
    {/each}
    {#if active && resizable}
        <TopResize
            id="windowresize{id}top"
            {mouseContext}
            {minHeight}
            bind:height
            bind:top
        />
        <RightResize
            id="windowresize{id}right"
            parentWindow={window}
            {mouseContext}
            bind:width
        />
        <BottomResize
            id="windowresize{id}bottom"
            parentWindow={window}
            {mouseContext}
            bind:height
        />
        <LeftResize
            id="windowresize{id}left"
            {mouseContext}
            {minWidth}
            bind:width
            bind:left
        />
    {/if}
    <div class="mainContent">
        <div class="header">
            <div class="iconName">
                <div class="imgCover"><img src={icon} alt="Icon" /></div>
                <p>{name}</p>
            </div>
            <div class="closebuttons">
            <button class="minimize"><div class="dash" /></button>
            <button class="resize">
                {#if active}
                    <div in:fade={{duration:250}} class="minimize-box" />
                {:else}
                    <div in:fade={{duration:250}} class="box"></div>
                {/if}
            </button>
            <button class="close" on:click={() => dispatch("close")}><img src="x.svg" alt="Close" /></button>
            </div>
        </div>
        <div class="rest">
            <slot />
        </div>
    </div>
    {#if !active}
        <div class="cover" on:mousedown={() => windowContext.setActiveWindow(id)} role="none"></div>
    {/if}
</section>

<style>
    section {
        position: absolute;
        isolation: isolate;
    }

    section.active {
        z-index: 10;
    }

    section.active.blurBackground {
        backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		background-color: rgba(43, 43, 43, 0.534);
		filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
    }

    section.inactive {
        z-index: 8;
        background-color: #1a1a1a;
    }

    .mainContent {
        width: 100%;
        height: 100%;
        overflow: hidden;
        isolation: isolate;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 1px;
        border-radius: 5px;
        display: grid;
        grid-template-rows: 28px calc(100% - 28px);
    }

    .cover {
        position: absolute;
        width: 100%;
        height: calc(100% - 28px);
        top: 28px;
        left: 0;
        z-index: 150;
    }

    .header {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: auto 135px;
	}

	.rest {
		width: 100%;
		height: 100%;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		overflow: hidden;
	}

	.iconName {
		display: flex;
		align-items: center;
		justify-content: start;
		padding-left: 5px;
		position: relative;
	}

	.imgCover {
		height: 13px;
	}

	.imgCover img {
		height: 100%;
	}

	.iconName p {
		margin-left: 5px;
        margin-bottom: 0;
		font-size: 1.2rem;
		color: #ffffff;
		font-weight: 100;
		word-spacing: 3px;
		letter-spacing: 1px;
	}

	.resize,
	.minimize {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.resize:hover,
	.minimize:hover {
		background-color: rgba(71, 71, 71, 0.356);
	}

	.minimize .dash {
		width: 11px;
		height: 1px;
		background-color: white;
	}

	.resize .box {
		width: 10px;
		height: 10px;
		border: 1px solid white;
		border-radius: 2px;
	}

	.resize .minimize-box {
		width: 10px;
		height: 10px;
		/* border: 1px solid #ffffff; */
		border-top: 1px solid #ffffff;
		border-right: 1px solid #ffffff;
		border-radius: 2px;
		position: relative;
		margin-bottom: 2px;
	}

	.minimize-box::after {
		content: "";
		position: absolute;
		width: 9px;
		height: 9px;
		border: 1px solid #ffffff;
		border-radius: 2px;
		left: -2px;
		top: 2px;
	}

	.closebuttons {
		display: grid;
		grid-template-columns: 45px 45px 45px;
		height: 28px;
		border-top-right-radius: 5px;
		overflow: hidden;
	}

	.closebuttons button {
		border: none;
		background: none;
		width: 100%;
		height: 28px;
	}

	.close {
		padding: 2px 10px;
	}

	.close:hover {
		background-color: rgb(206, 14, 14);
	}

	.close img {
		width: 100%;
		filter: invert(1);
	}
</style>