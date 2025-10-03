<script lang="ts">
    import Demo from "@/homepage/Demo.svelte";
    import Features from "@/homepage/Features.svelte";
    import Footer from "@/homepage/Footer.svelte";
    import Hero from "@/homepage/Hero.svelte";
    import Installation from "@/homepage/Installation.svelte";
</script>

<svelte:head>
    <title>svelte-windows | Draggable & Resizable Window Manager for Svelte</title>
    <link rel="canonical" href="https://windows.stephengruzin.dev/">
</svelte:head>

<main class="min-h-screen">
	<Hero />
	<Demo />
	<Features />
	<Installation />
	<Footer />
</main>
