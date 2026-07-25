<script lang="ts">
    import { onMount } from "svelte";
    import InfoSection from "$lib/components/InfoSection.svelte";
    import Header from "$lib/components/Header.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";

    let isMounted = $state(false);

    onMount(() => {
        isMounted = true;
    });
</script>

<div class="faq-page fixed inset-0 overflow-hidden bg-[#FF5D0B] flex justify-center items-center">
    <Header pageLabel="FAQ" backHref="/" />
    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <InfoSection />
    </div>
    <div class="fixed bottom-4 left-4 z-50">
        <SoundButton />
    </div>
    
    <div
        class="hidden md:block fixed bottom-4 right-4 z-50 transition-[opacity,filter,transform] duration-copy ease-copy"
        class:opacity-0={!isMounted}
        class:blur-sm={!isMounted}
        class:translate-y-[6px]={!isMounted}
        class:opacity-100={isMounted}
        class:blur-none={isMounted}
        class:translate-y-0={isMounted}
    >
        <img
            src="/FAQOtter.gif"
            alt="FAQ Otter"
            class="w-86 h-86 object-contain"
        />
    </div>
</div>

<style>
    :global(.faq-page ::selection) {
        background: #141417;
        color: #FF5D0B;
    }
</style>