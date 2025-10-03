<script lang="ts">
	import { Github } from '@lucide/svelte';
</script>

<footer class="bg-background py-12">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
					<svg class="h-6 w-6 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2"/>
						<rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2"/>
						<rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2"/>
						<rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2"/>
					</svg>
				</div>
				<div>
					<div class="font-semibold">svelte-windows</div>
					<a class="text-sm text-muted-foreground" href="https://github.com/Stephen10121/window/blob/main/LICENSE.md" target="_blank">MIT License</a>
				</div>
			</div>

			<div class="flex items-center gap-6">
				<a href="https://github.com/Stephen10121/window" target="_blank" class="text-muted-foreground transition-colors hover:text-foreground">
					<Github class="h-5 w-5" />
					<span class="sr-only">GitHub</span>
				</a>
				<a href="/docs" class="text-sm text-muted-foreground transition-colors hover:text-foreground">
					Documentation
				</a>
			</div>
		</div>

		<div class="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
			<p>Built with Svelte · Created by Stephen Gruzin</p>
		</div>
	</div>
</footer>
