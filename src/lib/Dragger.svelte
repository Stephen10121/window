<script lang="ts">
    export let top: number;
    export let left: number;

    export let hitboxes: boolean;
    export let draggerHeight = 50;

    let xMouseCompensation = 0;
    let yMouseCompensation = 0;
    let aBarIsActive = false;

    function clearSelection() {
        //@ts-ignore
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        //@ts-ignore
        else if (document.selection) {document.selection.empty();}
    }

    function resizeMouseMove(e: MouseEvent) {
        if (e.buttons === 0) {
            yMouseCompensation = e.layerY;
            xMouseCompensation = e.layerX;
        }
        //@ts-ignore
        if (e.buttons !== 1 || !e.target?.matches(":active")) {
            if (aBarIsActive) clearSelection();
            aBarIsActive = false;
            return;
        }
        if (aBarIsActive === false) {
            clearSelection();
        }
        aBarIsActive = true;
        left = e.clientX - xMouseCompensation;
        top = e.clientY - yMouseCompensation;
    }
</script>

<div class="par {hitboxes ? "debug" : ""}">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div style="--dragger-height:{draggerHeight}px;" class="dragger" on:mousemove={resizeMouseMove} />
</div>

<style>
    .par {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 200;
    }

    .dragger {
        width: 100%;
        height: var(--dragger-height);
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: all;
    }

    .dragger:active {
        height: 2000px;
        width: calc(2000px + 100%);
        left: -1000px;
        top: -1000px;
        z-index: 200;
    }





    /* .par:has(.topResiser:active) *:not(.topResiser),
    .par:has(.rightResiser:active) *:not(.rightResiser),
    .par:has(.bottomResiser:active) *:not(.bottomResiser),
    .par:has(.leftResiser:active) *:not(.leftResiser) {pointer-events: none}

    .par:has(.dragger:active) *:not(.dragger) {pointer-events: none}

    .par.debug:has(.topResiser:active) *:not(.topResiser),
    .par.debug:has(.rightResiser:active) *:not(.rightResiser),
    .par.debug:has(.bottomResiser:active) *:not(.bottomResiser),
    .par.debug:has(.dragger:active) *:not(.dragger),
    .par.debug:has(.leftResiser:active) *:not(.leftResiser) {background-color: #ff000085} */

    /* The hiboxes colors */
    /* .par.debug {background-color: #ff00004b} */
    /* .par.debug .topResiser {background-color: #559bf752}
    .par.debug .rightResiser {background-color: #55f7e152}
    .par.debug .bottomResiser {background-color: #d155f752}
    .par.debug .leftResiser {background-color: #f7ab5552} */
    .par.debug .dragger {background-color: #55f77052}
</style>