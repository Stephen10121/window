<script lang="ts">
    import { onDestroy } from "svelte";
    import type { MouseContext } from "./utils.js";

    export let id: string;
    export let parentWindow: HTMLElement;
    export let mouseContext: MouseContext;
    export let width: string;

    let offsetX = 0;

    function mouseIsDown(event: MouseEvent) {
        const parentDimensions = parentWindow?.getBoundingClientRect();
        const resizerDimensions = document.getElementById(id)?.getBoundingClientRect();
        if (parentDimensions !== undefined) {
            offsetX = parentDimensions.left;
        }
        if (resizerDimensions !== undefined) {
            offsetX += (event.clientX - resizerDimensions.left)
        }
        mouseContext.setActiveMouseTarget(id);
    }

    const mouseMoveResponderDel = mouseContext.addMouseMoveResponder(id, (event) => {
        width = (event.clientX - offsetX).toString() + "px"
    })

    onDestroy(() => {
        mouseMoveResponderDel();
    });
</script>

<div on:mousedown={mouseIsDown} role="none" {id}></div>

<style>
    div {
        width: 5px;
        height: 100%;
        position: absolute;
        top: 0;
        right: -5px;
        cursor: e-resize;
    }
</style>