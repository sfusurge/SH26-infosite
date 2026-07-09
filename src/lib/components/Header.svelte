<!-- src/lib/components/Header.svelte -->
<script lang="ts">
    import Button from "$lib/ui/Button.svelte";

    let {
        pageLabel = "Info",
        backHref = "/",
        applyHref = "/apply"
    }: {
        pageLabel?: string;
        backHref?: string;
        applyHref?: string;
    } = $props();
</script>

<header class="font-sans absolute top-0 left-0 w-full z-[999] flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
    <div class="flex items-center gap-3 md:gap-4">
        
        <a href={backHref}
            aria-label="Go back"
            class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-white"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#101A21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>

        <span class="hidden md:inline text-primary-white text-[16px] font-semibold">
            StormHacks 2026
        </span>

        <div class="flex items-center gap-1.5 text-primary-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor"/>
            </svg>
            <span class="text-[16px] font-medium">
                {pageLabel}
            </span>
        </div>
    </div>

    <Button href={applyHref} letter="A" label="APPLY >" variant="dark" />
</header>