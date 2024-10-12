<script lang="ts">
    import Debugger from "$lib/Debugger.svelte";
    import Window from "$lib/Window.svelte";

    let showHitboxes = true;
</script>

<Debugger>
    <label>
        <input type="checkbox" bind:checked={showHitboxes} />
        <p>Show Hitboxes</p>
    </label>
</Debugger>

<section>
    <Window {showHitboxes} />
</section>

<style>
    :global(body) {
        padding: 0;
        margin: 0;
    }
    
    section {
        width: 100%;
        height: 100dvh;
        position: relative;
        overflow: hidden;
    }
</style>