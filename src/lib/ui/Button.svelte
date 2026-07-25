<!-- src/lib/ui/Button.svelte -->
<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        href = undefined,
        onclick = undefined,
        letter = "I",
        label = "INFO",
        variant = "light",
        highlightColor = "blue",
        showBadge = true,
        "aria-label": ariaLabel = undefined,
        children = undefined
    }: {
        href?: string;
        onclick?: (e: MouseEvent) => void;
        letter?: string;
        label?: string;
        variant?: "light" | "dark";
        highlightColor?: "blue" | "orange";
        showBadge?: boolean;
        "aria-label"?: string;
        children?: Snippet;
    } = $props();
</script>

{#snippet content()}
    <div class="font-sf flex flex-row gap-[10px] items-center">
        {#if children}
            {@render children()}
        {:else}
            {#if showBadge}
                <div class="font-sf flex flex-col items-center justify-center gap-[10px] px-[3px] py-[10px] w-[25px] h-[25px] flex-shrink-0 group-hover:text-white transition-colors {highlightColor === 'orange' ? 'group-hover:bg-[#FF5D0B]' : 'group-hover:bg-[#0278FF]'} {variant === 'light' ? 'bg-[#101A21] text-primary-white' : 'bg-[#ECECEF] text-[#101A21]'}">
                    {letter}
                </div>
            {/if}
            {#if label}
                <div class="font-sf text-center text-[16px] font-extrabold leading-normal transition-colors {highlightColor === 'orange' ? 'group-hover:text-[#FF5D0B]' : 'group-hover:text-[#0278FF]'} {variant === 'light' ? 'text-[#101A21]' : 'text-primary-white'}">
                    {label}
                </div>
            {/if}
        {/if}
    </div>
{/snippet}

{#if href}
    <a 
        href={href}
        aria-label={ariaLabel}
        class="font-sf group inline-flex items-center justify-center gap-[10px] rounded-[6px] px-[6px] py-[4px] {variant === 'light' ? 'bg-[#ECECEF]' : 'bg-[#101A21]'}"
    >
        {@render content()}
    </a>
{:else}
    <button
        type="button"
        onclick={onclick}
        aria-label={ariaLabel}
        class="font-sf group inline-flex items-center justify-center gap-[10px] rounded-[6px] px-[6px] py-[4px] {variant === 'light' ? 'bg-[#ECECEF]' : 'bg-[#101A21]'}"
    >
        {@render content()}
    </button>
{/if}