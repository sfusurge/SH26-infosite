<script lang="ts">
    import { onMount } from "svelte";
    import defaultSponsors from "$lib/data/sponsors.json" with { type: "json" };

    type Sponsor = {
        name: string;
        url: string;
        image: string;
        class?: string;
    };

    let {
        sponsors = undefined,
        class: className = ""
    }: {
        sponsors?: Sponsor[];
        class?: string;
    } = $props();

    let fetchedSponsors = $state<Sponsor[] | null>(null);
    let sponsorsList = $derived(sponsors ?? fetchedSponsors ?? (defaultSponsors as Sponsor[]));

    onMount(async () => {
        if (!sponsors) {
            try {
                const res = await fetch('/data/sponsors.json');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        fetchedSponsors = data;
                    }
                }
            } catch {
                // fall back to default imported sponsors
            }
        }
    });
</script>

<div
    class={`flex flex-col justify-center items-start w-[268px] sm:w-[354px] max-w-[268px] sm:max-w-[354px] h-[32px] sm:h-auto px-[12px] sm:px-[16px] py-[4px] sm:py-[14px] gap-[10px] rounded-[6px] bg-[#ececef] shrink-0 select-none ${className}`}
>
    <div class="flex items-center justify-between w-full gap-2 sm:gap-3.5">
        {#each sponsorsList as sponsor (sponsor.name)}
            <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                title={sponsor.name}
                class="flex items-center hover:opacity-75 transition-opacity shrink-0"
            >
                <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    class={`${sponsor.class || 'h-[18px]'} w-auto object-contain`}
                />
            </a>
        {/each}
    </div>
</div>
