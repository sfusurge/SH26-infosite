<script lang="ts">
    import { onMount } from 'svelte';

    type FAQItem = {
        question: string;
        answer: string;
    };

    let { highlighted = false } = $props();
    let isMounted = $state(false);
    let faqItems = $state<FAQItem[]>([]);

    onMount(async () => {
        try {
            const response = await fetch('/data/faq.json');
            faqItems = await response.json();
        } catch (e) {
            console.error('Failed to load FAQ data:', e);
        }
        isMounted = true;
    });
</script>

<div
    class="relative z-0 flex flex-col mt-30 items-center text-2xl md:text-4xl leading-[118%] tracking-[0%] gap-10.25 w-full max-w-[90vw] md:w-147 brush-stroke font-regular transition-all duration-300 ease-out"
    class:opacity-30={highlighted}
    class:blur-[4.5px]={highlighted}
>
    <div class="pointer-events-none absolute top-0 left-0 right-0 z-10 h-25 bg-gradient-to-b from-[#FF5D0B] via-[#FF5D0B]/70 to-transparent" ></div>    

    <div
        class="transition-[opacity,filter,transform] duration-copy ease-copy flex flex-col items-center gap-10.25 max-h-[90vh] pt-25 md:pt-35 md:max-h-[100vh] overflow-y-auto hide-scrollbar"
        class:opacity-0={!isMounted}
        class:blur-sm={!isMounted}
        class:translate-y-[6px]={!isMounted}
        class:opacity-100={isMounted}
        class:blur-none={isMounted}
        class:translate-y-0={isMounted}
    >
        {#each faqItems as item, index}
            <div class="max-w-xl {index === faqItems.length - 1 ? 'mb-30' : 'mb-15'}">
                <h2 class="mb-6 text-2xl md:text-[41px] leading-none" class:animate-stagger-in={isMounted} class:opacity-0={!isMounted}>
                    {item.question}
                </h2>

                <div class="border-l-2 border-black pl-5" class:animate-stagger-in={isMounted} class:opacity-0={!isMounted}>
                    <p class="text-lg leading-7 px-3 whitespace-pre-line">
                        {item.answer}
                    </p>
                </div>
            </div>
        {/each}
    </div>
    <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FF5D0B] via-[#FF5D0B]/70 to-transparent"></div>
</div>

<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  ::selection {
    background:  #141417;
    color: #FF5D0B;
  }
</style>