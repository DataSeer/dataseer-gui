<template>
	<div class="pdf-holder">
		<div id="documentView">
			<div id="documentView.screen">
				<div
					id="documentView.screen.container"
					class="documentView"
				>
					<div v-show="!isXmlVisible" id="pdf" />
					
					<div v-show="isXmlVisible" id="xml" />
				</div>
			</div> <!-- /#documentView.screen -->
		</div> <!-- /#documentView -->

		<Button
			size="small"
			className="tertiary"
			modifier="pdf-holder__button"
			@onClick.prevent="toggleDocumentView"
		>
			<Icon name="document" />
			
			<Icon name="letter" color="#9D9D9D" />
		</Button>
	</div> <!-- /.pdf-holder -->
</template>

<script	>
	import Icon from '@/components/icon/icon'
	import Button from '@/components/button/button'
	
	export default {
		/**
		 * Name
		 */
		name: 'PDF',

		/**
		 * Components
		 */
		components: {
			Icon,
			Button
		},

		/**
		 * Data
		 */
		data() {
			return {
				isXmlVisible: false
			}
		},

		/**
		 * Data
		 */
		methods: {
			toggleDocumentView() {
				this.isXmlVisible = !this.isXmlVisible	
			}
		},
	};
</script>
