<script lang="ts">
    import Button from "$lib/ui/Button.svelte";
</script>

<div class="w-full h-screen font-exposure overflow-hidden bg-[#2A6FF5] relative">

    <div class="absolute top-0 left-0 w-full flex flex-col md:flex-row items-start justify-between p-6 md:p-8 z-10">

        <div class="flex flex-col gap-4">
            <div>
                <h1 class="font-exposure text-white text-3xl md:text-5xl font-bold">
                    [ StormHacks 26' ]
                </h1>
                <p class="font-sf text-white text-sm md:text-base mt-1">
                    West Canada's Largest Hackathon
                </p>
                <p class="font-sf text-white text-sm md:text-base md:hidden">
                    Oct 3 + 4 ✳ SFU Burnaby
                </p>
            </div>

            <!-- mobile -->
            <nav class="font-sans flex md:hidden flex-col items-start gap-3 mt-4">
                <Button href="/info" label="INFO" variant="light" showBadge={false} />
                <Button href="/workshop" label="THE WORKSHOP" variant="light" showBadge={false} />
                <Button href="/faq" label="FAQ" variant="light" showBadge={false} />
                <Button href="/credits" label="CREDITS" variant="light" showBadge={false} />
                <Button href="/apply" label="APPLY >" variant="dark" showBadge={false} />
            </nav>
        </div>

        <!-- desktop -->
        <nav class="font-sans hidden md:flex items-center gap-3">
            <Button href="/info" letter="I" label="INFO" variant="light" />
            <Button href="/workshop" letter="W" label="THE WORKSHOP" variant="light" />
            <Button href="/faq" letter="F" label="FAQ" variant="light" />
            <Button href="/credits" letter="C" label="CREDITS" variant="light" />
            <Button href="/apply" letter="A" label="APPLY >" variant="dark" />
        </nav>
    </div>

</div>