<!-- src/lib/components/LandingBackground.svelte -->
<div class="absolute inset-0 w-full h-full overflow-hidden bg-[#2A6FF5] z-0">

    <!-- Background: sky/mountains -->
    <img src="/landing-page/cloud-shape.svg" alt="" class="absolute inset-0 w-full h-full object-cover" />

    <!-- MidGround: road -->
    <img src="/landing-page/road.svg" alt="" class="absolute left-0 top-[15%] w-full" />

    <!-- The Side-Walk -->
    <img src="/landing-page/sidewalk.svg" alt="" class="absolute left-0 top-[55%] w-[1657px]" />

    <!-- ForeGround: stairs + building -->
    <img src="/landing-page/stairs.svg" alt="" class="absolute right-0 bottom-0 w-[1263px] z-[5]" />

    <!-- Bush 3: back foliage layer -->
    <img
        src="/landing-page/bush3.svg"
        alt=""
        aria-hidden="true"
        class="absolute z-[6] pointer-events-none select-none"
        style="
            left: -3.85%;
            top: 73.36%;
            width: 25.82%;
            height: 25.30%;
        "
    />

    <!-- Bush 2: middle foliage layer -->
    <img
        src="/landing-page/bush2.svg"
        alt=""
        aria-hidden="true"
        class="absolute z-[7] pointer-events-none select-none"
        style="
            left: -5%;
            top: 80.36%;;
            width: 22.96%;
            height: 20%;
        "
    />

    <!-- Bush 1: front foliage layer -->
    <img
        src="/landing-page/bush1.svg"
        alt=""
        aria-hidden="true"
        class="absolute z-[8] pointer-events-none select-none"
        style="
            left: -7.94%;
            top: 83.19%;
            width: 28.41%;
            height: 24.58%;
        "
    />

    <!-- Flower 1: large foreground flower -->
    <img
        src="/landing-page/flower.svg"
        alt=""
        aria-hidden="true"
        class="flower-sway flower-sway-1 absolute z-[9] pointer-events-none select-none"
        style="
            left: 10.28%;
            bottom: 0%;
            width: 10.71%;
            height: 21%;
        "
    />

    <!-- Flower 2 -->
    <img
        src="/landing-page/flower2.svg"
        alt=""
        aria-hidden="true"
        class="flower-sway flower-sway-2 absolute z-[9] pointer-events-none select-none"
        style="
            left: 19.80%;
            top: 80.99%;
            width: 3.28%;
            height: 9.74%;
        "
    />

    <!-- Flower 3 -->
    <img
        src="/landing-page/flower3.svg"
        alt=""
        aria-hidden="true"
        class="flower-sway flower-sway-3 absolute z-[9] pointer-events-none select-none"
        style="
            left: 17.29%;
            top: 72.99%;
            width: 4.97%;
            height: 14.76%;
        "
    />

    <!-- Flower 4 -->
    <img
        src="/landing-page/flower4.svg"
        alt=""
        aria-hidden="true"
        class="flower-sway flower-sway-4 absolute z-[9] pointer-events-none select-none"
        style="
            left: 21.65%;
            top: 71.14%;
            width: 3.71%;
            height: 11.03%;
        "
    />

</div>


<style>
    @keyframes flower-sway {
        0% {
            transform: rotate(0deg);
        }

        14% {
            transform: rotate(var(--sway-1));
        }

        33% {
            transform: rotate(var(--sway-2));
        }

        52% {
            transform: rotate(var(--sway-3));
        }

        68% {
            transform: rotate(var(--sway-4));
        }

        84% {
            transform: rotate(var(--sway-5));
        }

        100% {
            transform: rotate(0deg);
        }
    }

    .flower-sway {
        animation-name: flower-sway;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        will-change: transform;
    }

    .flower-sway-1 {
        --sway-1: 1.1deg;
        --sway-2: -0.7deg;
        --sway-3: 1.7deg;
        --sway-4: 0.3deg;
        --sway-5: -1.4deg;

        transform-origin: 71% 98%;
        animation-duration: 7.5s;
    }

    .flower-sway-2 {
        --sway-1: -1.4deg;
        --sway-2: 0.8deg;
        --sway-3: -1.1deg;
        --sway-4: 0.5deg;
        --sway-5: 1.3deg;

        transform-origin: 35% 97%;
        animation-duration: 4.15s;
        animation-delay: -4.6s;
    }

    .flower-sway-3 {
        --sway-1: 0.8deg;
        --sway-2: -0.5deg;
        --sway-3: 1.2deg;
        --sway-4: 0.2deg;
        --sway-5: -0.9deg;

        transform-origin: 43% 99%;
        animation-duration: 5.25s;
        animation-delay: -7.2s;
    }

    .flower-sway-4 {
        --sway-1: -1.6deg;
        --sway-2: 0.9deg;
        --sway-3: -1.3deg;
        --sway-4: 0.4deg;
        --sway-5: 1.5deg;

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