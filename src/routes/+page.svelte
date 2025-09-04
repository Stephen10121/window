<script lang="ts">
    import WindowManager from "$lib/WindowManager.svelte";
</script>

<div class="scroller"></div>
<main>
    <WindowManager />
</main>
<div class="scroller"></div>

<style>
    .scroller {
        width: 100%;
        height: 100vh;
    }
    main {
        width: 1000px;
        height: 500px;
        margin-top: 200px;
        margin-left: 100px;
    }
</style>