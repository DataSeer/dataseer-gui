<template>
	<div
		class="widget-logs"
		:class="{'is-opened': isOpened}"
	>
		<div class="widget__head">
			<h6>Recent Changes</h6>

			<button
				v-if="this.logsLength > 10"
				type="button"
				@click="() => this.isOpened = !this.isOpened"
			>
				{{buttonLabel}}
			</button>
		</div> <!-- /.widget__head -->

		<div v-if="logs.length" class="widget__rows">
			<div
				v-for="log in parsedLogs"
				:key="log.id"
				class="widget__row"
			>
				<div class="widget__col">
					{{log.email}}
				</div> <!-- /.widget__col -->
				
				<div class="widget__col">
					{{log.kind}}
				</div> <!-- /.widget__col -->
				
				<div class="widget__col">
					{{formatDate(log.date)}}
				</div> <!-- /.widget__col -->
			</div> <!-- /.widget__row -->
		</div> <!-- /.widget__rows -->
	</div>
</template>

<script>
/**
 * External Dependencies
 */

import { format } from 'date-fns' 

export default {
	/**
	 * Name
	 */
	name: 'WidgetLogs',
	
	/**
	 * Props
	 */
	props: {
		title: {
			type: String,
			default: ''
		},
		logs: {
			type: Array,
			default: () => []
		},
	},

	/**
	 * Data
	 */
	data() {
		return {
			isOpened: false
		}
	},

	/**
	 * Computed
	 */
	computed: {
		buttonLabel() {
			return this.isOpened ? "Show Less" : "Show All"
		},
		logsLength() {
			return this.parsedLogs.length
		},
		parsedLogs() {
			let tempLogs = [];
						
			this.logs.map(log => {
				log.dates.map(date => {
					tempLogs.push({
						id: `${log._id}-${date}`,
						email: log.account.username,
						kind: log.kind.key,
						date: date
				})})
			})

			tempLogs.sort(function compare(a, b) {
				var dateA = new Date(a.date);
				var dateB = new Date(b.date);
				return dateB - dateA;
			});

			return tempLogs
		}
	},

	/**
	 * Methods
	 */
	methods: {
		formatDate(value) {
			return format(new Date(value), 'Ppp');
		},
	},
}
	
</script>
