<script lang="ts">
    import Resizers from "./Resizers.svelte";

    export let width = 500;
    export let height = 500;

    export let minHeight = 200;
    export let minWidth = 200;

    export let resizable = true;
    export let hitboxes = false;

    let focused = true;

    let top = 200;
    let left = 200;

    let window: HTMLElement;
</script>

<section
    bind:this={window}
    class="window"
    style="--width:{width}px;--height:{height}px;--top:{top}px;--left:{left}px;"
>
    {#if resizable && focused}
        <Resizers
            {window}
            bind:height
            bind:width
            bind:top
            bind:left
            {hitboxes}
            {minHeight}
            {minWidth}
        />
    {/if}
    <p>Height: {height}</p>
    <p>Top: {top}</p>
    <p>Width: {width}</p>
    <p>Left: {left}</p>
</section>

<style>
    .window {
        width: var(--width);
        height: var(--height);
        position: absolute;
        top: var(--top);
        left: var(--left);
        border: 1px solid black;
    }
</style>