<template>
	<ul class="dropdown__nav-datasets">
		<li v-for="dataset in datasets" :key="dataset.id">
			<button
				:class="{
					'is-active': dataset.id === activeDatasetId
				}"
				@click.prevent="$emit('dropdownButtonClick', dataset);"
			>
				<Icon :name="icons[dataset.datasetType]" color="currentColor" width="19" height="21" />

				<span>{{ dataset.name ? dataset.name  : dataset.id }}</span>

				<Icon v-if="dataset.id === activeDatasetId" name="check" :color="cssVariables.base" />
			</button>
		</li>
	</ul>
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

