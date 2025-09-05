<script lang="ts">
    import { onDestroy } from "svelte";
    import type { MouseContext } from "./utils.js";

    let {
        id,
        mouseContext,
        height = $bindable(),
        top = $bindable(),
        minHeight,
        desktop
    }: {
        id: string,
        mouseContext: MouseContext,
        height: string,
        top: string,
        minHeight: number,
        desktop: HTMLElement
    } = $props();

    let offsetY = $state(0);

    function mouseIsDown(event: MouseEvent) {
        const resizerDimensions = document.getElementById(id)?.getBoundingClientRect();
        if (resizerDimensions !== undefined) {
            offsetY = 5-(event.clientY - resizerDimensions.top)
        }
        mouseContext.setActiveMouseTarget(id);
    }

    const mouseMoveResponderDel = mouseContext.addMouseMoveResponder(id, (event) => {
        const desktopDims = desktop.getBoundingClientRect();

        const prevTop = parseInt(top.slice(0, -2));
        const newTop = event.clientY + offsetY - desktopDims.top;
        const heightNum = parseInt(height.slice(0, -2));

        top = Math.abs(Math.max(minHeight, prevTop - Math.max(newTop, 0) + heightNum) - heightNum - parseInt(top.slice(0, -2))).toString() + "px";
        height = Math.max(minHeight, prevTop - Math.max(newTop, 0) + heightNum).toString() + "px";
    })

    onDestroy(() => {
        mouseMoveResponderDel();
    });
</script>

<div onmousedown={mouseIsDown} role="none" {id}></div>

<style>
    div {
        width: 100%;
        height: 5px;
        position: absolute;
        top: -5px;
        left: 0;
        cursor: n-resize;
        pointer-events: all;
    }
</style>