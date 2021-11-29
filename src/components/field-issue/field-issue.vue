<template>
	<div
		class="field-issue"
		:class="{
			'is-curator': isCurator,
			'is-required': issue.type === 'required',
			'is-recommended': issue.type === 'recommended'
		}"
	>
		<ul>
			<FieldCheckbox
				:name="issue.id + '-completed'"
				:value="issue.completed"
				@onChange="handleChange"
			>
				{{ issue.label }} <span v-if="issue.type && !isCurator">({{ issue.type }})</span>
			</FieldCheckbox>

			<FieldCheckbox
				v-if="isCurator && issue.type"
				:name="`${issue.id}-${issue.type}`"
				:value="issue[issue.type]"
				isToggle
				@onChange="handleChange"
			>
				{{ issue.type }}
			</FieldCheckbox>
		</ul>
	</div>
	<!-- /.field-issue -->
</template>

<script>
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
		},
		isCurator: {
			type: Boolean,
			value: false
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
