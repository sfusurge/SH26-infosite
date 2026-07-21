<script lang="ts">
    let { muted = $bindable(false) }: { muted?: boolean } = $props();
</script>

<button
    class="absolute left-5 bottom-5 grid place-items-center w-[32px] h-[32px] rounded-md bg-[#ececef] z-10"
    onclick={() => muted = !muted}
    aria-label={muted ? "Unmute sound" : "Mute sound"}
>
    <img src="/ui/sound.svg" alt="" class="w-[24px] h-[24px]" />
</button>