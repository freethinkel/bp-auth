import {
	fade,
	type FadeParams,
	type FlyParams,
	type SlideParams,
	type TransitionConfig
} from 'svelte/transition';

const media = globalThis.window
	? window.matchMedia('(prefers-reduced-motion: reduce)')
	: { matches: false };

export const transitionWithPrefersReducedMotion = (
	node: HTMLElement,
	options: {
		fn: (node: HTMLElement, options: SlideParams | FadeParams | FlyParams) => TransitionConfig;
	} & (SlideParams | FadeParams)
): TransitionConfig => {
	if (media.matches) {
		return fade(node, {
			delay: 0
		});
	}

	return options.fn(node, options);
};
