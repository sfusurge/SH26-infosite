<script lang="ts">
    import { onMount } from "svelte";
    import TextSection from "$lib/components/TextSection.svelte";
    import Header from "$lib/components/Header.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";
    import SponsorsBar from "$lib/components/SponsorsBar.svelte";

    let isMounted = $state(false);

    onMount(() => {
        isMounted = true;
    });
</script>

<div class="info-page fixed inset-0 overflow-hidden bg-background-blue flex justify-center items-center">
    <Header pageLabel="Info" backHref="/" />
    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <TextSection />
    </div>

    <div class="fixed bottom-4 left-4 z-50">
        <SoundButton />
    </div>

    <div
        class="fixed sm:absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 sm:bottom-4 z-50 transition-[opacity,filter,transform] duration-copy ease-copy flex"
        class:opacity-0={!isMounted}
        class:blur-sm={!isMounted}
        class:translate-y-[6px]={!isMounted}
        class:opacity-100={isMounted}
        class:blur-none={isMounted}
        class:translate-y-0={isMounted}
    >
        <SponsorsBar />
    </div>

    <div
        class="hidden md:block fixed bottom-4 left-4 z-50 transition-[opacity,filter,transform] duration-copy ease-copy"
        class:opacity-0={!isMounted}
        class:blur-sm={!isMounted}
        class:translate-y-[6px]={!isMounted}
        class:opacity-100={isMounted}
        class:blur-none={isMounted}
        class:translate-y-0={isMounted}
    >
        <div class="info-otter-patrol">
            <img
                src="/OtterInfo.gif"
                alt="Info Otter"
                class="w-86 h-86 object-contain"
                class:animate-stagger-in-delayed={isMounted}
                class:opacity-0={!isMounted}
            />
        </div>
    </div>
</div>

<style>
    :global(.info-page ::selection) {
        background: #141417;
        color: #0278FF;
    }

    @keyframes walk-back-and-forth {
        0%, 100% {
            transform: translateX(0) scaleX(1);
        }
        48% {
            transform: translateX(calc(100vw - 380px)) scaleX(1);
        }
        50% {
            transform: translateX(calc(100vw - 380px)) scaleX(-1);
        }
        98% {
            transform: translateX(0) scaleX(-1);
        }
    }

    .info-otter-patrol {
        animation: walk-back-and-forth 18s ease-in-out infinite;
        will-change: transform;
    }
</style>