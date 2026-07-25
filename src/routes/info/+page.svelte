<script lang="ts">
    import TextSection from "$lib/components/TextSection.svelte";
    import Header from "$lib/components/Header.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";

    let facingRight = $state(true);

    function handleOtterTurn() {
        facingRight = !facingRight;
    }
</script>

<div class="info-page fixed inset-0 overflow-hidden bg-background-blue flex justify-center items-center">
    <Header pageLabel="Info" backHref="/" />

    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <TextSection />
    </div>

    <div class="fixed bottom-4 left-4 z-50">
        <SoundButton />
    </div>

    <div class="hidden md:block fixed bottom-4 left-4 z-50 otter-wrap">
        <div class="otter-move" on:animationiteration={handleOtterTurn}>
            <img
                src="/OtterInfo.gif"
                alt="Info Otter"
                class:facing-left={!facingRight}
                class="otter-gif w-86 h-86 object-contain"
            />
        </div>
    </div>
</div>

<style>
    :global(.info-page ::selection) {
        background: #141417;
        color: #0278FF;
    }

    .otter-move {
        animation: otter-move 8s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
        will-change: transform;
    }

    .otter-gif {
        transform-origin: center;
        will-change: transform;
    }

    .facing-left {
        transform: scaleX(-1);
    }

    @keyframes otter-move {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(calc(100vw - 344px - 32px));
        }
    }
</style>