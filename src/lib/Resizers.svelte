<script lang="ts">
    export let width: number;
    export let height: number;

    export let minWidth: number;
    export let minHeight: number;

    export let top: number;
    export let left: number;

    export let hitboxes: boolean;
    export let windowBox: HTMLElement;

    let prevTop = 0;
    let prevLeft = 0;

    let prevHeight = 0;
    let prevWidth = 0;

    let xMouseCompensation = 0;
    let yMouseCompensation = 0;
    let aBarIsActive = false;

    function clearSelection() {
        //@ts-ignore
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        //@ts-ignore
        else if (document.selection) {document.selection.empty();}
    }

    function topMouseMove(e: MouseEvent) {
        if (e.buttons === 0) yMouseCompensation = e.layerY;
        //@ts-ignore
        if (e.buttons !== 1 || !e.target?.matches(":active")) {
            if (aBarIsActive) clearSelection();
            aBarIsActive = false;
            return;
        }
        if (aBarIsActive === false) {
            clearSelection();
            prevTop = windowBox.getBoundingClientRect().top;
            prevHeight = height;
        }
        aBarIsActive = true;

        top = Math.min(e.clientY + (9 - yMouseCompensation), prevTop + prevHeight - minHeight);
        height = Math.max(prevHeight + (prevTop - top), minHeight); 
    }

    function leftMouseMove(e: MouseEvent) {
        if (e.buttons === 0) xMouseCompensation = e.layerX;
        //@ts-ignore
        if (e.buttons !== 1 || !e.target?.matches(":active")) {
            if (aBarIsActive) clearSelection();
            aBarIsActive = false;
            return;
        }
        if (aBarIsActive === false) {
            clearSelection();
            prevLeft = windowBox.getBoundingClientRect().left;
            prevWidth = width;
        }
        aBarIsActive = true;

        left = Math.min(e.clientX + (9 - xMouseCompensation), prevLeft + prevWidth - minWidth);
        width = Math.max(prevWidth + (prevLeft - left), minWidth); 
    }

    function bottomMouseMove(e: MouseEvent) {
        if (e.buttons === 0) yMouseCompensation = e.layerY;
        //@ts-ignore
        if (e.buttons !== 1 || !e.target?.matches(":active")) {
            if (aBarIsActive) clearSelection();
            aBarIsActive = false;
            return;
        }
        if (aBarIsActive === false) {
            clearSelection();
            prevTop = windowBox.getBoundingClientRect().top;
            prevHeight = height;
        }
        aBarIsActive = true;
        height = Math.max(e.clientY - yMouseCompensation - prevTop, minHeight);
    }

    function rightMouseMove(e: MouseEvent) {
        if (e.buttons === 0) xMouseCompensation = e.layerX;
        //@ts-ignore
        if (e.buttons !== 1 || !e.target?.matches(":active")) {
            if (aBarIsActive) clearSelection();
            aBarIsActive = false;
            return;
        }
        if (aBarIsActive === false) {
            clearSelection();
            prevLeft = windowBox.getBoundingClientRect().left;
            prevWidth = width;
        }
        aBarIsActive = true;
        width = Math.max(e.clientX - xMouseCompensation - prevLeft, minWidth);
    }
</script>

<div class="par {hitboxes ? "debug" : ""}">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="verticalResiser topResiser" on:mousemove={topMouseMove} />

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="horizontalResiser rightResiser" on:mousemove={rightMouseMove} />

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="verticalResiser bottomResiser" on:mousemove={bottomMouseMove} />

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="horizontalResiser leftResiser" on:mousemove={leftMouseMove} />
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

    .horizontalResiser {
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        pointer-events: all;
    }

    .topResiser {top: -10px}
    .rightResiser {right: -10px}
    .bottomResiser {bottom: -10px}
    .leftResiser {left: -10px}

    .topResiser:active {top: -1000px}
    .rightResiser:active {right: -1000px}
    .bottomResiser:active {bottom: -1000px}
    .leftResiser:active {left: -1000px}

    .verticalResiser:active {
        height: 2000px;
        width: calc(1000px + 100%);
        left: -500px;
        z-index: 201;
    }

    .horizontalResiser:active {
        width: 2000px;
        height: calc(1000px + 100%);
        top: -500px;
        z-index: 201;
    }

    .verticalResiser:hover {cursor: n-resize}
    .horizontalResiser:hover {cursor: w-resize}

    .par:has(.topResiser:active) *:not(.topResiser),
    .par:has(.rightResiser:active) *:not(.rightResiser),
    .par:has(.bottomResiser:active) *:not(.bottomResiser),
    .par:has(.leftResiser:active) *:not(.leftResiser) {pointer-events: none}

    .par.debug:has(.topResiser:active) *:not(.topResiser),
    .par.debug:has(.rightResiser:active) *:not(.rightResiser),
    .par.debug:has(.bottomResiser:active) *:not(.bottomResiser),
    .par.debug:has(.leftResiser:active) *:not(.leftResiser) {background-color: #ff000085}

    /* The hiboxes colors */
    .par.debug {background-color: #ff00004b}
    .par.debug .topResiser {background-color: #559bf752}
    .par.debug .rightResiser {background-color: #55f7e152}
    .par.debug .bottomResiser {background-color: #d155f752}
    .par.debug .leftResiser {background-color: #f7ab5552}
</style>