<script lang="ts">
    import { onDestroy } from "svelte";
    import type { MouseContext } from "./utils.js";

    let {
        id,
        parentWindow,
        mouseContext,
        height = $bindable(),
        desktop
    }: {
        id: string,
        parentWindow: HTMLElement,
        mouseContext: MouseContext,
        height: string,
        desktop: HTMLElement
    } = $props();

    let offsetY = $state(0);

    function mouseIsDown(event: MouseEvent) {
        const parentDimensions = parentWindow?.getBoundingClientRect();
        const resizerDimensions = document.getElementById(id)?.getBoundingClientRect();
        if (parentDimensions !== undefined) {
            offsetY = parentDimensions.top;
        }
        if (resizerDimensions !== undefined) {
            offsetY += (event.clientY - resizerDimensions.top)
        }
        mouseContext.setActiveMouseTarget(id);
    }

    const mouseMoveResponderDel = mouseContext.addMouseMoveResponder(id, (event) => {
        const desktopDimension = desktop.getBoundingClientRect();
        if(event.clientY < document.body.clientHeight) height = (Math.min(event.clientY, desktopDimension.height + desktopDimension.top) - offsetY).toString() + "px"
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
        bottom: -5px;
        right: 0;
        cursor: s-resize;
    }
</style>