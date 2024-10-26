<script lang="ts">
    export let show = false;

    function keydown(e: KeyboardEvent) {
        if (e.key === "i" && e.ctrlKey) show = !show;
    }
</script>

<svelte:window on:keydown={keydown} />

<section class="debugger123" style="--show:{show ? "block" : "none"}">
    <div>
        <h2>Debugger</h2>
        <button on:click={() => show = false}>X</button>
    </div>
    <slot />
</section>

<style>
    section {
        display: var(--show);
        width: 300px;
        height: 400px;
        background-color: #000000;
        border: 1px solid #ffffff;
        position: fixed;
        z-index: 200;
        top: 0;
        right: 50px;
        color: #ffffff;
        padding: 10px;
    }

    section div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    button {
        width: 20px;
    }

    :global(.debugger123 label) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
    }
</style>