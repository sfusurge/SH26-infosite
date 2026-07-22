<script lang="ts">
    import TextSection from "$lib/components/TextSection.svelte";
    import Header from "$lib/components/Header.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";
</script>

<div class="fixed inset-0 overflow-hidden bg-background-blue flex justify-center items-center">
    <Header pageLabel="Info" backHref="/" />
    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <TextSection />
    </div>
    <div class="fixed bottom-4 left-4 z-50">
        <SoundButton />
    </div>
</div>