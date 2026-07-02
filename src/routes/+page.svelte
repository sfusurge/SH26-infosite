<script>
    import TextSection from "../lib/components/TextSection.svelte";
    let innerWidth = $state(0);
    let innerHeight = $state(0);
    let scale = $derived(innerWidth > 0 ? Math.min(1, (innerWidth - 48) / 705, (innerHeight - 48) / 600) : 1);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="bg-background-blue w-full h-screen font-exposure overflow-hidden">
    <div
            class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center"
            style="transform: scale({scale}); transform-origin: center;"
    >
        <TextSection/>
    </div>
</div>