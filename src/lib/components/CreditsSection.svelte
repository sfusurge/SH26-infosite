<script lang="ts">
    import { onMount } from 'svelte';
    import { audioManager } from '$lib/audioManager.js';

    type Credit = {
        title: string;
        name: string;
    };

    let credits = $state<Credit[]>([]);
    let isMounted = $state(false);
    let videoEl = $state<HTMLVideoElement | null>(null);

    $effect(() => {
        if (videoEl) {
            videoEl.volume = 0.5;
        }
    });

    onMount(() => {
        fetch('/data/credits.json')
            .then((res) => res.json())
            .then((data) => {
                credits = data;
                isMounted = true;
            });

        const unsubscribe = audioManager.subscribeMuteState((muted) => {
            if (videoEl) {
                videoEl.muted = muted;
            }
        });

        return () => {
            unsubscribe();
        };
    });
</script>


<div class="relative h-screen w-full overflow-hidden align-middle bg-[#101A21]">

    <video
        bind:this={videoEl}
        autoplay
        loop
        playsinline
        class="absolute left-1/2 top-1/2
           -translate-x-1/2 -translate-y-1/2
           w-[443px] h-[270px] md:w-[605px] md:h-[340px]
           object-cover z-[1]"
    >
        <source src="/data/Stormhacks2026Video.mp4" type="video/mp4" />
    </video>


    <div
        class="absolute left-0 right-0 top-24 bottom-24 z-10 overflow-hidden"
        style="mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);"
    >

        {#if isMounted}

            <div class="credits-wrapper">

                <div class="credits-content">
                    {#each credits as person}
                        <div class="credit w-full max-w-[489px] mx-auto flex flex-col items-center justify-center">
                            <p class="text-center font-sf-text text-[20px] not-italic font-[590] leading-tight text-[#0278FF] mb-0">
                                {person.title}
                            </p>

                            <h2 class="brush-stroke text-[32px] md:text-[64px] text-center text-white font-bold leading-none mt-0">
                                {person.name}
                            </h2>
                        </div>
                    {/each}
                </div>

                <div class="credits-content">
                    {#each credits as person}
                        <div class="credit w-full max-w-[489px] mx-auto flex flex-col items-center justify-center">
                            <p class="text-center font-sf-text text-[20px] not-italic font-[590] leading-tight text-[#0278FF] mb-0">
                                {person.title}
                            </p>

                            <h2 class="brush-stroke text-[32px] md:text-[64px] text-center text-white font-bold leading-none mt-0">
                                {person.name}
                            </h2>
                        </div>
                    {/each}
                </div>

            </div>

        {/if}

    </div>

</div>

<style>
    .credits-wrapper {
        animation: credits 45s linear infinite;
        will-change: transform;
    }

    .credits-content {
        display: grid;
        grid-template-columns: 1fr;
        column-gap: 5rem;
        row-gap: 3rem;
        max-width: 1282px;
        margin: auto;
        padding: 8rem 0;
    }

    @media (min-width: 768px) {
        .credits-content {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 5rem;
        }
    }

    .credit {
        text-align: center;
    }

    @keyframes credits {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(-50%);
        }
    }
</style>