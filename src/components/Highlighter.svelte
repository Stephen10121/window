<script lang="ts">
    import { onMount } from 'svelte';
    import "./highlightTheme.css";
    import Prism from "prismjs";
    import 'prism-svelte';

    let { code, language }: { code: string, language: string } = $props();

    let highlighted = $state('');

    function highlight() {
        const lang = Prism.languages[language] ?? Prism.languages.javascript;
        highlighted = Prism.highlight(code, lang, language);
    };

    $effect(() => {
        code;
        language;
        highlight();
    });

    onMount(highlight);
</script>

<pre class="overflow-x-auto pl-6 pr-6 pb-6 language-{language}">
    <code class="text-sm leading-relaxed text-muted-foreground language-{language}">{@html highlighted}</code>
</pre>