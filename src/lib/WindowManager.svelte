<script lang="ts">
    import type { Snippet } from "svelte";
    import { MouseContext, WindowContext, type ActualWindowProps } from "./utils.js";

    type ParentDesktop = HTMLElement | undefined;

    let {
        children = undefined,
        mouseContext = new MouseContext(),
        windowContext = new WindowContext()
    }: { 
        children?: Snippet<[ActualWindowProps["context"]]>,
        mouseContext?: MouseContext,
        windowContext?: WindowContext,
    } = $props();
    
    let parentDesktop: ParentDesktop = $state();

</script>

<svelte:window 
    onmousemove={(e) => mouseContext.mouseMoving(e)}
    onmouseup={(e) => mouseContext.mouseIsUp(e)}
/>

<section class="rest" bind:this={parentDesktop}>
    {#if children}
        {@render children({ mouseContext, windowContext, desktop: parentDesktop })}
    {/if}
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        pointer-events: none;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        box-sizing: border-box;
    }
</style>