<!-- src/lib/ui/ApplyButton.svelte -->
<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import Button from '$lib/ui/Button.svelte';

    let { variant = "dark" }: { variant?: "light" | "dark" } = $props();

    let isExpanded = $state(false);

    function handlePrimaryClick(e: MouseEvent) {
        if (!isExpanded) {
            isExpanded = true;
        } else {
            window.location.href = '/apply/hacker';
        }
    }
</script>

<div class="apply-button-stage flex items-center gap-2">
    <!-- Secondary Options Stage (Back Arrow + Volunteer Button) -->
    <div class="volunteer-stage">
        {#if isExpanded}
            <div
                class="volunteer-group flex items-center gap-2"
                in:fly={{ y: -25, duration: 600, opacity: 1, easing: cubicOut, delay: 35 }}
                out:fly={{ y: -25, duration: 500, opacity: 1, easing: cubicOut }}
            >
                <!-- Back Button -->
                <Button 
                    onclick={() => (isExpanded = false)} 
                    showBadge={false} 
                    variant="light"
                    aria-label="Go back"
                >
                    <div class="flex items-center justify-center w-[25px] h-[25px] bg-transparent group-hover:bg-[#0278FF] transition-colors rounded-[2px]">
                        <img 
                            src="/ui/arrowback.svg" 
                            alt="" 
                            aria-hidden="true" 
                            class="w-[14px] h-[14px] group-hover:brightness-0 group-hover:invert transition-all" 
                        />
                    </div>
                </Button>

                <!-- Volunteer Button -->
                <Button href="/volunteer" letter="V" label="AS VOLUNTEER >" variant="light" />
            </div>
        {/if}
    </div>

    <!-- Morphing Primary Button Wrapper -->
    <div class="morph-wrapper rounded-[6px]" class:expanded={isExpanded}>
        <Button
            {variant}
            showBadge={false}
            onclick={handlePrimaryClick}
        >
            <div class="flex flex-row gap-[10px] items-center">
                <!-- Key Badge Stack (A -> H) -->
                <div class="stack-wrapper w-[25px] h-[25px]">
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

                <!-- Label Stack (APPLY > -> AS HACKER >) -->
                <div class="stack-wrapper text-center text-[16px] font-extrabold leading-normal transition-colors {variant === 'light' ? 'text-[#101A21] group-hover:text-[#0278FF]' : 'text-primary-white group-hover:text-[#0278FF]'}">
                    <span class="morph-label" class:active={!isExpanded}>APPLY &gt;</span>
                    <span class="morph-label" class:active={isExpanded}>AS HACKER &gt;</span>
                </div>
            </div>
        </Button>
    </div>
</div>

<style>
    .volunteer-stage {
        display: grid;
        place-items: center end;
        clip-path: inset(0px 0px 0px 0px);
        padding: 2px 0;
        overflow: hidden;
    }

    .volunteer-group {
        grid-area: 1 / 1;
        will-change: transform;
    }

    /* Morphing Expansion Mechanics */
    .morph-wrapper {
        max-width: 110px;
        transition: max-width 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
        will-change: max-width;
        display: inline-block;
    }

    .morph-wrapper.expanded {
        max-width: 175px;
    }

    .stack-wrapper {
        display: grid;
        place-items: center start;
    }

    /* 1.1s continuous crossfade & floating transform */
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