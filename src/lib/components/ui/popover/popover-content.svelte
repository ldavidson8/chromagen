<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/cn';
	import { flyAndScale } from '$lib/utils/transitions';

	type $$Props = PopoverPrimitive.ContentProps;
	let className: $$Props['class'] = undefined;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = undefined;
	export { className as class };
</script>

<PopoverPrimitive.Content
	{transition}
	{transitionConfig}
	class={cn(
		'bg-gray-1 text-gray-11 z-50 w-72 rounded-md border p-4 shadow-md outline-none',
		className
	)}
	{...$$restProps}
>
	<slot />
</PopoverPrimitive.Content>
