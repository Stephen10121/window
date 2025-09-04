<script lang="ts">
    import { onDestroy } from "svelte";
    import type { MouseContext, WindowDragConfig } from "./utils.js";

    let {
        id,
        parentWindow,
        desktop,
        mouseContext,
        dragConfig,
        top = $bindable(),
        left = $bindable(),
        active,
        activated
    }: {
        id: string,
        parentWindow: HTMLElement,
        desktop: HTMLElement,
        mouseContext: MouseContext,
        dragConfig: WindowDragConfig,
        top: string,
        left: string,
        active: boolean,
        activated: () => unknown
    } = $props();

    let offsetX = $state(0);
    let offsetY = $state(0);

    function mouseIsDown(event: MouseEvent) {
        const parentDimensions = parentWindow?.getBoundingClientRect();
        const desktopDimensions = desktop.getBoundingClientRect();
        
        if (parentDimensions !== undefined) {
            offsetY = event.clientY - parentDimensions.top + desktopDimensions.top;
            offsetX = event.clientX - parentDimensions.left + desktopDimensions.left;
        }
        mouseContext.setActiveMouseTarget(id);
        if (!active) activated();
    }

    const mouseMoveResponderDel = mouseContext.addMouseMoveResponder(id, (event) => {
        const parentDimensions = parentWindow?.getBoundingClientRect();
        const desktopDimensions = desktop.getBoundingClientRect();
        top = (Math.min(desktopDimensions.height - parentDimensions.height, Math.max(0, event.clientY - offsetY))).toString() + "px";
        left = (Math.min(desktopDimensions.width - parentDimensions.width, Math.max(0, event.clientX - offsetX))).toString() + "px";
        // left = (Math.min(document.body.clientWidth - parentDimensions.width, Math.max(0, event.clientX - offsetX))).toString() + "px";
    })

    onDestroy(() => {
        mouseMoveResponderDel();
    });
</script>

<div
    style="{dragConfig.color ? `background-color:${dragConfig.color};` : ""}--drwidth:{dragConfig.width};--drheight:{dragConfig.height};{dragConfig.bottom === undefined ? `top:${dragConfig.top};` : `bottom:${dragConfig.bottom};`}{dragConfig.right === undefined ? `left:${dragConfig.left};` : `right:${dragConfig.right};`}"
    onmousedown={mouseIsDown}
    role="none"
    {id}
></div>

<style>
    div {
        width: var(--drwidth);
        height: var(--drheight);
        position: absolute;
        cursor: grab;
        z-index: 200;
        pointer-events: all;
    }
</style>