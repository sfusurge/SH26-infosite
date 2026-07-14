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
            left: -8.04%;
            top: 82.70%;
            width: 28.41%;
            height: 24.58%;
        "
    />

</div>
