<script lang="ts">
    import LandingUI from "$lib/components/LandingUI.svelte";
    import LandingBackground from "$lib/components/LandingBackground.svelte";
    import LandingCharacters from "$lib/components/LandingCharacters.svelte";
    import LandingForeground from "$lib/components/LandingForeground.svelte";
</script>

<div class="landing-page w-full h-screen font-exposure overflow-hidden bg-[#0283F7] relative">
    <LandingBackground />
    <LandingCharacters />
    <LandingForeground />
    <LandingUI />
</div>

<style>
    .landing-page {
        --landing-scene-width: max(100vw, 153.97vh);
        --landing-scene-height: max(100vh, 64.95vw);
    }
</style>
