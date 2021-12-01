<template>
	<div v-if="issues" class="field-issues">
		<p v-if="text">{{ text }}</p>

		<ul>
			<li v-for="issue in issues" :key="issue.id">
				<input
					tabindex="0"
					type="checkbox"
					class="sr-only"
					:name="issue.id + '-active'"
					:id="issue.id + '-active'"
					:value="issue.active"
					:checked="issue.active"
					@change="handleChange"
				/>

				<label :for="issue.id + '-active'">
					{{ issue.label }} <span v-if="issue.type">({{ issue.type }})</span>
				</label>
			</li>
		</ul>
	</div>
	<!-- /.field -->
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'FieldIssues',

	/**
	 * Props
	 */
	props: {
		text: {
			type: String,
			default: ''
		},
		issues: {
			type: Array
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleChange(e) {
			const issueID = e.target.id.split('-')[0];
			const issueKey = e.target.id.split('-')[1];
			const issueValue = e.target.checked;

			this.$emit('change', issueID, issueKey, issueValue);
		}
	}
};
</script>
