<script lang="ts">
	import { Move, Maximize2, Layers, Smartphone } from '@lucide/svelte';
	
	const features = [
		{
			icon: Move,
			title: 'Draggable',
			description: 'Smooth dragging with customizable constraints and boundaries. Works perfectly in scroll containers.'
		},
		{
			icon: Maximize2,
			title: 'Resizable',
			description: 'Resize from any corner or edge. Set minimum and maximum dimensions for your windows.'
		},
		{
			icon: Layers,
			title: 'Smart Stacking',
			description: 'Automatic z-index management based on window activity. Recently active windows come to the front.'
		},
		{
			icon: Smartphone,
			title: 'Responsive',
			description: 'Works seamlessly across devices and screen sizes. Handles overflow and scroll situations gracefully.'
		}
	];
</script>

<section class="border-b border-border py-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-pretty text-4xl font-bold tracking-tight sm:text-5xl">
				Everything you need
			</h2>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				Built for modern Svelte applications with performance and developer experience in mind.
			</p>
		</div>

		<div class="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
			{#each features as feature}
				<div class="group relative rounded-xl border border-border bg-card p-8 transition-colors hover:border-accent/50">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
						<feature.icon class="h-6 w-6 text-accent" />
					</div>
					<h3 class="mb-2 text-xl font-semibold">{feature.title}</h3>
					<p class="leading-relaxed text-muted-foreground">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
