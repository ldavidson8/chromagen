<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { onMount } from 'svelte';
	import { hsl, formatHex } from 'culori';

	type ColorSpace = { value: 'hex' | 'hsl'; label: string };

	let selected: ColorSpace = {
		value: 'hex',
		label: 'HEX',
	};

	let currentColor = '#FFFFFF';
	let hue = 0;
	let saturation = 100;
	let lightness = 100;

	let colorArea: HTMLDivElement;
	let isDragging = false;

	function updateColor(h: number, s: number, l: number) {
		const color = hsl({
			h,
			s: s / 100,
			l: l / 100,
			mode: 'hsl',
		});
		currentColor = formatHex(color).toUpperCase();
	}

	function handleColorAreaInteraction(event: MouseEvent | TouchEvent) {
		if (!colorArea) return;

		const rect = colorArea.getBoundingClientRect();
		const clientX =
			'touches' in event ? event.touches[0].clientX : event.clientX;
		const clientY =
			'touches' in event ? event.touches[0].clientY : event.clientY;

		// Calculate x and y as percentages (0 to 1)
		const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
		const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

		// x controls saturation: 0 = unsaturated, 1 = fully saturated
		saturation = Math.round(x * 100);

		// y controls lightness: top = 100%, bottom = 0%
		lightness = Math.round(100 - y * 100);

		updateColor(hue, saturation, lightness);
	}

	function startDragging(event: MouseEvent | TouchEvent) {
		isDragging = true;
		handleColorAreaInteraction(event);
	}

	function stopDragging() {
		isDragging = false;
	}

	function handleDrag(event: MouseEvent | TouchEvent) {
		if (isDragging) {
			handleColorAreaInteraction(event);
		}
	}

	function handleHueChange(event: Event) {
		const input = event.target as HTMLInputElement;
		hue = Number(input.value);
		updateColor(hue, saturation, lightness);
	}

	function handleHexInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const color = hsl(input.value);
		if (color) {
			hue = color.h || 0;
			saturation = Math.round((color.s || 0) * 100);
			lightness = Math.round((color.l || 0) * 100);
			currentColor = input.value.toUpperCase();
		}
	}

	onMount(() => {
		updateColor(hue, saturation, lightness);
	});
</script>

<div class="flex items-center gap-4">
	<!-- Color Preview Circle -->
	<Popover.Root portal={null}>
		<Popover.Trigger>
			<button
				class="w-10 h-10 rounded-full cursor-pointer border border-gray-3"
				style:background-color={currentColor}
			></button>
		</Popover.Trigger>

		<Popover.Content>
			<div class="w-64 bg-white rounded-lg shadow-lg p-4">
				<!-- Color Area -->
				<div
					class="relative w-full aspect-[4/3] rounded-lg mb-4 overflow-hidden"
				>
					<div
						bind:this={colorArea}
						class="absolute inset-0 cursor-crosshair"
						style="background: linear-gradient(to right, white, {formatHex(
							hsl({ h: hue, s: 1, l: 0.5, mode: 'hsl' })
						)}), linear-gradient(to bottom, rgba(0, 0, 0, 0), black)"
						on:mousedown={startDragging}
						on:touchstart|preventDefault={startDragging}
						on:mousemove={handleDrag}
						on:touchmove|preventDefault={handleDrag}
						role="slider"
						tabindex="0"
						aria-valuemin="0"
						aria-valuemax="100"
						aria-valuenow={saturation}
						aria-label="Color picker"
					>
						<div
							class="absolute inset-0"
							style="background: linear-gradient(to bottom, transparent, black)"
						/>

						<!-- Color Picker Thumb -->
						<div
							class="absolute w-4 h-4 -translate-x-2 -translate-y-2 border-2 border-white rounded-full shadow-lg"
							style:left="{saturation}%"
							style:top="{100 - lightness}%"
							style:background-color={currentColor}
						/>
					</div>
				</div>

				<div
					class="relative w-full h-4 rounded-full mb-4 overflow-hidden"
					style="background: linear-gradient(to right, #c6176a,#c72a33,#af500f,#97630e,#826e10,#677914,#358337,#1c8264,#14807d,#117c92,#1077ad,#3064e1,#7144ed,#9e25d3,#b915a0,#c6176a);"
				>
					<input
						type="range"
						min="0"
						max="360"
						bind:value={hue}
						on:input={handleHueChange}
						class="w-full appearance-none bg-transparent"
					/>
				</div>

				<!-- Color Input -->
				<div class="relative">
					<input
						type="text"
						bind:value={currentColor}
						on:input={handleHexInput}
						class="w-full px-3 py-2 border border-gray-3 bg-gray-1 text-gray-12 rounded-md"
						pattern="^#[0-9A-Fa-f]{6}$"
					/>
				</div>
			</div>
		</Popover.Content>
	</Popover.Root>

	<Select.Root bind:selected>
		<Select.Trigger class="px-3 py-1 border border-gray-3 rounded-md">
			<Select.Value placeholder="Select color space" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Item value="hex">HEX</Select.Item>
				<Select.Item value="hsl">HSL</Select.Item>
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>

<svelte:window
	on:mouseup={stopDragging}
	on:touchend={stopDragging}
	on:touchcancel={stopDragging}
/>

<style>
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 6px;
		height: 18px;
		background: #fff;
		border-radius: 3px;
		cursor: pointer;
	}

	input[type='range']::-moz-range-thumb {
		width: 6px;
		height: 18px;
		background: #fff;
		border-radius: 3px;
		cursor: pointer;
		border: none;
	}
</style>
