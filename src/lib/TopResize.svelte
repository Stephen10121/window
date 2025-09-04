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
        const widthNum = parseInt(height.slice(0, -2));

        if (prevTop - newTop + widthNum >=  minHeight && newTop > 0) {
            top = (newTop).toString() + "px";
            height = Math.max(minHeight, prevTop - Math.max(newTop, 0) + widthNum).toString() + "px";
        }
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
    }
</style>