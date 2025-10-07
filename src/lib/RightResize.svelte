<script lang="ts">
    import { onDestroy } from "svelte";
    import type { MouseContext } from "./utils.js";

    let {
        id,
        parentWindow,
        mouseContext,
        width = $bindable(),
        minWidth,
        desktop,
        active,
        activated
    }: {
       id: string,
       parentWindow: HTMLElement,
       mouseContext: MouseContext,
       width: string,
       minWidth: number,
       desktop: HTMLElement,
       active: boolean,
       activated: () => unknown
    } = $props();

    let offsetX = $state(0);

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
        if (!active) activated();
    }

    const mouseMoveResponderDel = mouseContext.addMouseMoveResponder(id, (event) => {
        const desktopDimension = desktop.getBoundingClientRect();
        width = Math.max(minWidth, (Math.min(event.clientX, desktopDimension.width + desktopDimension.left) - offsetX)).toString() + "px";
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
        right: -5px;
        cursor: e-resize;
        pointer-events: all;
    }
</style>