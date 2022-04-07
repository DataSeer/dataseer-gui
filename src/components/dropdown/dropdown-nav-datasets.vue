<template>
	<div class="dropdown__nav dropdown__nav--datasets">
		<ul>
			<li v-for="dataset in datasets" :key="dataset.id">
				<button @click.prevent="$emit('dropdownButtonClick', dataset);">
					<Icon :name="icons[dataset.datasetType]" color="currentColor" width="19" height="21" />

					{{ dataset.name ? dataset.name  : dataset.id }}

					<Icon v-if="dataset.id === activeDatasetId" name="check" :color="cssVariables.base" />
				</button>
			</li>
		</ul>
	</div><!-- /.dropdown-datasets -->
</template>

<script>
	/**
	 * External Dependencies
	 */
	import { mapGetters } from 'vuex'
	
	/**
	 * Internal Dependencies
	 */
	import variables from '@/assets/scss/generic/_variables.scss'
	import Icon from '@/components/icon/icon'
	
	export default {
		/**
		 * Name
		 */
		name: "DropdownNavDatasets",

		components: {
			Icon,
		},

		/**
		 * props
		 */
		props: {
			datasets: {
				type: Array,
				default: () => []
			},
		},

		data() {
			return {
				icons: {
					dataset: 'datasets',
					code: 'brackets',
					material: 'flask',
					protocol: 'protocols'
				}
			}
		},

		computed: {
			...mapGetters('pdfViewer', [
				'activeDatasetId'
			]),
			cssVariables() {
				return variables
			},
		},
	}
</script>

