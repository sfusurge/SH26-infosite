<script lang="ts">
    import { onMount } from 'svelte';
    import Navbar from "$lib/ui/Navbar.svelte";
    import { goto } from '$app/navigation';

    import { audioManager } from '$lib/audioManager.js';
    import SponsorsBar from "$lib/components/SponsorsBar.svelte";

    let isMounted = $state(false);
    let isExpanded = $state(false);
    let isMuted = $state(false);
    
    let navRef = $state<ReturnType<typeof Navbar> | null>(null);

    onMount(() => {
        isMounted = true;
        const unsubscribe = audioManager.subscribeMuteState((muted) => {
            isMuted = muted;
        });
        return unsubscribe;
    });

    function toggleMute() {
        audioManager.toggleMute();
    }

    function handleKeyDown(event: KeyboardEvent) {
        const target = event.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
            return;
        }

        const key = event.key.toLowerCase();
        const navExpanded = navRef?.getIsExpanded?.() ?? false;

        if (!navExpanded) {
            switch (key) {
                case 'i':
                    goto('/info');
                    break;
                case 'w':
                    window.location.href = 'https://studio.stormhacks.com/';
                    break;
                case 'f':
                    goto('/faq');
                    break;
                case 'c':
                    goto('/credits');
                    break;
                case 'a':
                    navRef?.toggleExpand?.(true);
                    break;
            }
        } else {
            switch (key) {
                case 'v':
                    goto('/volunteer');
                    break;
                case 'h':
                    window.location.href = 'https://portal.sfusurge.com/application';
                    break;
                case 'escape':
                    navRef?.toggleExpand?.(false);
                    break;
            }
        }
    }
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="relative w-full h-screen overflow-hidden">
    <header class="absolute top-0 left-0 w-full flex flex-col md:flex-row items-start justify-between p-4 md:p-8 z-10 gap-4">

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
                <img 
                    src="/mlhBanner.webp" 
                    alt="MLH Official 2027 Season" 
                    class="hidden md:block w-15 h-20 transition-opacity duration-300" 
                    class:opacity-0={isExpanded}
                    class:pointer-events-none={isExpanded}
                />

                <div class="flex flex-col items-start gap-1">
                    <h1 
                        class="font-exposure text-white text-[41.76px] md:text-6xl font-semibold whitespace-nowrap title-lockup transition-opacity duration-300"
                        class:opacity-0={isExpanded}
                        class:pointer-events-none={isExpanded}
                    >
                        [ StormHacks 26' ]
                    </h1>

                    <p 
                        class="font-sf-text text-white text-base hidden md:flex items-center gap-2 whitespace-nowrap subtitle-lockup subtitle-type transition-all duration-300"
                        class:focused-subtitle-desktop={isExpanded}
                        class:mt-1={!isExpanded}
                    >
                        <span>West Canada's Largest Hackathon</span>
                        <img src="/ui/star.webp" alt="" aria-hidden="true" class="w-[18px] h-[18px] subtitle-star" />
                        <span>Oct 3 + 4</span>
                        <img src="/ui/star.webp" alt="" aria-hidden="true" class="w-[18px] h-[18px] subtitle-star" />
                        <span>SFU Burnaby</span>
                    </p>

                    <div 
                        class="subtitle-mobile subtitle-type flex md:hidden flex-col items-start font-sf-text text-white text-lg transition-all duration-300"
                        class:focused-subtitle-mobile={isExpanded}
                        class:mt-1={!isExpanded}
                    >
                        <span>West Canada's Largest Hackathon</span>
                        <span class="subtitle-mobile-row flex items-center gap-2">
                            <span>Oct 3 + 4</span>
                            <img src="/ui/star.webp" alt="" aria-hidden="true" class="w-[16px] h-[16px]" />
                            <span>SFU Burnaby</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div 
            class="transition-opacity duration-300"
            class:opacity-0={isExpanded}
            class:pointer-events-none={isExpanded}
        >
            <Navbar bind:this={navRef} {isMounted} />
        </div>

    </header>

    <a 
        href="https://studio.stormhacks.com/"
        class="text-bubble float-bob transition-opacity duration-300"
        class:opacity-0={isExpanded}
        class:pointer-events-none={isExpanded}
    >
        <img src="/landing-page/textBubbleM.webp" alt="Check out our 3D Workshop" class="bubble-img md:hidden" />
        <img src="/landing-page/textBubble.webp" alt="Check out our 3D Workshop" class="bubble-img hidden md:block" />
    </a>

    <div
        class="absolute left-5 bottom-5 z-20 flex items-center gap-3 transition-[opacity,filter,transform] duration-300"
        class:opacity-0={!isMounted || isExpanded}
        class:blur-sm={!isMounted}
        class:translate-y-[6px]={!isMounted}
        class:opacity-100={isMounted && !isExpanded}
        class:blur-none={isMounted}
        class:translate-y-0={isMounted}
        class:pointer-events-none={isExpanded}
    >
        <button
            onclick={toggleMute}
            class="group grid place-items-center w-[32px] h-[32px] p-[2px] rounded-[6px] bg-[#ececef] cursor-pointer flex-shrink-0"
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
            <div
                class={`w-[24px] h-[24px] bg-black group-hover:bg-[#0278FF] transition-colors ${isMuted ? "opacity-30" : "opacity-100"}`}
                style="mask: url('/ui/sound.webp') no-repeat center / contain; -webkit-mask: url('/ui/sound.webp') no-repeat center / contain;"
                aria-hidden="true"
            ></div>
        </button>

        <a
            href="/coc"
            class="hidden md:block font-sfreg text-[16px] italic font-[508] leading-normal text-[#ECECEF] mix-blend-exclusion hover:underline whitespace-nowrap"
        >
            MLH Code of Conduct
        </a>
    </div>

    <div
        class="sm:hidden transition-[opacity,filter,transform] duration-copy ease-copy delay-700 absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex"
        class:opacity-0={!isMounted || isExpanded}
        class:blur-sm={!isMounted}
        class:translate-y-[6px]={!isMounted}
        class:opacity-100={isMounted && !isExpanded}
        class:blur-none={isMounted}
        class:translate-y-0={isMounted}
        class:pointer-events-none={isExpanded}
    >
        <SponsorsBar />
    </div>

    <div class="absolute right-5 bottom-5 z-30 flex items-center gap-3">
        <div
            class="hidden sm:flex transition-[opacity,filter,transform] duration-copy ease-copy delay-700"
            class:opacity-0={!isMounted || isExpanded}
            class:blur-sm={!isMounted}
            class:translate-y-[6px]={!isMounted}
            class:opacity-100={isMounted && !isExpanded}
            class:blur-none={isMounted}
            class:translate-y-0={isMounted}
            class:pointer-events-none={isExpanded}
        >
            <SponsorsBar />
        </div>

        <button
            onclick={() => (isExpanded = !isExpanded)}
            class="group grid place-items-center w-[32px] h-[32px] p-[2px] rounded-[6px] bg-[#ececef] transition-[opacity,filter,transform] duration-copy ease-copy delay-700 cursor-pointer flex-shrink-0"
            class:opacity-0={!isMounted}
            class:blur-sm={!isMounted}
            class:translate-y-[6px]={!isMounted}
            class:opacity-100={isMounted}
            class:blur-none={isMounted}
            class:translate-y-0={isMounted}
            aria-label={isExpanded ? "Exit focus view" : "Expand view"}
        >
            <div
                class="w-[24px] h-[24px] bg-black group-hover:bg-[#0278FF] transition-colors"
                style={`mask: url('${isExpanded ? "/ui/minimize.webp" : "/ui/expand.webp"}') no-repeat center / contain; -webkit-mask: url('${isExpanded ? "/ui/minimize.webp" : "/ui/expand.webp"}') no-repeat center / contain;`}
                aria-hidden="true"
            ></div>
        </button>
    </div>
</div>

<style>
    .subtitle-star {
        flex: 0 0 auto;
    }

    .focused-subtitle-desktop {
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 20;
        margin-top: 0 !important;
    }

    .focused-subtitle-mobile {
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 20;
        margin-top: 0 !important;
    }

    .text-bubble {
        --nudge: 1.5vw;
        position: absolute;
        z-index: 20;
        left: calc(50% + var(--nudge) - max(20vh, 12.8vw));
        top: calc(89.8796vh - var(--nudge) - max(39vh, 25vw));
    }

    .bubble-img {
        width: auto;
        height: auto;
        max-width: 160px;
    }

    @keyframes float-bob {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }

    .float-bob {
        animation: float-bob 3.5s ease-in-out infinite;
        will-change: transform;
    }

    @media (min-width: 768px) {
        .title-lockup {
            font-size: 62px;
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