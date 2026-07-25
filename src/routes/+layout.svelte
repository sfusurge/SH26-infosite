<script lang="ts">
    import './layout.css';
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import { audioManager } from '$lib/audioManager.js';

    let { children } = $props();

    onMount(() => {
        audioManager.init();
    });

    $effect(() => {
        const pathname = page.url.pathname;
        audioManager.updateRouteMusic(pathname);
    });
</script>

<div class="font-exposure">
    {@render children()}
</div>