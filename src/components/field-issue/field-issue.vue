<template>
	<div
		class="field-issue"
		:class="{
			'is-required': issue.required,
		}"
	>
		<ul>
			<FieldCheckbox
				:name="issue.id + '-completed'"
				:value="issue.completed"
				@onChange="handleChange"
			>
				{{ issue.label }} <span v-if="!getCurator">{{ type }}</span>
			</FieldCheckbox>

			<FieldCheckbox
				v-if="getCurator"
				:name="`${issue.id}-required`"
				:value="issue.required"
				isToggle
				@onChange="handleChange"
			>
				{{ type }}
			</FieldCheckbox>
		</ul>
	</div>
	<!-- /.field-issue -->
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
		...mapGetters(['getCurator']),
		type() {
			return this.issue.required ? 'Required' : 'Recommended'
		}
	},
	

	/**
	 * Methods
	 */
	methods: {
		handleChange(e) {
			const issueID = this.issue.id;
			const issueKey = e.target.name.split('-').at(-1);
			const issueValue = e.target.checked;

			this.$emit('change', issueID, issueKey, issueValue);
		}
	}
};
</script>
