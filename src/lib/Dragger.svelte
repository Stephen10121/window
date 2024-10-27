<script lang="ts">
    export let top: number;
    export let left: number;

    export let draggerHeight: string;
    export let draggerWidth: string;
    export let draggerTop: number;
    export let draggerLeft: number;

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
        left = e.clientX - xMouseCompensation - draggerLeft;
        top = e.clientY - yMouseCompensation - draggerTop;
    }
</script>

<div class="par">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div style="--dragger-height:{draggerHeight};--dragger-width:{draggerWidth};--dragger-top:{draggerTop}px;--dragger-left:{draggerLeft}px;" class="dragger" on:mousemove={resizeMouseMove} />
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
        width: var(--dragger-width);
        height: var(--dragger-height);
        position: absolute;
        left: var(--dragger-left);
        top: var(--dragger-top);
        pointer-events: all;
    }

    .dragger:active {
        height: 2000px;
        width: calc(2000px + 100%);
        left: -1000px;
        top: -1000px;
        z-index: 200;
    }
</style>