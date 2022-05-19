<template>
	<div class="report-suggestions">
		<div class="report__head">
			<h4 v-if="title" class="report__title">{{ title }}</h4>

			<Button tabindex="0" className="tertiary" size="small" @onClick="copyToClip()">
				<Icon name="documents" color="currentColor" />

				{{ buttonText }}
			</Button>
		</div> <!-- /.report__head -->

		<div v-if="datasetsInfos" class="report__entries" ref="source">
			<ul class="report__entry report__entry--datasets" v-if="datasetsInfos.datasets.length">
				<li v-for="entry in datasetsInfos.datasets" :key="entry.id">
					<h6>{{ entry.name ? entry.name : entry.id }} | {{ entry.dataType }}</h6>

					<a :href="entry.DOI" target="_blank">{{ entry.DOI }}</a>
				</li>
			</ul>

			<ul class="report__entry report__entry--codes" v-if="datasetsCodes.length">
			
				<li v-for="entry in datasetsCodes" :key="entry.id">
					<h6>{{ entry.name ? entry.name : entry.id }} | {{ entry.subType }}</h6>

					<a :href="entry.DOI" target="_blank">{{ entry.DOI ? entry.DOI : entry.RRID }}</a>
				</li>
			</ul>

			<ul class="report__entry report__entry--reagents" v-if="datasetsInfos.reagents.length">
				<li v-for="entry in datasetsInfos.reagents" :key="entry.id">
					<h6>{{ entry.name ? entry.name : entry.id }} | {{ entry.subType }}</h6>

					<a :href="entry.DOI" target="_blank">{{ entry.RRID }}</a>
				</li>
			</ul>

			<ul class="report__entry report__entry--protocols" v-if="datasetsInfos.protocols.length">
				<li v-for="entry in datasetsInfos.protocols" :key="entry.id">
					<h6>{{ entry.name ? entry.name : entry.id }} | {{ entry.dataType }}</h6>

					<a :href="entry.DOI" target="_blank">{{ entry.DOI }}</a>
				</li>
			</ul>
		</div> <!-- /.report__entries -->
	</div> <!-- /.report-suggestions -->
</template>

<script>
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';

export default {
	/**
	 * Name
	 */
	name: 'ReportSuggestions',

	/**
	 * Props
	 */
	props: {
		title: String,
		datasetsInfos: Object
	},

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
	data: function() {
		return {
			buttonText: 'Copy To Clipboard'
		};
	},

	/**
	 * Computed
	 */
	computed: {
		datasetsCodes() {
			return [...this.datasetsInfos.codes, ...this.datasetsInfos.softwares];
		}
	},

	/**
	 * Methods
	 */
	methods: {
		copyToClip() {
			const str = this.$refs.source.innerHTML;

			function listener(e) {
				e.clipboardData.setData('text/html', str);
				e.clipboardData.setData('text/plain', str);
				e.preventDefault();
			}
			document.addEventListener('copy', listener);
			document.execCommand('copy');
			document.removeEventListener('copy', listener);

			this.buttonText = 'Copied';

			setTimeout(() => {
				this.buttonText = 'Copy To Clipboard';
			}, 5000);
		}
	}
};
</script>
