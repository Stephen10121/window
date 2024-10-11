<script lang="ts">
    import Debugger from "$lib/Debugger.svelte";
    import Window from "$lib/Window.svelte";

    let hitboxes = true;
</script>

<Debugger>
    <label>
        <input type="checkbox" bind:checked={hitboxes} />
        <p>Show Hitboxes</p>
    </label>
</Debugger>

<section>
    <Window {hitboxes} />
</section>

<style>
    :global(body) {
        padding: 0;
        margin: 0;
    }
    
    section {
        width: 100%;
        height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }
</style>