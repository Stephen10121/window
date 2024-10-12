<script lang="ts">
    import Resizers from "./Resizers.svelte";

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

    export let resizable = true;
    export let showHitboxes = false;

    let focused = true;

    let top = 200;
    let left = 200;

    let windowBox: HTMLElement;
</script>

<section
    bind:this={windowBox}
    class="window"
    style="--width:{width}px;--height:{height}px;--top:{top}px;--left:{left}px;"
>
    {#if resizable && focused}
        <Resizers
            {windowBox}
            bind:height
            bind:width
            bind:top
            bind:left
            hitboxes={showHitboxes}
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