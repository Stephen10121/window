<script lang="ts">
    import Resizers from "./Resizers.svelte";

    export let width = 500;
    export let height = 500;
    export let minHeight = 200;
    export let resizable = true;
    export let hitboxes = false;

    let focused = true;
    let top = 200;
    let window: HTMLElement;
</script>

<section
    bind:this={window}
    class="window"
    style="--width:{width}px;--height:{height}px;--top:{top}px;"
>
    {#if resizable && focused}
        <Resizers
            {window}
            bind:height
            bind:top
            {hitboxes}
            {minHeight}
        />
    {/if}
    {height}
    window
</section>

<style>
    .window {
        width: var(--width);
        height: var(--height);
        position: absolute;
        top: var(--top);
        border: 1px solid black;
    }
</style>