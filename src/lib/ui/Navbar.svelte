<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import Button from '$lib/ui/Button.svelte';
    import { audioManager } from '$lib/audioManager.js';

    let { isMounted = true }: { isMounted?: boolean } = $props();
    let isExpanded = $state(false);
    let navContainerEl = $state<HTMLElement | null>(null);

    const mainNav = [
        { key: 'I', label: 'INFO', href: '/info' },
        // { key: 'W', label: 'THE WORKSHOP', href: 'https://workshop.stormhacks.com' },
        { key: 'F', label: 'FAQ', href: '/faq' },
        { key: 'C', label: 'CREDITS', href: '/credits' }
    ];

    function handlePrimaryClick(e: MouseEvent) {
        e.stopPropagation();
        audioManager.playClick();
        if (!isExpanded) {
            isExpanded = true;
        } else {
            setTimeout(() => {
                window.location.href = 'https://portal.sfusurge.com/application';
            }, 150);
        }
    }

    function handleWindowClick(e: MouseEvent) {
        if (isExpanded && navContainerEl && !navContainerEl.contains(e.target as Node)) {
            isExpanded = false;
        }
    }

    export function toggleExpand(expand?: boolean) {
        if (expand !== undefined) {
            isExpanded = expand;
        } else {
            isExpanded = !isExpanded;
        }
    }

    export function getIsExpanded() {
        return isExpanded;
    }
</script>

<svelte:window onclick={handleWindowClick} />

