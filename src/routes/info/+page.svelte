<script lang="ts">
    import TextSection from "$lib/components/TextSection.svelte";
    import Header from "$lib/components/Header.svelte";
    import SoundButton from "$lib/ui/SoundButton.svelte";

    let otterDirection = $state<'left' | 'right'>('left');
</script>

<div class="fixed inset-0 overflow-hidden bg-background-blue flex justify-center items-center">
    <Header pageLabel="Info" backHref="/" applyHref="/apply" />

    <div class="relative flex justify-center items-center h-full text-primary-black gap-19 flex-col origin-center">
        <TextSection
            onScrollDirection={(direction) => {
                otterDirection = direction;
            }}
        />
    </div>

    <div class="fixed bottom-4 left-4 z-50">
        <SoundButton />
    </div>

    <div
        class="fixed bottom-4 z-50 transition-all duration-700 ease-out"
        class:left-4={otterDirection === 'left'}
        class:right-4={otterDirection === 'right'}
    >
        <img
            src="/OtterInfo.gif"
            alt="Info Otter"
            class="w-86 h-86 object-contain transition-transform duration-300"
            class:scale-x-[-1]={otterDirection === 'left'}
        />
    </div>
</div>