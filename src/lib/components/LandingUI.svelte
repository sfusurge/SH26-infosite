<script lang="ts">
    import { onMount } from 'svelte';
    import Button from "$lib/ui/Button.svelte";

    let isMounted = $state(false);

    onMount(() => {
        isMounted = true;
    });

    const navItems = [
        { key: 'I', label: 'INFO', href: '/info' },
        { key: 'W', label: 'THE WORKSHOP', href: '/workshop' },
        { key: 'F', label: 'FAQ', href: '/faq' },
        { key: 'C', label: 'CREDITS', href: '/credits' },
        { key: 'A', label: 'APPLY >', href: '/apply', variant: 'dark' as const }
    ];
</script>

<div class="absolute top-0 left-0 w-full flex flex-col md:flex-row items-start justify-between p-5 z-20">

    <div class="flex flex-col gap-4">
        <div
            class="flex items-start gap-4 transition-[opacity,filter,transform] duration-copy ease-copy"
            class:opacity-0={!isMounted}
            class:blur-sm={!isMounted}
            class:translate-y-[6px]={!isMounted}
            class:opacity-100={isMounted}
            class:blur-none={isMounted}
            class:translate-y-0={isMounted}
        >
            <img src="/mlhBanner.svg" alt="MLH Official 2027 Season" class="hidden md:block w-15 h-20" />

            <div class="flex flex-col items-start md:items-center gap-0">
                <h1 class="title-lockup">
                    [ StormHacks 26' ]
                </h1>

                <p class="subtitle-lockup subtitle-type hidden md:flex">
                    <span>West Canada's Largest Hackathon</span>
                    <img src="/ui/star.svg" alt="" aria-hidden="true" class="subtitle-star" />
                    <span>Oct 3 + 4</span>
                    <img src="/ui/star.svg" alt="" aria-hidden="true" class="subtitle-star" />
                    <span>SFU Burnaby</span>
                </p>

                <div class="subtitle-mobile subtitle-type flex md:hidden">
                    <span>West Canada's Largest Hackathon</span>
                    <span class="subtitle-mobile-row">
                        <span>Oct 3 + 4</span>
                        <img src="/ui/star.svg" alt="" aria-hidden="true" class="subtitle-star" />
                        <span>SFU Burnaby</span>
                    </span>
                </div>
            </div>
        </div>

        <nav
            class="font-sans font-bold flex xl:hidden flex-col items-start gap-3 mt-4 transition-[opacity,filter,transform] duration-copy ease-copy delay-500"
            class:opacity-0={!isMounted}
            class:blur-sm={!isMounted}
            class:translate-y-[6px]={!isMounted}
            class:opacity-100={isMounted}
            class:blur-none={isMounted}
            class:translate-y-0={isMounted}
        >
            {#each navItems as item}
                <Button href={item.href} letter={item.key} label={item.label} variant={item.variant ?? 'light'} showBadge={false} appearance="landing" />
            {/each}
        </nav>
    </div>

    <nav
        class="font-sans font-bold hidden xl:flex items-center gap-[10px] max-w-[calc(100vw-40px)] transition-[opacity,filter,transform] duration-copy ease-copy delay-500"
        class:opacity-0={!isMounted}
        class:blur-sm={!isMounted}
        class:translate-y-[6px]={!isMounted}
        class:opacity-100={isMounted}
        class:blur-none={isMounted}
        class:translate-y-0={isMounted}
    >
        {#each navItems as item}
            <Button href={item.href} letter={item.key} label={item.label} variant={item.variant ?? 'light'} appearance="landing" />
        {/each}
    </nav>

</div>

<a href="/workshop" class="text-bubble float-bob">
    <img src="/landing-page/textBubbleM.svg" alt="Check out our 3D Workshop" class="bubble-img md:hidden" />
    <img src="/landing-page/textBubble.svg" alt="Check out our 3D Workshop" class="bubble-img hidden md:block" />
</a>

<button
    class="absolute left-5 bottom-5 grid place-items-center w-[32px] h-[32px] p-[2px] rounded-[6px] bg-[#ececef] z-20 transition-[opacity,filter,transform] duration-copy ease-copy delay-700"
    class:opacity-0={!isMounted}
    class:blur-sm={!isMounted}
    class:translate-y-[6px]={!isMounted}
    class:opacity-100={isMounted}
    class:blur-none={isMounted}
    class:translate-y-0={isMounted}
    aria-label="Toggle sound"
>
    <img src="/ui/sound.svg" alt="" class="block w-full h-full" />
</button>

<button
    class="absolute right-5 bottom-5 grid place-items-center w-[32px] h-[32px] p-[2px] rounded-[6px] bg-[#ececef] z-20 transition-[opacity,filter,transform] duration-copy ease-copy delay-700"
    class:opacity-0={!isMounted}
    class:blur-sm={!isMounted}
    class:translate-y-[6px]={!isMounted}
    class:opacity-100={isMounted}
    class:blur-none={isMounted}
    class:translate-y-0={isMounted}
    aria-label="Expand view"
>
    <img src="/ui/expand.svg" alt="" class="block w-full h-full" />
</button>

<style>
    .title-lockup {
        color: #ececef;
        font-family: 'Exposure', sans-serif;
        font-size: 41.76px;
        font-weight: 394;
        font-variation-settings: 'EXPO' -60;
        line-height: 1;
        letter-spacing: 0;
        white-space: nowrap;
    }

    .subtitle-type {
        color: #ececef;
        font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        font-size: 16px;
        font-weight: 510;
        line-height: 1;
        letter-spacing: 0;
        white-space: nowrap;
    }

    .subtitle-lockup {
        align-items: center;
        gap: 8px;
        margin-top: 8px;
    }

    .subtitle-mobile {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        margin-top: 8px;
    }

    .subtitle-mobile-row {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .subtitle-star {
        width: 18px;
        height: 18px;
        flex: 0 0 auto;
    }

    /* Bubble Positioning */
    .text-bubble {
        --nudge: 1.5vw;

        position: absolute;
        z-index: 20;

        left: calc(50% + var(--nudge) - max(22vh, 14vw));
        top: calc(89.8796vh - var(--nudge) - max(38vh, 25vw));
    }

    .bubble-img {
        width: auto;
        height: auto;
        max-width: 160px;
    }

    @keyframes float-bob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }

    .float-bob {
        animation: float-bob 3.5s ease-in-out infinite;
        will-change: transform;
    }

    @media (min-width: 768px) {
        .title-lockup {
            font-size: 62px;
        }

        .text-bubble {
            left: 38%;
            top: auto;
            bottom: 45%;
        }

        .bubble-img {
            max-width: 210px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .float-bob {
            animation: none;
        }
    }
</style>