<script lang="ts">
    import InfoSection from "$lib/components/InfoSection.svelte";
    import Header from "$lib/components/Header.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";
</script>

<div class="fixed inset-0 overflow-hidden bg-[#FF5D0B] flex justify-center items-center">
    <Header pageLabel="FAQ" backHref="/" />
    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <InfoSection />
    </div>
    <div class="fixed bottom-4 left-4 z-50">
        <SoundButton />
    </div>
    <div class="fixed bottom-4 right-4 z-50">
        <img
            src="/FAQOtter.gif"
            alt="FAQ Otter"
            class="w-86 h-86 object-contain"
        />
    </div>
</div>