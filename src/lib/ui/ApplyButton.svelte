<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut, cubicIn } from 'svelte/easing';
    import { goto } from '$app/navigation';
    import Button from '$lib/ui/Button.svelte';
    import { audioManager } from '$lib/audioManager.js';

    let { variant = "dark" }: { variant?: "light" | "dark" } = $props();

    let isExpanded = $state(false);

    function handlePrimaryClick(e?: MouseEvent) {
        if (!isExpanded) {
            isExpanded = true;
        } else {
            window.location.href = 'https://portal.sfusurge.com/apply';
        }
    }

    onMount(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.defaultPrevented || e.ctrlKey || e.altKey || e.metaKey) return;
            const target = e.target as HTMLElement | null;
            if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;

            const key = e.key.toUpperCase();
            if (key === 'I') {
                audioManager.playClick();
                goto('/info');
            } else if (key === 'W') {
                audioManager.playClick();
                window.location.href = 'https://workshop.stormhacks.com';
            } else if (key === 'F') {
                audioManager.playClick();
                goto('/faq');
            } else if (key === 'C') {
                audioManager.playClick();
                goto('/credits');
            } else if (key === 'A') {
                audioManager.playClick();
                handlePrimaryClick();
            } else if (key === 'H') {
                audioManager.playClick();
                window.location.href = 'https://portal.sfusurge.com/apply';
            } else if (key === 'V') {
                audioManager.playClick();
                window.location.href = 'https://forms.gle/gWBZMF9gCMXk2q4y8';
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });
</script>

<div class="apply-button-stage flex items-center justify-end gap-1 md:gap-2 whitespace-nowrap flex-nowrap">
    <div class="volunteer-stage flex-shrink-0">
        {#if isExpanded}
            <div
                class="volunteer-group flex items-center gap-1 md:gap-2 whitespace-nowrap flex-nowrap"
                in:fly={{ y: -25, duration: 600, opacity: 1, easing: cubicOut, delay: 10 }}
                out:fly={{ y: -35, duration: 400, opacity: 1, easing: cubicIn }}
            >
                <Button 
                    onclick={() => (isExpanded = false)} 
                    showBadge={false} 
                    variant="light"
                    aria-label="Go back"
                >
                    <div class="flex items-center justify-center w-[25px] h-[25px] bg-[#ECECEF] rounded-[2px] flex-shrink-0">
                        <img 
                            src="/ui/arrowback.svg" 
                            alt="" 
                            aria-hidden="true" 
                            class="w-[25px] h-[25px]" 
                        />
                    </div>
                </Button>

                <Button href="https://forms.gle/gWBZMF9gCMXk2q4y8" letter="V" label="AS VOLUNTEER >" variant="light" />
            </div>
        {/if}
    </div>

    <div class="morph-wrapper rounded-[6px] flex-shrink-0" class:expanded={isExpanded}>
        <Button
            {variant}
            showBadge={false}
            onclick={handlePrimaryClick}
        >
            <div class="flex flex-row gap-[6px] md:gap-[10px] items-center whitespace-nowrap flex-nowrap">
                <div class="stack-wrapper w-[25px] h-[25px] flex-shrink-0">
                    <div
                        class="flex items-center justify-center px-[3px] py-[10px] w-[25px] h-[25px] transition-colors {variant === 'light' ? 'bg-[#101A21] text-white group-hover:bg-[#0278FF]' : 'bg-[#ECECEF] text-[#101A21] group-hover:bg-[#0278FF] group-hover:text-white'}"
                        class:active={!isExpanded}
                    >
                        A
                    </div>
                    <div
                        class="flex items-center justify-center px-[3px] py-[10px] w-[25px] h-[25px] transition-colors {variant === 'light' ? 'bg-[#101A21] text-white group-hover:bg-[#0278FF]' : 'bg-[#ECECEF] text-[#101A21] group-hover:bg-[#0278FF] group-hover:text-white'}"
                        class:active={isExpanded}
                    >
                        H
                    </div>
                </div>

                <div class="stack-wrapper text-center text-[12px] sm:text-[14px] md:text-[16px] font-extrabold leading-normal transition-colors {variant === 'light' ? 'text-[#101A21] group-hover:text-[#0278FF]' : 'text-primary-white group-hover:text-[#0278FF]'}">
                    <span class="morph-label whitespace-nowrap" class:active={!isExpanded}>APPLY &gt;</span>
                    <span class="morph-label whitespace-nowrap" class:active={isExpanded}>AS HACKER &gt;</span>
                </div>
            </div>
        </Button>
    </div>
</div>

<style>
    .volunteer-stage {
        display: grid;
        place-items: center end;
        clip-path: inset(-10px 0px 0px 0px);
        padding: 2px 0;
        overflow: hidden;
    }

    .volunteer-group {
        grid-area: 1 / 1;
        will-change: transform, opacity;
    }

    .morph-wrapper {
        max-width: 95px;
        transition: max-width 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
        will-change: max-width;
        display: inline-block;
    }

    @media (min-width: 640px) {
        .morph-wrapper {
            max-width: 115px;
        }
    }

    .morph-wrapper.expanded {
        max-width: 150px;
    }

    @media (min-width: 640px) {
        .morph-wrapper.expanded {
            max-width: 175px;
        }
    }

    .stack-wrapper {
        display: grid;
        place-items: center start;
    }

    .stack-wrapper > * {
        grid-area: 1 / 1;
        opacity: 0;
        transform: scale(0.95) translateX(6px);
        transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
        white-space: nowrap;
    }

    .stack-wrapper > .active {
        opacity: 1;
        transform: scale(1) translateX(0);
        pointer-events: auto;
    }
</style>