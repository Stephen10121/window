<script lang="ts">
    import { Button } from '@/components/ui/button/index.js';
	import { Copy, Check } from '@lucide/svelte';
	
	let copiedInstall = $state(false);
	let copied = $state(false);
	
	const installCodeExample = "npm install svelte-windows";
	const codeExample = `<script>
    import { WindowManager, Window } from "svelte-windows";

    const dragRegions = [{width:"100%",height:"100%",top:"0px",left:"0px"}]
<\/script>

<div style="width: 500px;height: 500px;">
    <WindowManager>
        {#snippet children(context)}
            <Window id="window1" {context} windowDragRegions={dragRegions}>
                <p>Nice Window</p>
            </Window>
        {/snippet}
    </WindowManager>
</div>`;

	function copyInstallCode() {
		navigator.clipboard.writeText(installCodeExample);
		copiedInstall = true;
		setTimeout(() => copiedInstall = false, 2000);
	}

	function copyCode() {
		navigator.clipboard.writeText(codeExample);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}
</script>

<section class="border-b border-border py-24" id="getting-started">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<div class="text-center">
				<h2 class="text-pretty text-4xl font-bold tracking-tight sm:text-5xl">
					Quick to install
				</h2>
				<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
					Get started in seconds with npm or your favorite package manager.
				</p>
			</div>

			<!-- Installation command -->
			<div class="mt-12 rounded-xl border border-border bg-card p-6">
				<div class="flex items-center justify-between">
					<code class="font-mono text-sm text-foreground">{installCodeExample}</code>
					<Button size="sm" variant="ghost" onclick={copyInstallCode}>
						{#if copiedInstall}
							<Check class="h-4 w-4" />
						{:else}
							<Copy class="h-4 w-4" />
						{/if}
					</Button>
				</div>
			</div>

			<!-- Code example -->
			<div class="mt-8 rounded-xl border border-border bg-card">
				<div class="flex items-center justify-between border-b border-border px-6 py-3">
					<span class="text-sm font-medium text-muted-foreground">Example.svelte</span>
					<Button size="sm" variant="ghost" onclick={copyCode}>
						{#if copied}
							<Check class="h-4 w-4" />
						{:else}
							<Copy class="h-4 w-4" />
						{/if}
					</Button>
				</div>
				<pre class="overflow-x-auto p-6"><code class="text-sm leading-relaxed text-muted-foreground">{codeExample}</code></pre>
			</div>
		</div>
	</div>
</section>
