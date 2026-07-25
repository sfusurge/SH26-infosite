<script lang="ts">
    import { onMount } from "svelte";
    import { audioManager } from "$lib/audioManager.js";

    type Walker = {
        id: number;
        src: string;
    };

    const walkerSources = [
        "/gifs/LandingPage/PinkWalk.gif",
        "/gifs/LandingPage/blueWalk.gif",
        "/gifs/LandingPage/purpleWalk.gif",
        "/gifs/LandingPage/Truck.gif"
    ];
    const minRespawnDelay = 5_000;
    const maxRespawnDelay = 20_000;

    let activeWalker = $state<Walker | null>(null);
    let walkerId = 0;
    let spawnTimer: ReturnType<typeof setTimeout> | undefined;

    function randomRespawnDelay() {
        return minRespawnDelay + Math.random() * (maxRespawnDelay - minRespawnDelay);
    }

    function spawnWalker() {
        const src = walkerSources[Math.floor(Math.random() * walkerSources.length)];

        if (!src) return;

        activeWalker = {
            id: ++walkerId,
            src
        };

        // Trigger car sound fade in/out during sidewalk crossing animation (18s)
        audioManager.startCarSound(18000);
    }

    function finishWalker() {
        activeWalker = null;
        audioManager.stopCarSound();
        scheduleWalker();
    }

    function scheduleWalker(delay = randomRespawnDelay()) {
        if (spawnTimer) clearTimeout(spawnTimer);
        spawnTimer = setTimeout(spawnWalker, delay);
    }

    onMount(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        scheduleWalker(1_200);

        return () => {
            if (spawnTimer) clearTimeout(spawnTimer);
            audioManager.stopCarSound();
        };
    });
</script>

<div class="landing-characters" aria-hidden="true">
    <img
        src="/gifs/LandingPage/SparkyBoba.gif"
        alt=""
        class="landing-otter"
    />

    <div class="walking-scene">
        {#if activeWalker}
            <div class="sidewalk-walker" data-testid="sidewalk-walker" onanimationend={finishWalker}>
                <img src={activeWalker.src} alt="" />
            </div>
        {/if}
    </div>
</div>

<style>
    .landing-characters {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
    }

    .landing-otter {
        --nudge: 1.5vw;

        position: absolute;
        z-index: 15;
        left: calc(50% + var(--nudge) - max(29.1648vh, 18.7293vw));
        top: calc(89.8796vh - var(--nudge) - max(31.8vh, 20.4vw));
        width: max(36.5vh, 23.5vw);
        max-width: none;
        height: auto;
        user-select: none;
    }

    .walking-scene {
        --walker-exit: 65.5%;

        position: absolute;
        z-index: 5;
        bottom: 0;
        left: 50%;
        width: var(--landing-scene-width);
        height: var(--landing-scene-height);
        transform: translateX(-50%);
    }

    .sidewalk-walker {
        position: absolute;
        top: 68%;
        left: -11%;
        width: 10.714%;
        max-width: none;
        transform-origin: center bottom;
        animation: sidewalk-crossing 18s linear forwards;
        will-change: top, left, transform;
    }

    .sidewalk-walker img {
        display: block;
        width: 100%;
        height: auto;
    }

    @keyframes sidewalk-crossing {
        0% {
            top: 68%;
            left: -11%;
            transform: scale(1);
        }

        82% {
            top: 56%;
            left: 51.73%;
            transform: scale(0.85);
        }

        100% {
            top: 54%;
            left: var(--walker-exit);
            transform: scale(0.8);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .sidewalk-walker {
            animation: none;
        }
    }
</style>
