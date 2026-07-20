<!-- src/lib/components/LandingBackground.svelte -->
<div class="absolute inset-0 w-full h-full overflow-hidden bg-[#2A6FF5] z-0">

    <div class="scene-canvas">

        <img src="/landing-page/cloud-shape.svg" alt="" class="absolute inset-0 w-full h-full object-cover" />

        <img src="/landing-page/road.svg" alt="" class="absolute left-0 top-[30%] w-full" />

        <img src="/landing-page/sidewalk.svg" alt="" class="absolute bottom-0 left-0 w-full" />

        <img src="/landing-page/stairs.svg" alt="" class="absolute right-0 bottom-0 z-[5]" style="width: 75%;" />

        <img
            src="/landing-page/bush3.svg"
            alt=""
            aria-hidden="true"
            class="bush-rustle bush-rustle-back absolute z-[6] pointer-events-none select-none"
            style="left: 0; bottom: 0; width: 23.94%; height: auto;"
        />

        <img
            src="/landing-page/bush2.svg"
            alt=""
            aria-hidden="true"
            class="bush-rustle bush-rustle-middle absolute z-[7] pointer-events-none select-none"
            style="left: 0; bottom: 0; width: 15.01%; height: auto;"
        />

        <img
            src="/landing-page/bush1.svg"
            alt=""
            aria-hidden="true"
            class="bush-rustle bush-rustle-front absolute z-[8] pointer-events-none select-none"
            style="left: 0; bottom: 0; width: 24.54%; height: auto;"
        />

        <img
            src="/landing-page/flower.svg"
            alt=""
            aria-hidden="true"
            class="flower-sway flower-sway-1 absolute z-[9] pointer-events-none select-none"
            style="left: 14.28%; bottom: 0%; width: 10.71%; height: 21%;"
        />

        <img
            src="/landing-page/flower2.svg"
            alt=""
            aria-hidden="true"
            class="flower-sway flower-sway-2 absolute z-[9] pointer-events-none select-none"
            style="left: 23.80%; top: 82.99%; width: 3.28%; height: 9.74%;"
        />

        <img
            src="/landing-page/flower3.svg"
            alt=""
            aria-hidden="true"
            class="flower-sway flower-sway-3 absolute z-[9] pointer-events-none select-none"
            style="left: 20.29%; top: 74.99%; width: 5.67%; height: 14.76%;"
        />

        <img
            src="/landing-page/flower4.svg"
            alt=""
            aria-hidden="true"
            class="flower-sway flower-sway-4 absolute z-[9] pointer-events-none select-none"
            style="left: 25.65%; top: 73.14%; width: 3.71%; height: 11.03%;"
        />

    </div>

    <!-- Replace this source with the final animated otter when it is delivered. -->
    <img
        src="/landing-page/boba-otter.svg"
        alt=""
        aria-hidden="true"
        class="landing-otter absolute z-[10] pointer-events-none select-none"
    />

</div>

<style>
    .scene-canvas {
        position: absolute;
        top: auto;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

        width: max(100vw, 153.97vh);
        height: max(100vh, 64.95vw);
    }

    .landing-otter {
        --horizontal-nudge: 3vw;

        left: calc(50% + var(--horizontal-nudge) - max(29.1648vh, 18.7293vw));
        top: calc(88.8796vh - max(26.9656vh, 17.3279vw));
        width: max(30.9571vh, 19.8929vw);
        height: auto;
    }

    @keyframes flower-sway {
        0% { transform: rotate(0deg); }
        14% { transform: rotate(var(--sway-1)); }
        33% { transform: rotate(var(--sway-2)); }
        52% { transform: rotate(var(--sway-3)); }
        68% { transform: rotate(var(--sway-4)); }
        84% { transform: rotate(var(--sway-5)); }
        100% { transform: rotate(0deg); }
    }

    .flower-sway {
        animation-name: flower-sway;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        will-change: transform;
    }

    .flower-sway-1 {
        --sway-1: 1.1deg; --sway-2: -0.7deg; --sway-3: 1.7deg; --sway-4: 0.3deg; --sway-5: -1.4deg;
        transform-origin: 71% 98%;
        animation-duration: 7.5s;
    }

    .flower-sway-2 {
        --sway-1: -1.4deg; --sway-2: 0.8deg; --sway-3: -1.1deg; --sway-4: 0.5deg; --sway-5: 1.3deg;
        transform-origin: 35% 97%;
        animation-duration: 4.15s;
        animation-delay: -4.6s;
    }

    .flower-sway-3 {
        --sway-1: 0.8deg; --sway-2: -0.5deg; --sway-3: 1.2deg; --sway-4: 0.2deg; --sway-5: -0.9deg;
        transform-origin: 43% 99%;
        animation-duration: 5.25s;
        animation-delay: -7.2s;
    }

    .flower-sway-4 {
        --sway-1: -1.6deg; --sway-2: 0.9deg; --sway-3: -1.3deg; --sway-4: 0.4deg; --sway-5: 1.5deg;
        transform-origin: 54% 98%;
        animation-duration: 3.85s;
        animation-delay: -6.1s;
    }

    @media (prefers-reduced-motion: reduce) {
        .flower-sway {
            animation: none;
        }
    }
</style>
