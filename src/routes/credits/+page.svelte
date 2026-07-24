<script lang="ts">
    import CreditsSection from "$lib/components/CreditsSection.svelte";
    import Header from "$lib/components/Header.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";
</script>

<div class="font-exposure">
    <Header pageLabel="Credits" backHref="/" />
    <CreditsSection />
    <SoundButton />
</div>