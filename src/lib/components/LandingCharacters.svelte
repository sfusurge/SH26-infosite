<script lang="ts">
    import { onMount } from "svelte";
    import { audioManager } from "$lib/audioManager.js";

    type Walker = {
        id: number;
        src: string;
    };

    const otterColors = [
        "/gifs/LandingPage/PinkWalk.gif",
        "/gifs/LandingPage/purpleWalk.gif",
        "/gifs/LandingPage/blueWalk.gif"
    ];

    const minRespawnDelay = 7_000;
    const maxRespawnDelay = 15_000;

    let activeWalkers = $state<Walker[]>([]);
    let walkerId = 0;
    let spawnCount = 0;
    let spawnTimer: ReturnType<typeof setTimeout> | undefined;

    function randomRespawnDelay() {
        return minRespawnDelay + Math.random() * (maxRespawnDelay - minRespawnDelay);
    }

    function getNextWalkerSource(): string {
        spawnCount++;
        if (spawnCount === 1) {
            return "/gifs/LandingPage/PinkWalk.gif";
        }
        if (spawnCount % 4 === 0) {
            return "/gifs/LandingPage/Truck.gif";
        }
        const idx = (spawnCount - 1) % otterColors.length;
        return otterColors[idx];
    }

    function spawnWalker() {
        const src = getNextWalkerSource();

        if (!src) return;

        const newWalker: Walker = {
            id: ++walkerId,
            src
        };

        activeWalkers = [...activeWalkers, newWalker];

        if (src.includes("Truck")) {
            // Trigger car sound fade in/out during sidewalk crossing animation (18s)
            audioManager.startCarSound(18000);
        }

        scheduleWalker();
    }

    function finishWalker(id: number, src: string) {
        activeWalkers = activeWalkers.filter((w) => w.id !== id);
        if (src.includes("Truck")) {
            audioManager.stopCarSound();
        }
    }

    function scheduleWalker(delay = randomRespawnDelay()) {
        if (spawnTimer) clearTimeout(spawnTimer);
        spawnTimer = setTimeout(spawnWalker, delay);
    }

    onMount(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        scheduleWalker(1_000);

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
        {#each activeWalkers as walker (walker.id)}
            <div
                class="sidewalk-walker"
                class:is-truck={walker.src.includes("Truck")}
                data-testid="sidewalk-walker"
                onanimationend={() => finishWalker(walker.id, walker.src)}
            >
                <img src={walker.src} alt="" />
            </div>
        {/each}

        <img
            src="/landing-page/sidewalk.webp"
            alt=""
            class="sidewalk-overlay"
        />
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
        bottom: 0;
        left: 50%;
        width: var(--landing-scene-width);
        height: var(--landing-scene-height);
        transform: translateX(-50%);
    }

    .sidewalk-overlay {
        position: absolute;
        left: 0;
        bottom: -2.65%;
        width: 100%;
        max-width: none;
        z-index: 3;
        pointer-events: none;
        user-select: none;
    }

    .sidewalk-walker {
        position: absolute;
        top: 68%;
        left: -11%;
        width: 10.714%;
        max-width: none;
        z-index: 4;
        transform-origin: center bottom;
        animation: sidewalk-crossing 18s linear forwards;
        will-change: top, left, transform;
    }

    .sidewalk-walker.is-truck {
        width: 18.5%;
        z-index: 2;
        margin-top: -1.5%;
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
