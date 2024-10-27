<script lang="ts">
    import { writable } from "svelte/store";

    export let setCurrentFocus = "";

    let manager = writable({
        currentFocus: setCurrentFocus
    });
</script>

<section>
    <slot {manager} />
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        isolation: isolate;
    }
</style>