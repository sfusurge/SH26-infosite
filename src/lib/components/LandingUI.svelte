<!-- src/lib/components/Header.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import Navbar from "$lib/ui/Navbar.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";

    let isMounted = $state(false);

    onMount(() => {
        isMounted = true;
    });
</script>

<header class="absolute top-0 left-0 w-full flex flex-col md:flex-row items-start justify-between p-4 md:p-8 z-10">

    <!-- StormHacks Branding & Subtitles -->
    <div class="flex flex-col gap-4">
        <div
            class="flex items-start gap-4 transition-[opacity,filter,transform] duration-copy ease-copy"
            class:opacity-0={!isMounted}
            class:blur-sm={!isMounted}
            class:translate-y-[6px]={!isMounted}
            class:opacity-100={isMounted}
            class:blur-none={isMounted}
            class:translate-y-0={isMounted}
        >
            <img src="/mlhBanner.svg" alt="MLH Official 2027 Season" class="hidden md:block w-15 h-20" />

            <div class="flex flex-col items-start gap-1">
                <h1 class="font-exposure text-white text-[41.76px] md:text-6xl font-semibold whitespace-nowrap">
                    [ StormHacks 26' ]
                </h1>

                <!-- Desktop Subtitle -->
                <p class="font-sf text-white text-base mt-1 hidden md:flex items-center gap-2 whitespace-nowrap">
                    <span>West Canada's Largest Hackathon</span>
                    <img src="/ui/star.svg" alt="" aria-hidden="true" class="w-[18px] h-[18px]" />
                    <span>Oct 3 + 4</span>
                    <img src="/ui/star.svg" alt="" aria-hidden="true" class="w-[18px] h-[18px]" />
                    <span>SFU Burnaby</span>
                </p>

                <!-- Mobile Subtitle -->
                <p class="font-sf text-white text-lg mt-1 md:hidden">
                    West Canada's Largest Hackathon
                </p>
                <p class="font-sf text-white text-lg md:hidden flex items-center gap-2">
                    <span>Oct 3 + 4</span>
                    <img src="/ui/star.svg" alt="" aria-hidden="true" class="w-[16px] h-[16px]" />
                    <span>SFU Burnaby</span>
                </p>
            </div>
        </div>
    </div>


    <Navbar {isMounted} />

</header>


<SoundButton
    class={`absolute left-5 bottom-5 transition-[opacity,filter,transform] duration-copy ease-copy delay-700 ${!isMounted ? 'opacity-0 blur-sm translate-y-[6px]' : 'opacity-100 blur-none translate-y-0'}`}
/>

<button
    class="absolute right-5 bottom-5 grid place-items-center w-[32px] h-[32px] rounded-md bg-[#ececef] z-10 transition-[opacity,filter,transform] duration-copy ease-copy delay-700"
    class:opacity-0={!isMounted}
    class:blur-sm={!isMounted}
    class:translate-y-[6px]={!isMounted}
    class:opacity-100={isMounted}
    class:blur-none={isMounted}
    class:translate-y-0={isMounted}
    aria-label="Expand view"
>
    <img src="/ui/expand.svg" alt="" class="w-[24px] h-[24px]" />
</button>