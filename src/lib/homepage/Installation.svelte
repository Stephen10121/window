<script lang="ts">
    import { Button } from '@/components/ui/button/index.js';
	import { Copy, Check } from '@lucide/svelte';
	
	let copied = $state(false);
	
	const codeExample = `<script>
  import { Window } from 'svelte-windows';
  
  let position = $state({ x: 100, y: 100 });
  let size = $state({ width: 400, height: 300 });
<\/script>

<Window 
  bind:position 
  bind:size
  title="My Window"
>
  <p>Your content here</p>
</Window>`;

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
					<code class="font-mono text-sm text-foreground">npm install svelte-windows</code>
					<Button size="sm" variant="ghost" onclick={copyCode}>
						{#if copied}
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

			<div class="mt-12 text-center">
				<Button size="lg" class="h-12 px-8">
					View Documentation
				</Button>
			</div>
		</div>
	</div>
</section>
