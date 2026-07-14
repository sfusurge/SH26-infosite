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
        class="absolute z-[9] pointer-events-none select-none"
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
        class="absolute z-[9] pointer-events-none select-none"
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
        class="absolute z-[9] pointer-events-none select-none"
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
        class="absolute z-[9] pointer-events-none select-none"
        style="
            left: 21.65%;
            top: 71.14%;
            width: 3.71%;
            height: 11.03%;
        "
    />

</div>
