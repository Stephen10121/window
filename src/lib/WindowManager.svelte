<script lang="ts">
    import { writable } from "svelte/store";

    export let setCurrentFocus = "";

    let currentFocusStore = writable({
        currentFocus: setCurrentFocus
    });
</script>

<section>
    <slot {currentFocusStore} />
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