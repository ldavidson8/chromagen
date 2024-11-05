<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Select as SelectPrimitive } from 'bits-ui';

	type $$Props = SelectPrimitive.SeparatorProps;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Separator
	class={cn('bg-gray-3 -mx-1 my-1 h-px', className)}
	{...$$restProps}
/>
