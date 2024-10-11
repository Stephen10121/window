<script lang="ts">
    export let height: number;
    export let minHeight: number;
    export let window: HTMLElement;
    export let hitboxes: boolean;
    export let top: number;

    let prevTop = 0;
    let prevHeight = 0;
    let topComp = 0;
    let bottomComp = 0;


    let topBarActive = false;
    let bottomBarActive = false;

    function topMouseMove(e: MouseEvent) {
        if (e.buttons === 0) topComp = e.layerY;
        if (e.buttons !== 1) {
            topBarActive = false;
            return;
        }
        if (topBarActive === false) {
            prevTop = window.getBoundingClientRect().top;
            prevHeight = height;
        }
        topBarActive = true;

        top = Math.min(e.clientY + topComp, prevTop + prevHeight - ( minHeight + 8 ));
        height = Math.max(prevHeight + (prevTop - top - 8), minHeight);
    }

    function bottomMouseMove(e: MouseEvent) {
        if (e.buttons === 0) bottomComp = e.layerY;
        if (e.buttons !== 1) {
            bottomBarActive = false;
            return;
        }
        if (bottomBarActive === false) {
            prevTop = window.getBoundingClientRect().top;
            prevHeight = height;
        }
        bottomBarActive = true;
        height = Math.max(e.clientY - bottomComp - prevTop, minHeight);
    }
</script>

<div class="par {hitboxes ? "debug" : ""}">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="verticalResiser topResiser" on:mousemove={topMouseMove} />

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="verticalResiser bottomResiser" on:mousemove={bottomMouseMove} />
</div>

<style>
    .par {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .verticalResiser {
        width: 100%;
        height: 10px;
        position: absolute;
        left: 0;
        pointer-events: all;
    }

    .topResiser {top: -10px}
    .bottomResiser {bottom: -10px}
    .topResiser:active {top: -1000px}
    .bottomResiser:active {bottom: -1000px}

    .verticalResiser:active {
        height: 2000px;
        width: calc(1000px + 100%);
        left: -500px;
    }

    .verticalResiser:hover {cursor: n-resize}

    .topResiser:active + .bottomResiser {
        pointer-events: none;
    }

    /* The hiboxes colors */
    .par.debug {background-color: #ff00004b}
    .par.debug .topResiser {background-color: #559bf752}
    .par.debug .bottomResiser {background-color: #d155f752}
</style>