<script lang="ts">
    import CocSection from "$lib/components/CocSection.svelte";
    import Header from "$lib/components/Header.svelte";
</script>

<div class="coc-page fixed inset-0 overflow-hidden bg-[#FF5D0B] flex justify-center items-center">
    <Header pageLabel="Code of Conduct" backHref="/" />
    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <CocSection />
    </div>
</div>

<style>
    :global(.coc-page ::selection) {
        background: #141417;
        color: #FF5D0B;
    }
</style>
