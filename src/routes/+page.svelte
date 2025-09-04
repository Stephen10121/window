<script lang="ts">
    import WindowManager from "$lib/WindowManager.svelte";
</script>

<section>
    <div class="scroller"></div>
    <main>
        <WindowManager />
    </main>
    <div class="scroller"></div>
</section>

<style>
    section {
        display: flex;
        width: 100vw;
        height: 100vh;
        overflow: auto;
    }
    .scroller {
        width: 100vw;
        height: 100vh;
    }
    main {
        min-width: 1000px;
        height: 500px;
        margin-top: 200px;
        margin-left: 100px;
    }
</style>