<script>
    import { onMount } from 'svelte';
    let { highlighted = false } = $props();
    let isMounted = $state(false);

    onMount(() => {
        isMounted = true;
    });
</script>

<div
    class="relative z-0 flex flex-col md:mt-50 items-center justify-center text-center text-2xl md:text-[41px] leading-[118%] tracking-[0%] md:gap-10.25 w-full max-w-[90vw] md:w-147 px-1 brush-stroke font-regular transition-all duration-300 ease-out"
    class:opacity-30={highlighted}
    class:blur-[4.5px]={highlighted}
>
    <div
        class="transition-[opacity,filter,transform] duration-copy ease-copy flex flex-col items-center gap-10.25"
        class:opacity-0={!isMounted}
        class:blur-sm={!isMounted}
        class:translate-y-[6px]={!isMounted}
        class:opacity-100={isMounted}
        class:blur-none={isMounted}
        class:translate-y-0={isMounted}
    >
        <p>
            <span class="font-semibold">StormHacks</span> isn’t just West Canada’s biggest Hackathon.
        </p>

        <p class:animate-stagger-in={isMounted} class:opacity-0={!isMounted}>
            This is your chance to prove that no matter where you start, <span class="font-semibold">you</span> were always born to build great things.
        </p>

        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            Join us on <span class="font-semibold">October 3rd & 4th</span> at SFU Burnaby Campus.
        </p>
    </div>
</div>