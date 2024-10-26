<script lang="ts">
    import { writable } from "svelte/store";

    let currentFocusStore = writable({
        currentFocus: ""
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
        background-color: #dfdfdf;
        isolation: isolate;
    }
</style>