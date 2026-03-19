<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";

    const installCommand = "npm install svelte-windows";
    const quickStartExample = `<script>
    import { WindowManager, Window } from "svelte-windows";

    const dragRegions = [{ width: "100%", height: "40px", top: "0px", left: "0px" }];
<\/script>

<div style="width: 640px; height: 480px;">
    <WindowManager>
        {#snippet children(context)}
            <Window id="main-window" {context} windowDragRegions={dragRegions}>
                <section style="width: 100%; height: 100%; background: #0f172a;">
                    Hello from svelte-windows
                </section>
            </Window>
        {/snippet}
    </WindowManager>
</div>`;

    const callbackExample = `<Window
    id="inspector"
    {context}
    bind:width
    bind:height
    bind:left
    bind:top
    onDragStart={(position) => console.log("drag start", position)}
    onDragEnd={(position) => console.log("drag end", position)}
    onResizeStart={(dimensions) => console.log("resize start", dimensions)}
    onResizeEnd={(dimensions) => console.log("resize end", dimensions)}
    windowDragRegions={[{ width: "100%", height: "40px", top: "0px", left: "0px" }]}
/>`;

    const windowProps = [
        { name: "id", type: "string", default: "-", required: "Yes", description: "Unique id for registration and stacking order." },
        { name: "context", type: "{ mouseContext, windowContext, desktop }", default: "-", required: "Yes", description: "Context provided by WindowManager snippet." },
        { name: "windowDragRegions", type: "WindowDragConfig[]", default: "[]", required: "No", description: "Absolute drag target regions inside the window." },
        { name: "resizable", type: "boolean", default: "true", required: "No", description: "Enable or disable all edge and corner resize handles." },
        { name: "resizeWhenInactive", type: "boolean", default: "false", required: "No", description: "Allow resize handles on inactive windows." },
        { name: "width / height", type: "string (px)", default: "300px", required: "No", description: "Current dimensions. Bindable." },
        { name: "left / top", type: "string (px)", default: "100px", required: "No", description: "Current position relative to manager desktop. Bindable." },
        { name: "minWidth / minHeight", type: "number", default: "300", required: "No", description: "Minimum window dimensions during resize." },
        { name: "innerStyle / outerStyle", type: "string", default: "undefined", required: "No", description: "Inline style hooks for interior or shell." },
        { name: "innerClassName / outerClassName", type: "string", default: "undefined", required: "No", description: "Class hooks for interior or shell." }
    ];

    const lifecycleEvents = [
        { name: "onActiveStateChanged", payload: "{ isActive: boolean }", description: "Fires when this window becomes active/inactive." },
        { name: "onDragStart", payload: "{ top: string, left: string }", description: "Fires when drag begins on this window." },
        { name: "onDragEnd", payload: "{ top: string, left: string }", description: "Fires when drag finishes." },
        { name: "onResizeStart", payload: "{ width: string, height: string }", description: "Fires when any edge/corner resize starts." },
        { name: "onResizeEnd", payload: "{ width: string, height: string }", description: "Fires when resize finishes." }
    ];
</script>

<svelte:head>
    <title>Documentation | svelte-windows</title>
    <meta
        name="description"
        content="Official docs for svelte-windows: quick start, API reference, props, callbacks, styling, and implementation patterns."
    />
</svelte:head>

