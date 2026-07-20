<script lang="ts">
    let {
        href = undefined,
        onclick = undefined,
        letter = "I",
        label = "INFO",
        variant = "light",
        showBadge = true,
        appearance = "default"
    }: {
        href?: string;
        onclick?: () => void;
        letter?: string;
        label?: string;
        variant?: "light" | "dark";
        showBadge?: boolean;
        appearance?: "default" | "landing";
    } = $props();
</script>

{#snippet content()}
    <div class="flex flex-row gap-[10px] {appearance === 'landing' ? 'items-center' : ''}">
        {#if showBadge}
            <div class="{appearance === 'landing' ? 'grid place-items-center rounded-[2px] text-[14px] leading-none font-bold translate-y-px' : 'flex flex-col items-center justify-center gap-[10px] px-[3px] py-[10px]'} w-[25px] h-[25px] flex-shrink-0 group-hover:bg-[#0278FF] {variant === 'light' ? `bg-[#101A21] ${appearance === 'landing' ? 'text-[#ececef]' : 'text-primary-white'}` : `${appearance === 'landing' ? 'bg-[#ececef]' : 'bg-primary-white'} text-[#101A21]`}">
                {letter}
            </div>
        {/if}
        <div class="text-center text-[16px] {appearance === 'landing' ? 'font-bold leading-none whitespace-nowrap translate-y-px' : 'font-extrabold leading-normal'} group-hover:text-[#0278FF] {variant === 'light' ? 'text-[#101A21]' : appearance === 'landing' ? 'text-[#ececef]' : 'text-primary-white'}">
            {label}
        </div>
    </div>
{/snippet}

{#if href}
    
    <a href={href}
        class="group inline-flex items-center justify-center gap-[10px] rounded-[6px] {appearance === 'landing' ? 'h-[33px] w-fit pt-[4px] pr-[6px] pb-[6px] pl-[4px] font-sans' : 'px-[6px] py-[4px]'} {variant === 'light' ? appearance === 'landing' ? 'bg-[#ececef]' : 'bg-primary-white' : 'bg-[#101A21]'}"
    >
        {@render content()}
    </a>
{:else}
    <button
        onclick={onclick}
        class="group inline-flex items-center justify-center gap-[10px] rounded-[6px] {appearance === 'landing' ? 'h-[33px] w-fit pt-[4px] pr-[6px] pb-[6px] pl-[4px] font-sans' : 'px-[6px] py-[4px]'} {variant === 'light' ? appearance === 'landing' ? 'bg-[#ececef]' : 'bg-primary-white' : 'bg-[#101A21]'}"
    >
        {@render content()}
    </button>
{/if}
