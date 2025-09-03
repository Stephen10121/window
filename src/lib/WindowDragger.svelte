<script lang="ts">
    import { createEventDispatcher, onDestroy } from "svelte";
    import type { MouseContext, WindowDragConfig } from "./utils.js";

    export let id: string;
    export let parentWindow: HTMLElement;
    export let mouseContext: MouseContext;
    export let dragConfig: WindowDragConfig;
    export let top: string;
    export let left: string;
    export let active: boolean;

    const dispatch = createEventDispatcher();

    let offsetX = 0;
    let offsetY = 0;

    function mouseIsDown(event: MouseEvent) {
        const parentDimensions = parentWindow?.getBoundingClientRect();
        if (parentDimensions !== undefined) {
            offsetY = event.clientY - parentDimensions.top;
            offsetX = event.clientX - parentDimensions.left;
        }
        mouseContext.setActiveMouseTarget(id);
        if (!active) dispatch("active");
    }

    const mouseMoveResponderDel = mouseContext.addMouseMoveResponder(id, (event) => {
        const parentDimensions = parentWindow?.getBoundingClientRect();
        top = (Math.min(document.body.clientHeight - parentDimensions.height, Math.max(0, event.clientY - offsetY))).toString() + "px";
        left = (Math.min(document.body.clientWidth - parentDimensions.width, Math.max(0, event.clientX - offsetX))).toString() + "px";
    })

    onDestroy(() => {
        mouseMoveResponderDel();
    });
</script>

<div
    style="--drwidth:{dragConfig.width};--drheight:{dragConfig.height};{dragConfig.bottom === undefined ? `top:${dragConfig.top};` : `bottom:${dragConfig.bottom};`}{dragConfig.right === undefined ? `left:${dragConfig.left};` : `right:${dragConfig.right};`}"
    on:mousedown={mouseIsDown}
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
    }
</style>