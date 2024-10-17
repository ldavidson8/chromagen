<script lang="ts">
	import { extractColors } from 'extract-colors';

	let extractedColors: string[] = [];

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files ? target.files[0] : null;

		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = async () => {
			const src = reader.result as string;

			try {
				const colors = await extractColors(src);
				extractedColors = colors.map((color) => color.hex);
			} catch (error) {
				console.error(error);
			}
		};
	}
</script>

<div class="w-full flex items-center justify-center">
	<input type="file" accept="image/*" on:change={handleImageUpload} />
</div>

<div class="flex gap-4 items-center justify-center w-full">
	{#each extractedColors as color}
		<span class="w-8 h-8" style="background-color: {color};"></span>
	{/each}
</div>
