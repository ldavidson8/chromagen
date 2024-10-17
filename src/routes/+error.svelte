<script>
	import { onMount } from 'svelte';

	let colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA'];
	let currentColor = colors[0];

	function changeColor() {
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		currentColor = randomColor;
	}

	onMount(() => {
		setInterval(changeColor, 2000);
	});
</script>

<div class="min-h-screen flex items-center justify-center px-4">
	<div class="max-w-lg w-full text-center">
		<h1
			class="text-9xl font-extrabold"
			style="color: {currentColor}; transition: color 0.5s ease-in-out;"
		>
			404
		</h1>
		<p class="mt-4 text-2xl font-bold text-neutral-200">Color Not Found</p>
		<p class="mt-2 text-neutral-300">
			Oops! It seems we've lost this color in the spectrum.
		</p>

		<div class="mt-8">
			<button
				on:click={changeColor}
				class="px-6 py-3 bg-neutral-800 text-white font-semibold rounded-full hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50 transition-colors duration-200"
			>
				Generate New Color
			</button>
		</div>

		<div class="mt-4">
			<a
				href="/"
				class="text-neutral-300 hover:text-neutral-200 transition-colors duration-200"
			>
				Go back home
			</a>
		</div>

		<div class="mt-8 flex justify-center space-x-2">
			{#each colors as color}
				<button
					type="button"
					class="w-8 h-8 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110"
					style="background-color: {color};"
					on:click={() => (currentColor = color)}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							currentColor = color;
						}
					}}
					aria-label="Select color"
				></button>
			{/each}
		</div>
	</div>
</div>
