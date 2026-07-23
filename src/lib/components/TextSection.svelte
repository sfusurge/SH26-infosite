<script>
    import { onMount } from 'svelte';
    let { highlighted = false } = $props();
    let isMounted = $state(false);

    onMount(() => {
        isMounted = true;
    });
</script>

<div
    class="relative z-0 mt-30 flex flex-col items-center justify-center text-center text-2xl md:text-[41px] leading-[118%] tracking-[0%] md:gap-10.25 w-full max-w-[90vw] md:w-147 px-1 brush-stroke font-regular transition-all duration-300 ease-out"
    class:opacity-30={highlighted}
    class:blur-[4.5px]={highlighted}
>
    <div class="pointer-events-none absolute top-0 left-0 right-0 z-10 h-25 bg-gradient-to-b from-[#0278FF] via-[#0278FF]/70 to-transparent" ></div>    
    <div
        class="transition-[opacity,filter,transform] duration-copy ease-copy flex flex-col items-center gap-6 md:gap-10.25 max-h-[90vh] pt-25 md:pt-35 md:max-h-[100vh] overflow-y-auto hide-scrollbar"
        class:opacity-0={!isMounted}
        class:blur-sm={!isMounted}
        class:translate-y-[6px]={!isMounted}
        class:opacity-100={isMounted}
        class:blur-none={isMounted}
        class:translate-y-0={isMounted}
    >
    
        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            Most people think that the way to success is linear, and if you don’t follow said path, you’re doomed. 
        </p>

        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            <span class="font-semibold">We don't.</span>
        </p>

        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            <span class="font-semibold">StormHacks</span> builds on a single belief: that no matter where you start, you were always meant to build great things.
        </p>

        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            It means building what you <span class="font-semibold">actually</span> want. Not the safest idea. Not the one you’d solely do just to get brownie points from judges. Build the thing that excites you, the thing that scares you a little, the thing that's been sitting in the back of your mind for ages.
        </p>

        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            It means pushing past what you <span class="font-semibold"> think you're capable of </span>.
        </p>

        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            Shipping something imperfect and real instead of waiting until you're ready.
        </p>

        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            It means starting, even when starting is the hardest part. <span class="font-semibold">StormHacks</span> is your sandbox.
        </p>

        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            Join us on <span class="font-semibold"> October 3rd & 4th </span> with mentors, community opportunities, and every resource we can give you to make sure you don't have to figure it out alone.
        </p>

        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted}>
            This is not just a hackathon.
        </p>
        
        <p class:animate-stagger-in-delayed={isMounted} class:opacity-0={!isMounted} class="mb-30">
            <span class="font-semibold">This is your moment to do what you truly love</span>. 
        </p>
    </div>
    
    <div class="pointer-events-none absolute -bottom-1 left-0 right-0 z-10 h-25 bg-gradient-to-t from-[#0278FF] via-[#0278FF]/70 to-transparent"></div>
</div>

<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>