<template>
	<div
		ref="resizer"
		class="resizer"
		:class="{
			[`resizer--${modifier}`]: modifier
		}"
	>
		<div ref="container" class="resizer__container" >
			<slot name="resizerContainer" />
		</div><!-- /.resizer__container -->
		
		<div ref="right" class="resizer__rest">
			<div ref="bar" class="resizer__bar" />
			
			<slot />
		</div><!-- /.resizer__rest -->
	</div><!-- /.resizer -->
</template>

<script>

/**
 * Internal Dependencies
 */
import { debounce } from '@/utils/use-debounce'
import { clearDropdowns } from '@/utils/use-dropdowns';

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
		startingWidth: {
			type: Number,
			default: 0
		},
		minWidth: {
			type: Number,
			default: 0
		},
		maxWidth: {
			type: Number,
			default: 100
		},
		rightMinWidth: {
			type: Number,
			default: 0
		},
	},

	/**
	 * Data
	 */
	data() {
		return {
			observer: null,
			observerWidth: null,
			xPos: 0
		}
	},

	/**
	 * Methods
	 */
	methods: {
		initialize() {
			const bar = this.$refs.bar;
			const resizer = this.$refs.resizer;
			const leftSide = this.$refs.container;
			const rightSide = this.$refs.right;

			let observerWidth = observerWidth || resizer.getBoundingClientRect().width;
			let minW = this.minWidth;
			let maxW = observerWidth - this.maxWidth <= this.rightMinWidth ? observerWidth - this.rightMinWidth : this.maxWidth;
			let startingWidth = this.startingWidth < this.maxWidth ? this.startingWidth : this.maxWidth;
			leftSide.style.width = `${((startingWidth / observerWidth) * 100).toFixed(2)}%`;
			rightSide.style.width = `${(((observerWidth - startingWidth) / observerWidth ) * 100).toFixed(2)}%`;

			const mouseDownHandler = (e) => {
				// Get the current mouse position
				this.xPos = e.clientX;
				startingWidth = leftSide.getBoundingClientRect().width;
				observerWidth = observerWidth || resizer.getBoundingClientRect().width;

				// Attach the listeners to `document`
				document.addEventListener('mousemove', mouseMoveHandler);
				document.addEventListener('mouseup', mouseUpHandler);

				// Clear any dropdowns that might be open
				clearDropdowns();
			};
			
			bar.addEventListener('mousedown', mouseDownHandler);

			//Emit drag event with small debounce
			const debouncedEmitResizeFunction = debounce(() => {
				this.$emit('drag')
			}, 400);

			const mouseMoveHandler = (e) => {
				document.body.style.cursor = 'col-resize';
				
				// How far the mouse has been moved
				const dx = e.clientX - this.xPos;
				const newLeftWidth = startingWidth + dx;

				const newLeftWidthPercent = ((newLeftWidth / observerWidth) * 100).toFixed(2);
				const RestWidthPercent = 100 - newLeftWidthPercent;

				
				// Change values into percentages
				const maxWPercent = ((maxW / observerWidth) * 100).toFixed(2);
				const minWPercent = ((minW / observerWidth) * 100).toFixed(2);
				
				// Set calculated widths in percentages for the left side
				if (newLeftWidth > maxW) {
					leftSide.style.width = `${maxWPercent}%`;
					rightSide.style.width = `${100 - maxWPercent}%`;
				} else if (newLeftWidth < minW) {
					leftSide.style.width = `${minWPercent}%`;
					rightSide.style.width = `${100 - minWPercent}%`;
				} else {
					leftSide.style.width = `${newLeftWidthPercent}%`;
					rightSide.style.width = `${RestWidthPercent}%`;
				}

				debouncedEmitResizeFunction();
			};

			const mouseUpHandler = () => {
				bar.style.removeProperty('cursor');
				document.body.style.removeProperty('cursor');

				leftSide.style.removeProperty('user-select');
				leftSide.style.removeProperty('pointer-events');

				rightSide.style.removeProperty('user-select');
				rightSide.style.removeProperty('pointer-events');

				// Remove the handlers of `mousemove` and `mouseup`
				document.removeEventListener('mousemove', mouseMoveHandler);
				document.removeEventListener('mouseup', mouseUpHandler);
			};
		},
		initResizerObserver() {
			const vm = this;
			const resizer = this.$refs.resizer;

			vm.observer = new ResizeObserver(() => {
				this.observerWidth = resizer.getBoundingClientRect().width
			}).observe(resizer);
		}
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.initialize();
		this.initResizerObserver();
	},
	
	/**
	 * Before Destroy
	 */
	beforeDestroy () {
		if (this.parentObserver) this.parentObserver.disconnect();
	},
}
</script>
