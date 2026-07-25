<script lang="ts">
    import { onMount } from "svelte";
    import { audioManager } from "$lib/audioManager.js";

    let { class: className = "absolute left-5 bottom-5" }: { class?: string } = $props();
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
    class={`grid place-items-center w-[32px] h-[32px] rounded-md bg-[#ececef] z-10 transition-all ${className}`}
    onclick={toggle}
    aria-label={isMuted ? "Unmute sound" : "Mute sound"}
>
    <img
        src="/ui/sound.svg"
        alt=""
        class={`w-[24px] h-[24px] transition-opacity ${isMuted ? "opacity-30" : "opacity-100"}`}
    />
</button>