{#if isExpanded}
    <div 
        class="fixed inset-0 z-10 bg-transparent pointer-events-auto xl:hidden"
        onclick={() => (isExpanded = false)}
        aria-hidden="true"
    ></div>
{/if}

<div 
    bind:this={navContainerEl}
    class="nav-container font-sf font-bold transition-[opacity,filter,transform] duration-500 ease-out z-20 relative w-fit"
    class:opacity-0={!isMounted}
    class:blur-sm={!isMounted}
    class:translate-y-[6px]={!isMounted}
    class:opacity-100={isMounted}
    class:blur-none={isMounted}
    class:translate-y-0={isMounted}
>
    <div class="menu-bar hidden xl:flex">
        <div class="nav-stage">
            {#if !isExpanded}
                <div
                    class="nav-group"
                    in:fly={{ y: 35, duration: 800, opacity: 1, easing: cubicOut, delay: 35 }}
                    out:fly={{ y: 35, duration: 700, opacity: 1, easing: cubicOut }}
                >
                    {#each mainNav as item}
                        <Button href={item.href} letter={item.key} label={item.label} variant="light" />
                    {/each}
                </div>
            {:else}
                <div
                    class="nav-group"
                    in:fly={{ y: -35, duration: 800, opacity: 1, easing: cubicOut, delay: 35 }}
                    out:fly={{ y: -35, duration: 700, opacity: 1, easing: cubicOut }}
                >
                    <Button 
                        onclick={() => (isExpanded = false)} 
                        showBadge={false} 
                        variant="light"
                        aria-label="Go back"
                    >
                        <div class="flex items-center justify-center w-[25px] h-[25px] bg-[#ECECEF] transition-colors rounded-[2px]">
                            <div 
                                class="w-[25px] h-[25px] bg-black group-hover:bg-[#0278FF] transition-colors"
                                style="mask: url('/ui/arrowback.webp') no-repeat center / contain; -webkit-mask: url('/ui/arrowback.webp') no-repeat center / contain;"
                                aria-hidden="true"
                            ></div>
                        </div>
                    </Button>

                    <Button href="https://forms.gle/gWBZMF9gCMXk2q4y8" letter="V" label="AS VOLUNTEER >" variant="light" />
                </div>
            {/if}
        </div>

        <div class="morph-wrapper rounded-[6px]" class:expanded={isExpanded}>
            <Button
                variant="dark"
                showBadge={false}
                onclick={handlePrimaryClick}
            >
                <div class="flex flex-row gap-[10px] items-center px-1">
                    <div class="stack-wrapper w-[25px] h-[25px]">
                        <div
                            class="flex items-center justify-center w-[25px] h-[25px] bg-[#ECECEF] text-[#101A21] group-hover:bg-[#0278FF] group-hover:text-white rounded-[2px]"
                            class:active={!isExpanded}
                        >
                            A
                        </div>
                        <div
                            class="flex items-center justify-center w-[25px] h-[25px] bg-[#ECECEF] text-[#101A21] group-hover:bg-[#0278FF] group-hover:text-white rounded-[2px]"
                            class:active={isExpanded}
                        >
                            H
                        </div>
                    </div>

                    <div class="stack-wrapper text-center text-[16px] font-extrabold leading-normal text-primary-white group-hover:text-[#0278FF]">
                        <span class="morph-label" class:active={!isExpanded}>APPLY &gt;</span>
                        <span class="morph-label" class:active={isExpanded}>AS HACKER &gt;</span>
                    </div>
                </div>
            </Button>
        </div>
    </div>

    <div class="mobile-menu-bar flex xl:hidden">
        <div class="mobile-main-nav">
            {#each mainNav as item}
                <Button 
                    href={item.href} 
                    label={item.label} 
                    showBadge={false} 
                    variant="light" 
                />
            {/each}
        </div>

        <div class="mobile-apply-row">
            <div class="mobile-stage-wrapper" class:expanded={isExpanded}>
                {#if isExpanded}
                    <div
                        class="mobile-volunteer-group"
                        in:fly={{ x: -25, duration: 800, opacity: 0, easing: cubicOut }}
                        out:fly={{ x: -25, duration: 800, opacity: 0, easing: cubicOut }}
                    >
                        <Button href="/volunteer" showBadge={false} label="VOLUNTEER >" variant="light" />
                    </div>
                {/if}
            </div>

            <div class="morph-wrapper rounded-[6px]" class:expanded={isExpanded}>
                <Button
                    variant="dark"
                    showBadge={false}
                    onclick={handlePrimaryClick}
                >
                    <div class="px-1 py-0.5 text-[16px] font-extrabold leading-normal text-primary-white group-hover:text-[#0278FF]">
                        <span>{isExpanded ? 'HACKER >' : 'APPLY >'}</span>
                    </div>
                </Button>
            </div>
        </div>
    </div>
</div>

<style>
    .nav-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: fit-content;
        max-width: 100%;
        padding-top: 12px;
    }

    .menu-bar {
        align-items: center;
        gap: 0.85rem;
        white-space: nowrap;
    }

    .nav-stage {
        display: grid;
        place-items: center end;
        clip-path: inset(0px 0px 0px 0px);
        padding: 2px 0;
        overflow: hidden;
    }

    .nav-group {
        grid-area: 1 / 1;
        display: flex;
        align-items: center;
        gap: 0.85rem;
        white-space: nowrap;
        will-change: transform;
    }

    .mobile-menu-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        width: fit-content;
    }

    .mobile-main-nav {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        width: fit-content;
    }

    .mobile-apply-row {
        display: flex;
        align-items: center;
        white-space: nowrap;
        width: fit-content;
    }

    .mobile-stage-wrapper {
        display: flex;
        align-items: center;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
        transition: max-width 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                    margin-right 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        margin-right: 0px;
        will-change: max-width, opacity, margin-right;
    }

    .mobile-stage-wrapper.expanded {
        max-width: 175px;
        opacity: 1;
        margin-right: 0.5rem;
    }

    .mobile-volunteer-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
        will-change: transform, opacity;
    }

    .morph-wrapper {
        max-width: 120px;
        transition: max-width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
        will-change: max-width;
        display: inline-block;
        flex-shrink: 0;
    }

    .morph-wrapper.expanded {
        max-width: 165px;
    }

    .stack-wrapper {
        display: grid;
        place-items: center start;
    }

    .stack-wrapper > * {
        grid-area: 1 / 1;
        opacity: 0;
        transform: scale(0.95) translateX(4px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
        white-space: nowrap;
    }

    .stack-wrapper > .active {
        opacity: 1;
        transform: scale(1) translateX(0);
        pointer-events: auto;
    }
</style>