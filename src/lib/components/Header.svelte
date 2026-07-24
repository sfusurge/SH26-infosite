<!-- src/lib/components/Header.svelte -->
<script lang="ts">
    import ApplyButton from "$lib/ui/ApplyButton.svelte";
    import { page } from "$app/state";

    let {
        pageLabel = "Info",
        backHref = "/",
    }: {
        pageLabel?: string;
        backHref?: string;
    } = $props();
</script>

<header class="font-sans absolute top-0 left-0 w-full z-[999] flex items-center justify-between px-4 py-4 md:px-8 md:py-7">
    <div class="flex items-center gap-3 md:gap-4">
        
        <a href={backHref}
            aria-label="Go back"
            class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-[6px] bg-primary-white"
        >
            <img src="/ui/arrowback.svg" alt="" class="w-[24px] h-[24px]" />
        </a>

        <span class="hidden md:inline text-primary-white text-[16px] font-semibold">
            StormHacks 2026
        </span>

        <div class="flex items-center gap-1.5 text-primary-white">
            <img src="/ui/star.svg" alt="" aria-hidden="true" class="w-[18px] h-[18px]" />
            <span class="text-[16px] font-medium">
                {pageLabel}
            </span>
        </div>
    </div>

    <div class="font-bold">
        <ApplyButton variant={page.url.pathname === "/credits" ? "light" : "dark"} />
    </div>
</header>