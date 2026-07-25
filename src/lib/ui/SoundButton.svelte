<script lang="ts">
    import { onMount } from "svelte";
    import { audioManager } from "$lib/audioManager.js";
    import { page } from "$app/state";

    let { 
        class: className = "absolute left-5 bottom-5",
        highlightColor = undefined
    }: { 
        class?: string;
        highlightColor?: "blue" | "orange";
    } = $props();

    let activeHighlight = $derived(
        highlightColor ?? (page.url.pathname.startsWith('/faq') ? 'orange' : 'blue')
    );

    let isMuted = $state(false);

    onMount(() => {
        const unsubscribe = audioManager.subscribeMuteState((muted) => {
            isMuted = muted;
        });
        return unsubscribe;
    });

    function toggle() {
        audioManager.toggleMute();
    }
</script>

<button
    class={`group grid place-items-center w-[32px] h-[32px] rounded-md bg-[#ececef] z-10 transition-all ${className}`}
    onclick={toggle}
    aria-label={isMuted ? "Unmute sound" : "Mute sound"}
>
    <div
        class={`w-[24px] h-[24px] bg-black transition-colors ${activeHighlight === 'orange' ? 'group-hover:bg-[#FF5D0B]' : 'group-hover:bg-[#0278FF]'} ${isMuted ? "opacity-30" : "opacity-100"}`}
        style="mask: url('/ui/sound.webp') no-repeat center / contain; -webkit-mask: url('/ui/sound.webp') no-repeat center / contain;"
        aria-hidden="true"
    ></div>
</button>