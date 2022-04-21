<template>
	<div
		ref="resizer"
		class="resizer"
		:class="{
			[`resizer--${modifier}`]: modifier
		}"
	>
		<div
			ref="container"
			class="resizer__container"
			:style="{
				width: `${initialW}px`
			}"
		>
			<slot name="resizerContainer" />
		</div><!-- /.resizer__container -->
		
		<div ref="rest" class="resizer__rest">
			<div ref="bar" class="resizer__bar" />
			
			<slot />
		</div><!-- /.resizer__rest -->
	</div><!-- /.resizer -->
</template>

<script>
/* eslint-disable */
import { debounce } from '@/utils/use-debounce'
export default {
	/**
	 * Name
	 */
	name: "Resizer",

	/**
	 * Props
	 */
	props: {
		modifier: {
			type: String,
			default: ''
		},
		initialW: {
			type: Number,
			default: 0
		},
		minW: {
			type: Number,
			default: 0
		},
		maxW: {
			type: Number,
			default: 100
		}
	},

	/**
	 * Methods
	 */
	methods: {
		initialize() {
			const bar = this.$refs.bar;
			const leftSide = this.$refs.container;
			const restSide = this.$refs.rest;

			let x = 0;
			let y = 0;
			let minW = this.minW;
			let maxW = this.maxW;
			let leftWidth = this.InitialW || 0;
			leftSide.style.width = `${this.InitialW}px`;
			
			const mouseDownHandler = (e) => {
				// Get the current mouse position
				x = e.clientX;
				y = e.clientY;
				leftWidth = leftSide.getBoundingClientRect().width;

				// Attach the listeners to `document`
				document.addEventListener('mousemove', mouseMoveHandler);
				document.addEventListener('mouseup', mouseUpHandler);
			};
			
			bar.addEventListener('mousedown', mouseDownHandler);

			const debouncedEmitResizeFunction = debounce(() => {
				this.$emit('resize')
			}, 400);

			const mouseMoveHandler = (e) => {
				// How far the mouse has been moved
				document.body.style.cursor = 'col-resize';
				const dx = e.clientX - x;
				const parent = leftSide.parentNode.getBoundingClientRect().width;
				const newLeftWidth = leftWidth + dx;

				const newLeftWidthPercent = ((newLeftWidth / parent) * 100).toFixed(2);
				const RestWidthPercent = 100  - newLeftWidthPercent;
				const maxWPercent = ((maxW / parent) * 100).toFixed(2);
				const minWPercent = ((minW / parent) * 100).toFixed(2);
				
				// Set calculated widths in percentages
				if (newLeftWidth > maxW) {
					leftSide.style.width = `${maxWPercent}%`;
					restSide.style.width = `${100 - maxWPercent}%`;
				} else if (newLeftWidth < minW) {
					leftSide.style.width = `${minWPercent}%`;
					restSide.style.width = `${100 - minWPercent}%`;
				} else {
					leftSide.style.width = `${newLeftWidthPercent}%`;
					restSide.style.width = `${RestWidthPercent}%`;
				}

				debouncedEmitResizeFunction();
			};

			const mouseUpHandler = () => {
				bar.style.removeProperty('cursor');
				document.body.style.removeProperty('cursor');

				leftSide.style.removeProperty('user-select');
				leftSide.style.removeProperty('pointer-events');

				restSide.style.removeProperty('user-select');
				restSide.style.removeProperty('pointer-events');

				// Remove the handlers of `mousemove` and `mouseup`
				document.removeEventListener('mousemove', mouseMoveHandler);
				document.removeEventListener('mouseup', mouseUpHandler);
			};
		}
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.initialize();
	}
}
</script>
