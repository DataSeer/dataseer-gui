<template>
	<div class="field-issue">
		<ul>
			<FieldCheckbox :name="issue.id + '-completed'" :value="issue.completed" @onChange="handleChange">
				{{ issue.label }} <span v-if="issue.type">({{ issue.type }})</span>
			</FieldCheckbox>

			<FieldCheckbox
				v-if="issue.type === 'required'"
				className="is-required"
				:name="`${issue.id}-required`"
				:value="issue.required"
				isToggle
				@onChange="handleChange"
			>
				Required
			</FieldCheckbox>

			<FieldCheckbox
				v-if="issue.type === 'recommended'"
				className="is-recommended"
				:name="`${issue.id}-recommended`"
				:value="issue.recommended"
				isToggle
				@onChange="handleChange"
			>
				Recommended
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
