<div class="absolute inset-0 w-full h-full overflow-hidden bg-[#0283F7]">

    <div class="scene-canvas">

        <div class="cloud-window" aria-hidden="true">
            <img src="/landing-page/cloud-shape.webp" alt="" class="cloud-copy cloud-copy-1" />
            <img src="/landing-page/cloud-shape.webp" alt="" class="cloud-copy cloud-copy-2" />
        </div>

        <img src="/landing-page/road.webp" alt="" class="absolute left-0 top-[32.5%] w-full" />

    </div>

</div>

<style>
    .scene-canvas {
        position: absolute;
        top: auto;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

        width: var(--landing-scene-width);
        height: var(--landing-scene-height);
    }

    .cloud-window {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
    }

    .cloud-copy {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        max-width: none;
        height: auto;
        -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 3%, #000 97%, transparent 100%);
        mask-image: linear-gradient(to right, transparent 0%, #000 3%, #000 97%, transparent 100%);
        animation: cloud-drift 360s linear infinite;
        will-change: transform;
    }

    .cloud-copy-1 {
        animation-delay: -90s;
    }

    .cloud-copy-2 {
        animation-delay: -270s;
    }

    @keyframes cloud-drift {
        from { transform: translate3d(100%, 0, 0); }
        to { transform: translate3d(-100%, 0, 0); }
    }

</style>
