<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { cva, type VariantProps } from 'class-variance-authority';

	export let href: string;
	export let rel = undefined;
	export let target = undefined;
	export let variant: VariantProps<typeof style>['variant'] = 'default';

	const style = cva('flex items-center text-sm font-medium', {
		variants: {
			variant: {
				default:
					'opacity-80 hover:opacity-100 px-7 transition-opacity whitespace-nowrap',
				button:
					'h-9 w-fit px-5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors',
				outline:
					'h-9 w-fit px-5 rounded-lg shadow-border hover:bg-gray-3 transition-colors',
			},
		},
	});

	let className: string;
	$: className = cn(style({ variant }), className);
</script>

<a {href} {rel} {target} class={className} {...$$restProps}>
	<slot />
</a>
