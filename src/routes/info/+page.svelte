<script lang="ts">
    import TextSection from "$lib/components/TextSection.svelte";
    import Header from "$lib/components/Header.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";

    let otterProgress = $state(0);
    let otterDirection = $state(1);

    function handleScrollProgress(progress: number) {
        if (progress > otterProgress) {
            otterDirection = 1;
        } else if (progress < otterProgress) {
            otterDirection = -1;
        }

        otterProgress = progress;
    }
</script>

<div class="fixed inset-0 overflow-hidden bg-background-blue flex justify-center items-center">
    <Header pageLabel="Info" backHref="/" applyHref="/apply" />

    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <TextSection
            onScrollProgress={handleScrollProgress}
        />
    </div>

    <div class="fixed bottom-4 left-4 z-50">
        <SoundButton />
    </div>

    <div
        class="fixed bottom-4 z-50 transition-all duration-700 ease-out left-4"
        style={`transform: translateX(calc(${otterProgress} * (100vw - 344px - 16px)));`}    >
        <img
            src="/OtterInfo.gif"
            alt="Info Otter"
            class="w-86 h-86 object-contain transition-transform duration-300"
            style={`transform: scaleX(${otterDirection === 1 ? 1 : -1});`}
        />
    </div>
</div> 