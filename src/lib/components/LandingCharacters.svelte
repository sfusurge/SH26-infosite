<script lang="ts">
    import { onMount } from "svelte";

    type Walker = {
        id: number;
        src: string;
    };

    // Add the four delivered walking GIF paths here when they are available.
    const walkerSources = ["/landing-page/stormy.svg"];
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
    }

    function scheduleWalker(delay = randomRespawnDelay()) {
        if (spawnTimer) clearTimeout(spawnTimer);
        spawnTimer = setTimeout(spawnWalker, delay);
    }

    function finishWalker() {
        activeWalker = null;
        scheduleWalker();
    }

    onMount(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        scheduleWalker(1_200);

        return () => {
            if (spawnTimer) clearTimeout(spawnTimer);
        };
    });
</script>

<div class="landing-characters" aria-hidden="true">
    <!-- Replace this source with the final animated otter when it is delivered. -->
    <img
        src="/landing-page/boba-otter.svg"
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
        top: calc(89.8796vh - var(--nudge) - max(26.9656vh, 17.3279vw));
        width: max(30.9571vh, 19.8929vw);
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
