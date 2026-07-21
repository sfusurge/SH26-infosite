<script lang="ts">
    import InfoSection from "$lib/components/InfoSection.svelte";
    import Header from "$lib/components/Header.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";
</script>

<div class="w-full h-screen bg-[#FF5D0B] flex justify-center items-center">
    <Header pageLabel="FAQ" backHref="/" applyHref="/apply" />
    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <InfoSection />
    </div>
    <SoundButton />
</div>