<script>
	import sections from '/static/data/coc-sections.json';
	import { onMount } from 'svelte';

	let isMounted = $state(false);

	onMount(() => {
		isMounted = true;
	});

	/** @param {unknown} block */
	function isParagraphBlock(block) {
		return Array.isArray(block);
	}

	// Progressive blur layers, expressed as "percent distance from the true
	// screen edge" (0% = the actual top/bottom edge of the viewport, 100% =
	// fully blended into the unblurred content). Blur strength is highest
	// right at the edge and tapers off as it approaches content — each
	// layer fades out at a different point so the composite blur ramps
	// smoothly instead of snapping.
	const blurStops = [
		{ blur: 16, mask: [0, 0, 25, 37.5] },
		{ blur: 8, mask: [12.5, 25, 37.5, 50] },
		{ blur: 4, mask: [25, 37.5, 50, 62.5] },
		{ blur: 2, mask: [37.5, 50, 62.5, 75] },
		{ blur: 1, mask: [50, 62.5, 75, 87.5] },
		{ blur: 0.5, mask: [62.5, 75, 100, 100] }
	];

	/**
	 * @param {'top' | 'bottom'} direction
	 * For a top-fade div, `to bottom` puts 0% at the physical top (the true
	 * edge) and 100% at the physical bottom (merging into content) — so the
	 * edge-relative percentages above map straight across with no reversal.
	 * For a bottom-fade div, `to top` puts 0% at the physical bottom (the
	 * true edge) and 100% at the physical top (merging into content) — same
	 * mapping, just mirrored by the gradient direction itself.
	 */
	function layersFor(direction) {
		const gradientDirection = direction === 'top' ? 'to bottom' : 'to top';
		return blurStops.map((layer) => {
			const [t0, t1, t2, t3] = layer.mask;
			const mask = `linear-gradient(${gradientDirection}, transparent ${t0}%, black ${t1}%, black ${t2}%, transparent ${t3}%)`;
			return { blur: layer.blur, mask };
		});
	}

	const topBlurLayers = layersFor('top');
	const bottomBlurLayers = layersFor('bottom');
</script>

<div id="coc-page" class="relative min-h-screen bg-primary-yellow text-primary-black font-sf">
	<!-- Top blur fade -->
	<div
			class="fixed left-0 right-0 z-20 pointer-events-none overflow-hidden"
			style="top: calc(-1 * var(--top-blur-overshoot, 0px)); height: var(--top-blur-height, 250px);"
			aria-hidden="true"
	>
		{#each topBlurLayers as layer, i (i)}
			<div
					class="absolute inset-0"
					style="
					backdrop-filter: blur({layer.blur}px);
					-webkit-backdrop-filter: blur({layer.blur}px);
					mask-image: {layer.mask};
					-webkit-mask-image: {layer.mask};
				"
			></div>
		{/each}
		<div
				class="absolute inset-0"
				style="background: linear-gradient(to bottom, #F9B200 21.57%, rgba(249, 178, 0, 0.00) 100%);"
		></div>
	</div>

	<!-- Bottom blur fade -->
	<div
			class="fixed left-0 right-0 z-20 pointer-events-none overflow-hidden"
			style="bottom: calc(-1 * var(--bottom-blur-overshoot, 0px)); height: var(--bottom-blur-height, 250px);"
			aria-hidden="true"
	>
		{#each bottomBlurLayers as layer, i (i)}
			<div
					class="absolute inset-0"
					style="
					backdrop-filter: blur({layer.blur}px);
					-webkit-backdrop-filter: blur({layer.blur}px);
					mask-image: {layer.mask};
					-webkit-mask-image: {layer.mask};
				"
			></div>
		{/each}
		<div
				class="absolute inset-0"
				style="background: linear-gradient(0deg, #F9B200 21.57%, rgba(249, 178, 0, 0.00) 100%);"
		></div>
	</div>

	<!-- Header with navigation -->
	<header class="fixed top-5 left-5 z-30 flex items-center gap-4">
		<a href="/" class="inline-flex items-center justify-center p-1 rounded-md bg-slate-100" aria-label="Back to home">
			<img src="/coc/back-arrow.svg" alt="" class="block w-6 h-6" />
		</a>

		<div class="flex items-center justify-center gap-2 font-sf text-xs sm:text-sm md:text-base font-medium leading-none text-[#101a21] whitespace-nowrap">
			<span>StormHacks 2026</span>
			<img src="/coc/star.svg" alt="" class="block w-[18px] h-[18px] flex-shrink-0" />
			<span>MLH Code of Conduct</span>
		</div>
	</header>

	<!-- Main content -->
	<main class="relative z-10 w-full mx-auto px-5 pt-[150px] pb-[180px] flex justify-center">
		<div class="w-full max-w-[567px] transition-[opacity,filter,transform] duration-copy ease-copy"
			class:opacity-0={!isMounted}
			class:blur-sm={!isMounted}
			class:translate-y-[6px]={!isMounted}
			class:opacity-100={isMounted}
			class:blur-none={isMounted}
			class:translate-y-0={isMounted}
		>
			{#each sections as section, index (section.title)}
				<section class="coc-section"
					class:animate-stagger-in={isMounted && index === 0}
					class:animate-stagger-in-delayed={isMounted && index === 1}
					class:opacity-0={!isMounted}
				>
					<h1 class="font-exposure text-[40.903px] font-regular leading-[1.18] text-primary-black m-0">
						{section.title}
					</h1>

					<div class="mt-[26px]">
						{#each section.blocks as block, blockIndex (blockIndex)}
							<div class="flex items-stretch gap-[34px] first:mt-0 mt-[26px]">
								<div class="w-px flex-shrink-0 self-stretch bg-primary-black"></div>

								<div class="flex-1 font-sfreg text-xl font-semibold leading-normal text-[#101a21]">
									{#if isParagraphBlock(block)}
										{#each block as paragraph (paragraph)}
												<p class="m-0">{paragraph}</p>

										{/each}
									{:else}
										{#if block.title}
											<p class="m-0">{block.title}</p>
										{/if}
										{#if block.intro}
											<p class="m-0">{block.intro}</p>
										{/if}
										<ul class="m-0 pl-[30px] list-disc">
											{#each block.items as item, itemIndex (itemIndex)}
												{#if typeof item === 'string'}
													<li>{item}</li>
												{:else}
													<li>
														{item.text}
														<ul class="pl-[30px] list-disc">
															{#each item.children as child (child)}
																<li>{child}</li>
															{/each}
														</ul>
													</li>
												{/if}
											{/each}
										</ul>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</main>
</div>

<style>
	.coc-section + .coc-section {
		@apply mt-[80px];
	}

	:global(#coc-page)::selection,
	#coc-page ::selection {
		background-color: #141417;
		color: #f9b200;
	}

	:global(#coc-page)::-moz-selection,
	#coc-page ::-moz-selection {
		background-color: #141417;
		color: #f9b200;
	}
	#coc-page {
		--top-blur-height: 153px;   /* bigger = fade reaches further down into content */
		--bottom-blur-height: 153px; /* bigger = fade reaches further up into content */
		--top-blur-overshoot: 40px;  /* pushes the top edge above the viewport, so it "starts higher" than y=0 */
		--bottom-blur-overshoot: 40px; /* pushes the bottom edge below the viewport */
	}
</style>