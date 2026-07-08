<script lang="ts">
    import TextSection from "../lib/components/TextSection.svelte";
    import CreditsSection from "../lib/components/CreditsSection.svelte";
    import InfoSection from "$lib/components/InfoSection.svelte";

    let innerWidth = $state(0);
    let innerHeight = $state(0);

    let activeSection = $state("text");

    let scale = $derived(
        innerWidth > 0 && innerWidth >= 768
            ? Math.min(1, (innerWidth - 48) / 705, (innerHeight - 48) / 600)
            : 1
    );
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="w-full h-screen font-exposure overflow-hidden">

    <header class="absolute top-0 left-0 w-full h-24 z-[999] flex gap-4 justify-center items-center">
        <button onclick={() => activeSection = "text"}>
            Home
        </button>

        <button onclick={() => activeSection = "credits"}>
            Credits
        </button>

        <button onclick={() => activeSection = "info"}>
            Info
        </button>
    </header>


    {#if activeSection === "text"}
        <div class="w-full h-screen bg-background-blue flex justify-center items-center">

            <div
                class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center"
                style="transform: scale({scale}); transform-origin: center;"
            >
                <TextSection />
            </div>

        </div>

    {:else if activeSection === "credits"}
        <CreditsSection />
    {:else if activeSection === "info"}
        <div class="w-full h-screen bg-[#FF5D0B] flex justify-center items-center">
            <div
                class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center"
                style="transform: scale({scale}); transform-origin: center;"
            >
                <InfoSection/>
            </div>

        </div>
    {/if}
8
</div>