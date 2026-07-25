<script lang="ts">
    import { onMount } from 'svelte';

    type CoCSubsectionWithTitle = {
        title: string;
        items: string[];
    };

    type CoCSubsectionWithIntro = {
        intro: string;
        items: string[];
    };

    type CoCBlock = string[] | CoCSubsectionWithTitle | CoCSubsectionWithIntro;

    type CoCSectionData = {
        title: string;
        blocks: CoCBlock[];
    };

    let { highlighted = false } = $props();
    let isMounted = $state(false);
    let cocSections = $state<CoCSectionData[]>([]);

    onMount(async () => {
        try {
            const response = await fetch('/data/coc-sections.json');
            cocSections = await response.json();
        } catch (e) {
            console.error('Failed to load CoC data:', e);
        }
        isMounted = true;
    });

    function parseTextWithLinks(text: string) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);
        return parts.map(part => {
            if (part.match(urlRegex)) {
                return { isLink: true, content: part };
            }
            return { isLink: false, content: part };
        });
    }

    function isStringArray(block: CoCBlock): block is string[] {
        return Array.isArray(block);
    }

    function isSubsectionWithTitle(block: CoCBlock): block is CoCSubsectionWithTitle {
        return !Array.isArray(block) && 'title' in block;
    }

    function isSubsectionWithIntro(block: CoCBlock): block is CoCSubsectionWithIntro {
        return !Array.isArray(block) && 'intro' in block;
    }
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
        {#each cocSections as section, index}
            <div class="max-w-xl w-full {index === cocSections.length - 1 ? 'mb-30' : 'mb-15'}">
                <h2 class="mb-6 text-2xl md:text-[41px] leading-none" class:animate-stagger-in={isMounted} class:opacity-0={!isMounted}>
                    {section.title}
                </h2>

                <div class="border-l-2 border-black pl-5 flex flex-col gap-6" class:animate-stagger-in={isMounted} class:opacity-0={!isMounted}>
                    {#each section.blocks as block}
                        {#if isStringArray(block)}
                            <div class="flex flex-col gap-4">
                                {#each block as paragraph}
                                    <p class="text-lg leading-7 px-3">
                                        {#each parseTextWithLinks(paragraph) as part}
                                            {#if part.isLink}
                                                <a href={part.content} target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80 break-all">{part.content}</a>
                                            {:else}
                                                {part.content}
                                            {/if}
                                        {/each}
                                    </p>
                                {/each}
                            </div>
                        {:else if isSubsectionWithTitle(block)}
                            <div class="flex flex-col gap-2">
                                <h3 class="text-xl font-bold px-3">
                                    {block.title}
                                </h3>
                                <ul class="list-disc pl-8 text-lg leading-7 px-3 space-y-1">
                                    {#each block.items as item}
                                        <li>
                                            {#each parseTextWithLinks(item) as part}
                                                {#if part.isLink}
                                                    <a href={part.content} target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80 break-all">{part.content}</a>
                                                {:else}
                                                    {part.content}
                                                {/if}
                                            {/each}
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {:else if isSubsectionWithIntro(block)}
                            <div class="flex flex-col gap-2">
                                <p class="text-lg font-bold px-3">
                                    {block.intro}
                                </p>
                                <ul class="list-disc pl-8 text-lg leading-7 px-3 space-y-1">
                                    {#each block.items as item}
                                        <li>
                                            {#each parseTextWithLinks(item) as part}
                                                {#if part.isLink}
                                                    <a href={part.content} target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80 break-all">{part.content}</a>
                                                {:else}
                                                    {part.content}
                                                {/if}
                                            {/each}
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}
                    {/each}
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
