<script lang="ts">
    import { onDestroy } from "svelte";
    import type { MouseContext } from "./utils.js";

    let {
        id,
        mouseContext,
        width = $bindable(),
        left = $bindable(),
        minWidth
    }: {
        id: string,
        mouseContext: MouseContext,
        width: string,
        left: string,
        minWidth: number
    } = $props();

    let offsetX = $state(0);

    function mouseIsDown(event: MouseEvent) {
        const resizerDimensions = document.getElementById(id)?.getBoundingClientRect();
        if (resizerDimensions !== undefined) {
            offsetX = 5-(event.clientX - resizerDimensions.left)
        }
        mouseContext.setActiveMouseTarget(id);
    }

    const mouseMoveResponderDel = mouseContext.addMouseMoveResponder(id, (event) => {
        const prevLeft = parseInt(left.slice(0, -2));
        const newLeft = event.clientX + offsetX;
        const widthNum = parseInt(width.slice(0, -2))
        if (prevLeft - newLeft + widthNum >=  minWidth && newLeft > 0) {
            left = newLeft.toString() + "px";
            width = (prevLeft - newLeft + widthNum).toString() + "px";
        }
    })

    onDestroy(() => {
        mouseMoveResponderDel();
    });
</script>

<div onmousedown={mouseIsDown} role="none" {id}></div>

<style>
    div {
        width: 5px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -5px;
        cursor: w-resize;
    }
</style>