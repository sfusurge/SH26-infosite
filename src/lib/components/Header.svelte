<script lang="ts">
    import ApplyButton from "$lib/ui/ApplyButton.svelte";
    import { page } from "$app/state";
    import { fly } from "svelte/transition";
    import { cubicOut, cubicIn } from "svelte/easing";

    let {
        pageLabel = "Info",
        backHref = "/",
    }: {
        pageLabel?: string;
        backHref?: string;
    } = $props();

    let isExpanded = $state(false);
</script>

<header class="font-sf-text absolute top-0 left-0 w-full z-[999] flex items-center justify-between px-4 py-4 md:px-8 md:py-7 text-[16px]">
    <div class="hidden md:flex items-center gap-4 flex-grow min-w-0">
        <a 
            href={backHref}
            aria-label="Go back"
            class="flex items-center justify-center w-10 h-10 rounded-[6px] bg-primary-white flex-shrink-0"
        >
            <img src="/ui/arrowback.svg" alt="" class="w-[24px] h-[24px]" />
        </a>

        <span class="text-primary-white text-[16px] font-semibold whitespace-nowrap font-sf-text">
            StormHacks 2026
        </span>

        <div class="flex items-center gap-1.5 text-primary-white whitespace-nowrap">
            <img src="/ui/star.svg" alt="" aria-hidden="true" class="w-[18px] h-[18px] flex-shrink-0" />
            <span class="text-[16px] font-medium font-sf-text">
                {pageLabel}
            </span>
        </div>
    </div>

    <div class="mobile-stage flex md:!hidden flex-grow min-w-0">
        {#if !isExpanded}
            <div 
                class="mobile-group flex items-center gap-3"
                out:fly={{ x: -40, duration: 100, opacity: 0, easing: cubicIn }}
                in:fly={{ x: -40, duration: 800, opacity: 0, easing: cubicOut, delay: 150 }}
            >
                <a 
                    href={backHref}
                    aria-label="Go back"
                    class="flex items-center justify-center w-9 h-9 rounded-[6px] bg-primary-white flex-shrink-0"
                >
                    <img src="/ui/arrowback.svg" alt="" class="w-[24px] h-[24px]" />
                </a>

                <div class="flex items-center gap-1.5 text-primary-white whitespace-nowrap">
                    <img src="/ui/star.svg" alt="" aria-hidden="true" class="w-[18px] h-[18px] flex-shrink-0" />
                    <span class="text-[16px] font-medium font-sf-text">
                        {pageLabel}
                    </span>
                </div>
            </div>
        {/if}
    </div>

    <div class="font-bold flex-shrink-0 text-[16px]">
        <ApplyButton 
            bind:isExpanded
            variant={page.url.pathname === "/credits" ? "light" : "dark"} 
        />
    </div>
</header>

<style>
    .mobile-stage {
        display: grid;
        place-items: center start;
        padding: 2px 0;
        clip-path: inset(0px 0px 0px 0px);
        overflow: hidden;
    }

    .mobile-group {
        grid-area: 1 / 1;
        will-change: transform, opacity;
    }

    @media (min-width: 768px) {
        .mobile-stage {
            display: none !important;
        }
    }
</style>