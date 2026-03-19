<script lang="ts">
	import WindowDragger from "../WindowDragger.svelte";
	import type { MouseContext } from "../utils.js";
	import type { WindowDragConfig } from "../utils.js";

	let {
		mouseContext,
		parentWindow,
		desktop,
		dragConfig,
		active = true
	}: {
		mouseContext: MouseContext;
		parentWindow: HTMLElement;
		desktop: HTMLElement;
		dragConfig: WindowDragConfig;
		active?: boolean;
	} = $props();

	let top = $state("10px");
	let left = $state("20px");
</script>

<WindowDragger
	id="dragger-test"
	{mouseContext}
	{parentWindow}
	{desktop}
	{dragConfig}
	{active}
	activated={() => {}}
	bind:top
	bind:left
/>

<output data-testid="coords">{top},{left}</output>
