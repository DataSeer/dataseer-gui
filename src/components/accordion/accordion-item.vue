<template>
	<div class="accordion__item" :class="{ 'is-open': isOpen }">
		<div class="accordion__item-head" @click="open">
			{{ label }}
		</div>
		<!-- /.accordion__item-head -->

		<transition
			name="accordion"
			@enter="start"
			@after-enter="end"
			@before-leave="start"
			@after-leave="end"
		>
			<div class="accordion__item-body" v-show="isOpen">
				<div class="accordion__item-content">
					<slot />
				</div><!-- /.accordion__item-content -->
			</div>
		</transition>
	</div>
	<!-- /.accordion__item -->
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'AccordionItem',

	/**
	 * Props
	 */
	props: {
		label: {
			type: String
		}
	},

	/**
	 * Data
	 */
	data() {
		return {
			isOpen: false
		};
	},

	/**
	 * Methods
	 */
	methods: {
		open() {
			this.isOpen = !this.isOpen;
		},
		start(el) {
			el.style.height = el.scrollHeight + 'px';
		},
		end(el) {
			el.style.height = '';
		}
	}
};
</script>
