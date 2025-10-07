<script lang="ts">
    import WindowManager from "@/WindowManager.svelte";
	import Window from "$lib/Window.svelte";

	let windows = $state([
		{ id: 3, title: 'Documentation', x: 20, y: 57, width: 300, height: 220, zIndex: 3, active: true },
		{ id: 2, title: 'Works with iframes', x: 40, y: 100, width: 280, height: 180, zIndex: 2, active: false },
		{ id: 1, title: 'Welcome', x: 5, y: 130, width: 320, height: 200, zIndex: 1, active: false },
	]);
</script>

<section class="border-b border-border bg-background py-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-pretty text-4xl font-bold tracking-tight sm:text-5xl">
				See it in action
			</h2>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">
				Drag, resize, and interact with windows. Everything you need for a desktop-like experience.
			</p>
		</div>

		<!-- Demo area -->
		<div class="relative mx-auto mt-16 h-[500px] overflow-hidden rounded-xl border border-border bg-secondary/50">
			<div class="w-full h-full flex flex-1 items-center justify-center p-6 text-center">
				<p class="text-sm text-muted-foreground">Anything can be behind the window manager.</p>
			</div>
			<div class="w-full absolute h-full top-0 left-0 pointer-events-none">
				<WindowManager>
					{#snippet children(context)}
						{#each windows as window (window.id)}
							<Window
								id="window{window.id}"
								{context}
								windowDragRegions={[{width:"100%",height:"41px",top:"0px",left:"0px"}]}
								width="{window.width}px"
								height="{window.height}px"
								top="{window.y}px"
								left="{window.x}px"
								minHeight={200}
								minWidth={200}
								resizeWhenInactive={false}
								className="shadow-2xl transition-shadow duration-250 hover:shadow-accent/20"
							>
								<div
									class="absolute flex flex-col rounded-lg border border-border bg-card shadow-2xl transition-shadow overflow-hidden"
									style="width:100%;height:100%;"
								>
									<!-- Window header -->
									<div class="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
										<span class="text-sm font-medium">{window.title}</span>
										<div class="flex gap-1.5">
											<div class="h-3 w-3 rounded-full bg-muted-foreground/30"></div>
											<div class="h-3 w-3 rounded-full bg-muted-foreground/30"></div>
											<div class="h-3 w-3 rounded-full bg-muted-foreground/30"></div>
										</div>
									</div>
									
									<!-- Window content -->
									<div class="flex flex-1 items-center justify-center p-6 text-center">
										<p class="text-sm text-muted-foreground">
											{#if window.id === 1}
												Drag me around! Click to bring to front.
											{:else if window.id === 2}
												Fully customizable and responsive. <br>
												Works on mobile devices.
											{:else}
												Works in any layout or scroll container.
											{/if}
										</p>
									</div>
								</div>
							</Window>
						{/each}
					{/snippet}
				</WindowManager>
			</div>
		</div>
	</div>
</section>
