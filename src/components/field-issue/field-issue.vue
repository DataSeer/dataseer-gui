<template>
	<div
		class="field-issue"
		:class="{
			'is-required': issue.required,
		}"
	>
		<ul>
			<FieldCheckbox
				:name="issue.id"
				:value="isCurator ? issue.active : issue.completed"
				@onChange="handleChange"
			>
				{{ issue.label }}
			</FieldCheckbox>
		</ul>
	</div> <!-- /.field-issue -->
</template>

<script>
/**
 * External Dependencies
 */
import { mapGetters } from 'vuex'

/**
 * Internal Dependencies
 */
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
	 * Computed
	 */
	computed: {
		...mapGetters('account', ['userRoleWeight']),
		isCurator() {
			return this.userRoleWeight >= 1000
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleChange(e) {
			const issueID = this.issue.id;
			const issueKey = this.isCurator ? 'active' : 'completed';
			const issueValue =  e.target.checked;

			this.$emit('change', issueID, issueKey, issueValue);
		}
	}
};
</script>
