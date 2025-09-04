<script lang="ts">
    import type { Snippet } from "svelte";
    import { MouseContext, WindowContext } from "./utils.js";

    type ParentDesktop = HTMLElement | undefined;

    let {
        children = undefined,
        mouseContext = new MouseContext(),
        windowContext = new WindowContext()
    }: { 
        children?: Snippet<[{mouseContext: MouseContext, windowContext: WindowContext, desktop: ParentDesktop}]>,
        mouseContext?: MouseContext,
        windowContext?: WindowContext,
    } = $props();
    let parentDesktop: ParentDesktop = $state();

</script>

<svelte:window 
    on:mousemove={(e) => mouseContext.mouseMoving(e)}
    on:mouseup={(e) => mouseContext.mouseIsUp(e)}
/>

<section bind:this={parentDesktop}>
    <div class="rest">
        {#if children}
            {@render children({ mouseContext, windowContext, desktop: parentDesktop })}
        {/if}
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        display: grid;
        grid-template-rows: auto 48px;
        box-sizing: border-box;
    }
    
    section * {
        box-sizing: border-box;
        user-drag: none;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        text-decoration: none;
        -webkit-touch-callout: none; /* iOS Safari */
        -khtml-user-select: none; /* Konqueror HTML */
    }

    .rest {
        width: 100%;
        height: 100%;
    }
</style>