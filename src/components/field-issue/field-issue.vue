<template>
	<div class="field-issue">
		<FieldCheckbox :name="issue.id + '-completed'" :value="issue.completed" @onChange="handleChange">Organization Is Active</FieldCheckbox>

		<!-- <FieldCheckbox name="required" :value="required" isToggle>Required</FieldCheckbox> -->
	</div>
	<!-- /.field-issue -->
</template>

<script>
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

export default {
	/**
	 * Name
	 */
	name: 'FieldIssue',

	/**
	 * Components
	 */
	components: {
		FieldCheckbox
	},

	/**
	 * Props
	 */
	props: {
		issue: {
			type: Object
		}
	},

	/**
	 * data
	 */
	data() {
		return {
			issueId: this.issue.id
		};
	},

	/**
	 * Methods
	 */
	methods: {
		handleChange(e) {
			const issueID = this.issueId;
			const issueKey = e.target.name.split('-').at(-1);
			const issueValue = e.target.checked;

			this.$emit('change', issueID, issueKey, issueValue);
		}
	}
};
</script>
