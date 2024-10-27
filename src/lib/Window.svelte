<script lang="ts">
    import type { Writable } from "svelte/store";
    import Resizers from "./Resizers.svelte";
    import { onMount } from "svelte";
    import Dragger from "./Dragger.svelte";

    /**
     * Sets the width of the box measured in pixels.
     * If you don't set the width then the default will be 500px wide.
     * @example
     * <Window width={700} />
     * 
     * You can also bind a variable to the width.
     * 
     * @example
     * <script>
     *     let boxWidth = 200;
     * <\\/script>
     * 
     * <Window bind:width={boxWidth} />
     */
    export let width = 500;
    export let height = 500;

    export let minHeight = 200;
    export let minWidth = 200;
    
    export let draggerHeight = "50px";
    export let draggerWidth = "100%";
    export let draggerTop = 0;
    export let draggerLeft = 0;

    export let resizable = true;
    export let draggable = true;

    export let manager: Writable<{currentFocus: string}>;
    export let id: string;


    let focused = false;
    let top = 200;
    let left = 200;

    let windowBox: HTMLElement;

    onMount(() => {
        const managerUnsubscribe = manager.subscribe((data) => {
            focused = data.currentFocus === id;
        });

        return () => {
            managerUnsubscribe();
        }
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
    bind:this={windowBox}
    on:mousedown={() => {manager.update((data) => {return {...data, currentFocus: id}})}}
    class="window {focused ? "focused" : ""}"
    style="--width:{width}px;--height:{height}px;--top:{top}px;--left:{left}px;"
>
    <section class="content">
        <slot />
    </section>

    {#if resizable && focused}
        <Resizers
            {windowBox}
            bind:height
            bind:width
            bind:top
            bind:left
            {minHeight}
            {minWidth}
        />
    {/if}

    {#if !focused}
        <div class="notFocused" />
    {/if}

    {#if draggable}
        <Dragger
            bind:top
            bind:left
            {draggerHeight}
            {draggerWidth}
            {draggerTop}
            {draggerLeft}
        />
    {/if}
</section>

<style>
    .window {
        width: var(--width);
        height: var(--height);
        position: absolute;
        top: var(--top);
        left: var(--left);
        /* border: 1px solid black; */
        isolation: isolate;
    }

    .window.focused {
        z-index: 200;
    }

    .content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        isolation: isolate;
    }

    .notFocused {
        background-color: rgba(255, 255, 255, 0.096);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 200;
    }
</style>