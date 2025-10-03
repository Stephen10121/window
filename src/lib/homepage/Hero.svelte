<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Github } from '@lucide/svelte';
</script>

<section class="relative overflow-hidden border-b border-border">
	<!-- Background grid pattern -->
	<div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
	
	<div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
		<!-- Logo -->
		<div class="mb-8 flex items-center gap-3">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
				<svg class="h-7 w-7 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2"/>
					<rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2"/>
					<rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2"/>
					<rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2"/>
				</svg>
			</div>
			<span class="text-xl font-semibold">svelte-windows</span>
		</div>

		<div class="mx-auto max-w-4xl text-center">
			<h1 class="text-balance text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
				Window Management
				<span class="block text-accent">for Svelte</span>
			</h1>
			
			<p class="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
				A draggable and resizable window manager that works seamlessly in your projects. 
				Works in scroll areas, overflow situations, with intelligent window stacking.
			</p>

			<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
				<Button size="lg" class="h-12 px-8 text-base" href="#getting-started">
					Get Started
				</Button>
				<Button size="lg" variant="outline" class="h-12 gap-2 px-8 text-base" href="https://github.com/Stephen10121/window" target="_blank">
					<Github class="h-5 w-5" />
					View on GitHub
				</Button>
			</div>

			<div class="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
				<span class="hidden sm:inline">▲</span>
				<code class="rounded bg-muted px-3 py-1.5 font-mono">npm install svelte-windows</code>
			</div>
		</div>
	</div>
</section>
