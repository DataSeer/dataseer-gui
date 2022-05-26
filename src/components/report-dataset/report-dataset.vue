<template>
	<div :class="{
		[`report-action report-action--${type}`]: true,
		'report-action--error': actionsRequired && !actionsMayBeRequired,
		'report-action--warning': !actionsRequired && actionsMayBeRequired
	}">
		<h6>
			<Icon :name="icon" color="currentColor" />

			{{ title }}
		</h6>

		<ul>
			<li>New <strong>{{newCount}}</strong></li>

			<li>Re-Use <strong>{{reuseCount}}</strong></li>
		</ul>

		<p v-if="actionsRequired && !actionsMayBeRequired">Action Required</p>
		
		<p v-else-if="!actionsRequired && actionsMayBeRequired">Action May Be Required</p>
		
		<p v-else>No Action Required</p>
	</div>
</template>

<script>
	import Icon from '@/components/icon/icon'
	
	export default {
		/**
		 * Name
		 */
		name: 'ReportAction',

		/**
		 * Components
		 */
		components: {
			Icon,
		},

		/**
		 * Props
		 */
		props: {
			title: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			},
			data: {
				type: Array,
				default: () => []
			},
			type: {
				type: String,
				default: 'datasets',
				validator: function(value) {
					// The value must match one of these strings
					return ['datasets', 'code', 'material', 'protocol'].indexOf(value) !== -1;
				}
			}
		},
		
		/**
		 * Computed
		 */
		computed: {
			actionsRequired() {
				return this.data.some(entry => (entry.issue === true));
			},
			actionsMayBeRequired() {
				return this.data.some(entry => entry.flagged === true);
			},
			reuseCount() {
				return this.data.filter(entry => entry.reuse === true).length;
			},
			newCount() {
				return this.data.length - this.reuseCount;
			}
		},
	}
</script>
