<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { flyAndScale } from '$lib/utils/transitions';
	import { Tooltip as TooltipPrimitive } from 'bits-ui';

	type $$Props = TooltipPrimitive.ContentProps;

	let className: $$Props['class'] = undefined;
	export let sideOffset: $$Props['sideOffset'] = 4;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = {
		y: 8,
		duration: 150,
	};
	export { className as class };
</script>

<TooltipPrimitive.Content
	{transition}
	{transitionConfig}
	{sideOffset}
	class={cn(
		'bg-gray-3 text-gray-11 z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md',
		className
	)}
	{...$$restProps}
>
	<slot />
</TooltipPrimitive.Content>
