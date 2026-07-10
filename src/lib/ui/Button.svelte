<!-- src/lib/ui/Button.svelte -->
<script lang="ts">
    let {
        href = undefined,
        onclick = undefined,
        letter = "I",
        label = "INFO",
        variant = "light",
        showBadge = true
    }: {
        href?: string;
        onclick?: () => void;
        letter?: string;
        label?: string;
        variant?: "light" | "dark";
        showBadge?: boolean;
    } = $props();
</script>

{#snippet content()}
    <div class="flex flex-row gap-[10px]">
        {#if showBadge}
            <div class="flex flex-col items-center justify-center gap-[10px] px-[3px] py-[10px] w-[25px] h-[25px] flex-shrink-0 group-hover:bg-[#0278FF] {variant === 'light' ? 'bg-[#101A21] text-primary-white' : 'bg-primary-white text-[#101A21]'}">
                {letter}
            </div>
        {/if}
        <div class="text-center text-[16px] font-extrabold leading-normal group-hover:text-[#0278FF] {variant === 'light' ? 'text-[#101A21]' : 'text-primary-white'}">
            {label}
        </div>
    </div>
{/snippet}

{#if href}
    
    <a href=    {href}
        class="group inline-flex items-center justify-center gap-[10px] rounded-[6px] px-[6px] py-[6px] {variant === 'light' ? 'bg-primary-white' : 'bg-[#101A21]'}"
    >
        {@render content()}
    </a>
{:else}
    <button
        onclick={onclick}
        class="group inline-flex items-center justify-center gap-[10px] rounded-[6px] px-[6px] py-[6px] {variant === 'light' ? 'bg-primary-white' : 'bg-[#101A21]'}"
    >
        {@render content()}
    </button>
{/if}