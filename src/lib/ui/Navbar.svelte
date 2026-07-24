<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import Button from '$lib/ui/Button.svelte';

    let { isMounted = true }: { isMounted?: boolean } = $props();
    let isExpanded = $state(false);

    const mainNav = [
        { key: 'I', label: 'INFO', href: '/info' },
        { key: 'W', label: 'THE WORKSHOP', href: 'https://workshop.stormhacks.com' },
        { key: 'F', label: 'FAQ', href: '/faq' },
        { key: 'C', label: 'CREDITS', href: '/credits' }
    ];

    function handlePrimaryClick(e: MouseEvent) {
        if (!isExpanded) {
            isExpanded = true;
        } else {
            window.location.href = '/apply/hacker';
        }
    }
</script>

<div 
    class="nav-container font-sans font-bold transition-[opacity,filter,transform] duration-500 ease-out"
    class:opacity-0={!isMounted}
    class:blur-sm={!isMounted}
    class:translate-y-[6px]={!isMounted}
    class:opacity-100={isMounted}
    class:blur-none={isMounted}
    class:translate-y-0={isMounted}
>
    <div class="menu-bar">
        <div class="nav-stage">
            {#if !isExpanded}
                <div
                    class="nav-group"
                    in:fly={{ y: 35, duration: 700, opacity: 1, easing: cubicOut, delay: 35 }}
                    out:fly={{ y: 35, duration: 600, opacity: 1, easing: cubicOut }}
                >
                    {#each mainNav as item}
                        <Button href={item.href} letter={item.key} label={item.label} variant="light" />
                    {/each}
                </div>
            {:else}
                <div
                    class="nav-group"
                    in:fly={{ y: -35, duration: 700, opacity: 1, easing: cubicOut, delay: 35 }}
                    out:fly={{ y: -35, duration: 600, opacity: 1, easing: cubicOut }}
                >
                    <Button 
                        onclick={() => (isExpanded = false)} 
                        showBadge={false} 
                        variant="light"
                        aria-label="Go back"
                    >
                        <div class="flex items-center justify-center w-[25px] h-[25px] bg-[#ECECEF] transition-colors rounded-[2px]">
                            <img 
                                src="/ui/arrowback.svg" 
                                alt="" 
                                aria-hidden="true" 
                                class="w-[25px] h-[25px] group-hover:brightness-0 transition-all" 
                            />
                        </div>
                    </Button>

                    <Button href="/volunteer" letter="V" label="AS VOLUNTEER >" variant="light" />
                </div>
            {/if}
        </div>

        <div class="morph-wrapper rounded-[6px]" class:expanded={isExpanded}>
            <Button
                variant="dark"
                showBadge={false}
                onclick={handlePrimaryClick}
            >
                <div class="flex flex-row gap-[10px] items-center">
                    <div class="stack-wrapper w-[25px] h-[25px]">
                        <div
                            class="flex items-center justify-center px-[3px] py-[10px] w-[25px] h-[25px] bg-[#ECECEF] text-[#101A21] group-hover:bg-[#0278FF] group-hover:text-white"
                            class:active={!isExpanded}
                        >
                            A
                        </div>
                        <div
                            class="flex items-center justify-center px-[3px] py-[10px] w-[25px] h-[25px] bg-[#ECECEF] text-[#101A21] group-hover:bg-[#0278FF] group-hover:text-white"
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
</div>

<style>
    .nav-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .menu-bar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        .nav-container {
            justify-content: flex-start;
            width: 100%;
        }
    }

    .nav-stage {
        display: grid;
        place-items: center end;
        clip-path: inset(0px 0px 0px 0px);
        padding: 2px 0;
        overflow: hidden;
    }

    @media (max-width: 768px) {
        .nav-stage {
            place-items: center start;
            width: 100%;
        }
    }

    .nav-group {
        grid-area: 1 / 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
        will-change: transform;
        flex-wrap: wrap;
    }

    .morph-wrapper {
        max-width: 115px;
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