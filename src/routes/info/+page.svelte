<script lang="ts">
    import TextSection from "$lib/components/TextSection.svelte";
    import Header from "$lib/components/Header.svelte";
</script>

<div class="w-full h-screen bg-background-blue flex justify-center items-center">
    <Header pageLabel="Info" backHref="/" applyHref="/apply" />
    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <TextSection />
    </div>
</div>