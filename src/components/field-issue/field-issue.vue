<template>
	<div
		class="field-issue"
		:class="{
			'is-required': issue.required,
		}"
	>
		<ul>
			<FieldCheckbox
				:name="issue.id + '-active'"
				:value="issue.active"
				@onChange="handleChange"
			>
				{{ issue.label }} <span v-if="!isCurator">{{ type }}</span>
			</FieldCheckbox>

			<FieldCheckbox
				v-if="isCurator"
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
		...mapGetters('account', ['userRoleWeight']),
		type() {
			return this.issue.required ? 'Required' : 'Recommended'
		},
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
			const issueKey = e.target.name.split('-').at(-1);
			const issueValue = e.target.checked;

			console.log(e.target.name);

			this.$emit('change', issueID, issueKey, issueValue);
		}
	}
};
</script>
