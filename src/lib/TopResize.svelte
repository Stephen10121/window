<script lang="ts">
    import { onDestroy } from "svelte";
    import type { MouseContext } from "./utils.js";

    export let id: string;
    export let mouseContext: MouseContext;
    export let height: string;
    export let top: string;
    export let minHeight: number;

    let offsetY = 0;

    function mouseIsDown(event: MouseEvent) {
        const resizerDimensions = document.getElementById(id)?.getBoundingClientRect();
        if (resizerDimensions !== undefined) {
            offsetY = 5-(event.clientY - resizerDimensions.top)
        }
        mouseContext.setActiveMouseTarget(id);
    }

    const mouseMoveResponderDel = mouseContext.addMouseMoveResponder(id, (event) => {
        const prevTop = parseInt(top.slice(0, -2));
        const newTop = event.clientY + offsetY;
        const widthNum = parseInt(height.slice(0, -2))
        if (prevTop - newTop + widthNum >=  minHeight && newTop > 0) {
            top = newTop.toString() + "px";
            height = (prevTop - newTop + widthNum).toString() + "px";
        }
    })

    onDestroy(() => {
        mouseMoveResponderDel();
    });
</script>

<div on:mousedown={mouseIsDown} role="none" {id}></div>

<style>
    div {
        width: 100%;
        height: 5px;
        position: absolute;
        top: -5px;
        left: 0;
        cursor: n-resize;
    }
</style>