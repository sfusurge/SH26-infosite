<div class="landing-foreground" aria-hidden="true">
    <div class="foreground-canvas">
        <!-- The stairs asset also contains the building wall and railings. -->
        <img
            src="/landing-page/stairs.svg"
            alt=""
            class="stairs"
        />

        <img
            src="/landing-page/bush3.svg"
            alt=""
            class="bush-rustle bush-rustle-back bush-3"
        />

        <img
            src="/landing-page/bush2.svg"
            alt=""
            class="bush-rustle bush-rustle-middle bush-2"
        />

        <img
            src="/landing-page/bush1.svg"
            alt=""
            class="bush-rustle bush-rustle-front bush-1"
        />

        <img
            src="/landing-page/flower.svg"
            alt=""
            class="flower-sway flower-sway-1 flower-1"
        />

        <img
            src="/landing-page/flower2.svg"
            alt=""
            class="flower-sway flower-sway-2 flower-2"
        />

        <img
            src="/landing-page/flower3.svg"
            alt=""
            class="flower-sway flower-sway-3 flower-3"
        />

        <img
            src="/landing-page/flower4.svg"
            alt=""
            class="flower-sway flower-sway-4 flower-4"
        />
    </div>
</div>

<style>
    .landing-foreground {
        position: absolute;
        inset: 0;
        z-index: 10;
        overflow: hidden;
        pointer-events: none;
    }

    .foreground-canvas {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: var(--landing-scene-width);
        height: var(--landing-scene-height);
        transform: translateX(-50%);
    }

    .stairs,
    .bush-rustle,
    .flower-sway {
        position: absolute;
        max-width: none;
        pointer-events: none;
        user-select: none;
    }

    .stairs {
        right: 0;
        bottom: 0;
        z-index: 5;
        width: 75.85%;
        height: auto;
    }

    .bush-3 {
        left: 0;
        bottom: 0;
        z-index: 6;
        width: 23.94%;
        height: auto;
    }

    .bush-2 {
        left: 0;
        bottom: 0;
        z-index: 7;
        width: 15.01%;
        height: auto;
    }

    .bush-1 {
        left: 0;
        bottom: 0;
        z-index: 8;
        width: 24.54%;
        height: auto;
    }

    .flower-1 {
        left: 14.28%;
        bottom: 0;
        z-index: 9;
        width: 10.71%;
        height: 21%;
    }

    .flower-2 {
        left: 23.8%;
        top: 82.99%;
        z-index: 9;
        width: 3.28%;
        height: 9.74%;
    }

    .flower-3 {
        left: 20.29%;
        top: 74.99%;
        z-index: 9;
        width: 5.67%;
        height: 14.76%;
    }

    .flower-4 {
        left: 25.65%;
        top: 73.14%;
        z-index: 9;
        width: 3.71%;
        height: 11.03%;
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

    @keyframes bush-rustle {
        0%, 100% { transform: rotate(0deg); }
        18% { transform: rotate(var(--rustle-1)); }
        39% { transform: rotate(var(--rustle-2)); }
        61% { transform: rotate(var(--rustle-3)); }
        82% { transform: rotate(var(--rustle-4)); }
    }

    .bush-rustle {
        animation-name: bush-rustle;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        will-change: transform;
    }

    .bush-rustle-back {
        --rustle-1: 0.28deg;
        --rustle-2: -0.18deg;
        --rustle-3: 0.38deg;
        --rustle-4: -0.12deg;
        transform-origin: 8% 100%;
        animation-duration: 6.8s;
        animation-delay: -3.1s;
    }

    .bush-rustle-middle {
        --rustle-1: -0.42deg;
        --rustle-2: 0.24deg;
        --rustle-3: -0.31deg;
        --rustle-4: 0.16deg;
        transform-origin: 12% 100%;
        animation-duration: 5.4s;
        animation-delay: -1.7s;
    }

    .bush-rustle-front {
        --rustle-1: 0.2deg;
        --rustle-2: -0.3deg;
        --rustle-3: 0.34deg;
        --rustle-4: -0.2deg;
        transform-origin: 5% 100%;
        animation-duration: 7.3s;
        animation-delay: -5.2s;
    }

    @media (prefers-reduced-motion: reduce) {
        .flower-sway,
        .bush-rustle {
            animation: none;
        }
    }
</style>
