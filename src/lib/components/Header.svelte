<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { fly } from 'svelte/transition';
	import NavLink from './NavLink.svelte';
	let y: number;
	let isMobileMenuOpen = false;

	$: scrolled = y > 0;

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}
</script>

<svelte:window bind:scrollY={y} />
<nav
	class={cn(
		'sticky top-0 left-0 z-999 flex transition-all duration-150 ease-ease justify-between items-center h-[72px] gap-6 w-full px-6',
		scrolled ? 'bg-transparent backdrop-blur-[10px] h-[60px]' : ''
	)}
>
	<div class="flex items-center">
		<a href="/" class="text-xl font-bold font-manrope">Chromagen</a>
	</div>
	<div
		class="flex-1 flex items-center lg:justify-end justify-start flex-row-reverse lg:flex-row gap-4"
	>
		<button
			class="flex flex-col lg:hidden relative z-50 transition-all ease-in-out duration-500 h-6"
			on:click={toggleMobileMenu}
			aria-expanded={isMobileMenuOpen}
			aria-controls="mobile-menu"
			><span class="sr-only">Open menu</span>
			<span class={cn('bar', isMobileMenuOpen && 'open')}></span>
		</button>
		<ul
			class="hidden lg:flex lg:flex-1 min-h-11 left-[unset] translate-x-[unset] relative xl:absolute xl:left-1/2 xl:-translate-x-1/2"
		>
			<li class="flex justify-center">
				<NavLink href="/create">Create</NavLink>
			</li>
			<li class="flex justify-center">
				<NavLink href="/colors">Colors</NavLink>
			</li>
			<li class="flex justify-center">
				<NavLink href="/image-extraction">Image Extraction</NavLink>
			</li>
			<li class="flex justify-center">
				<NavLink href="/about">About</NavLink>
			</li>
		</ul>
		<div class="flex gap-2 px-2">
			<NavLink href="/about" variant="outline">Create</NavLink>
			<NavLink href="/about" variant="outline">About</NavLink>
		</div>
	</div>
</nav>

{#if isMobileMenuOpen}
	<nav
		id="mobile-menu"
		class="fixed lg:hidden inset-y-0 right-0 w-full bg-gray-1 backdrop-blur-lg shadow-xl z-40 flex flex-col pt-16"
		transition:fly={{ x: 50, duration: 200 }}
	>
		<ul class="flex flex-col gap-12 pt-24">
			{#each ['Colors', 'Colors', 'Colors', 'Colors', 'Colors'] as item, index}
				<li
					class="flex justify-center opacity-0"
					style:animation="fadeAndFly 0.5s ease-in-out forwards"
					style:animation-delay="{index * 50}ms"
				>
					<a href="/colors" class="text-3xl font-medium text-neutral-200">
						{item}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.bar {
		@apply w-5 flex h-[0.125rem] rounded-sm transition-transform duration-200 ease-in-out bg-gray-12 mt-3;
	}

	.bar::before,
	.bar::after {
		@apply content-[''] absolute w-5 h-[0.125rem] rounded-sm transition-transform duration-200 ease-in-out bg-gray-12;
	}

	.bar::before {
		transform: translateY(-7px);
	}

	.bar::after {
		transform: translateY(7px);
	}

	.bar.open {
		@apply bg-transparent;
	}

	.bar.open::before {
		transform: translateY(0) rotate(45deg);
	}

	.bar.open::after {
		transform: translateY(0) rotate(-45deg);
	}
</style>