<main class="min-h-screen bg-background text-foreground">
    <section class="border-b border-border">
        <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <p class="text-sm uppercase tracking-[0.2em] text-muted-foreground">Documentation</p>
            <h1 class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">svelte-windows API guide</h1>
            <p class="mt-4 max-w-2xl text-lg text-muted-foreground">
                Build desktop-like interfaces in Svelte with drag, resize, stacking, mobile touch handling, and iframe-safe focus behavior.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
                <Button href="/playground">Open Playground</Button>
                <Button variant="outline" href="https://github.com/Stephen10121/window" target="_blank">View Source</Button>
            </div>
        </div>
    </section>

    <section class="border-b border-border">
        <div class="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:px-8">
            <div class="rounded-xl border border-border bg-card p-6">
                <h2 class="text-2xl font-semibold">Quick start</h2>
                <p class="mt-3 text-muted-foreground">Install the package, then place one or more windows inside a manager.</p>
                <div class="mt-5 rounded-md border border-border bg-secondary/40 p-4">
                    <code class="font-mono text-sm">{installCommand}</code>
                </div>
            </div>
            <div class="rounded-xl border border-border bg-card p-6">
                <h2 class="text-2xl font-semibold">Core model</h2>
                <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li><code>WindowManager</code> sets up global move/up handlers and provides context.</li>
                    <li><code>Window</code> registers itself, manages z-order, and renders drag/resize handles.</li>
                    <li><code>MouseContext</code> multiplexes movement to one active drag/resize target.</li>
                    <li><code>WindowContext</code> tracks active window and stacking history.</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="border-b border-border">
        <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight">Basic usage</h2>
            <p class="mt-3 max-w-3xl text-muted-foreground">
                Use snippet children to receive the manager context. Define draggable hit areas with <code>windowDragRegions</code>.
            </p>
            <div class="mt-6 rounded-xl border border-border bg-card">
                <div class="border-b border-border px-5 py-3 text-sm text-muted-foreground">Example.svelte</div>
                <pre class="overflow-x-auto p-5"><code class="text-sm leading-relaxed text-muted-foreground">{quickStartExample}</code></pre>
            </div>
        </div>
    </section>

    <section class="border-b border-border">
        <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight">Window props</h2>
            <p class="mt-3 max-w-3xl text-muted-foreground">
                Dimensions and position props are bindable and use px strings. You can style both the shell and content layers.
            </p>
            <div class="mt-6 overflow-x-auto rounded-xl border border-border">
                <table class="w-full min-w-[780px] divide-y divide-border text-left text-sm">
                    <thead class="bg-secondary/40 text-muted-foreground">
                        <tr>
                            <th class="px-4 py-3 font-medium">Prop</th>
                            <th class="px-4 py-3 font-medium">Type</th>
                            <th class="px-4 py-3 font-medium">Default</th>
                            <th class="px-4 py-3 font-medium">Required</th>
                            <th class="px-4 py-3 font-medium">Description</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-border bg-card">
                        {#each windowProps as prop}
                            <tr>
                                <td class="px-4 py-3 font-mono text-xs">{prop.name}</td>
                                <td class="px-4 py-3 text-xs">{prop.type}</td>
                                <td class="px-4 py-3 text-xs">{prop.default}</td>
                                <td class="px-4 py-3 text-xs">{prop.required}</td>
                                <td class="px-4 py-3 text-xs text-muted-foreground">{prop.description}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <section class="border-b border-border">
        <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight">Lifecycle callbacks</h2>
            <p class="mt-3 max-w-3xl text-muted-foreground">
                React to active state, drag events, and resize events. Useful for syncing layout state to your own stores.
            </p>
            <div class="mt-6 grid gap-4 md:grid-cols-2">
                {#each lifecycleEvents as event}
                    <div class="rounded-xl border border-border bg-card p-5">
                        <h3 class="font-semibold">{event.name}</h3>
                        <p class="mt-2 text-xs text-muted-foreground">Payload: <code>{event.payload}</code></p>
                        <p class="mt-2 text-sm text-muted-foreground">{event.description}</p>
                    </div>
                {/each}
            </div>
            <div class="mt-6 rounded-xl border border-border bg-card">
                <div class="border-b border-border px-5 py-3 text-sm text-muted-foreground">Callback example</div>
                <pre class="overflow-x-auto p-5"><code class="text-sm leading-relaxed text-muted-foreground">{callbackExample}</code></pre>
            </div>
        </div>
    </section>

    <section class="border-b border-border">
        <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight">Styling and behavior</h2>
            <div class="mt-6 grid gap-4 md:grid-cols-2">
                <div class="rounded-xl border border-border bg-card p-5">
                    <h3 class="font-semibold">Drag regions</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Dragging is opt-in. Define one or more absolute regions to control where users can grab the window.
                    </p>
                </div>
                <div class="rounded-xl border border-border bg-card p-5">
                    <h3 class="font-semibold">Resize handles</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        All four edges and four corners are supported. Touch and mouse are both wired through the same manager.
                    </p>
                </div>
                <div class="rounded-xl border border-border bg-card p-5">
                    <h3 class="font-semibold">Shell vs content</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Use <code>outerStyle/outerClassName</code> for shadows and chrome, and <code>innerStyle/innerClassName</code> for content.
                    </p>
                </div>
                <div class="rounded-xl border border-border bg-card p-5">
                    <h3 class="font-semibold">Window stacking</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Active windows are promoted to the front automatically. Iframe focus is detected and translated into window activation.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight">Exports</h2>
            <div class="mt-6 rounded-xl border border-border bg-card p-6">
                <ul class="space-y-2 text-sm text-muted-foreground">
                    <li><code>WindowManager</code>, <code>Window</code></li>
                    <li><code>MouseContext</code>, <code>WindowContext</code></li>
                    <li><code>INACTIVE_MOUSE_ID</code></li>
                    <li><code>WindowDragConfig</code>, <code>WindowPosition</code>, <code>WindowDimensions</code>, <code>ActualWindowProps</code></li>
                </ul>
            </div>
        </div>
    </section>
</main>