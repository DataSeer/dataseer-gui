<template>
	<FormCuratorIssues v-if="userRoleWeight >= 1000" />
	
	<FormDefaultIssues v-else />
</template>

<script>
/**
 * External dependencies
 */
import { mapGetters } from "vuex";

/**
 * Internal dependencies
 */
import FormDefaultIssues from '@/blocks/form-issues/form-default-issues';
import FormCuratorIssues from '@/blocks/form-issues/form-curator-issues';
export default {
	/**
	 * Name
	 */
	name: 'FormIssues',
	
	components: {
		FormCuratorIssues,
		FormDefaultIssues
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('account', ['userRoleWeight']),
	},
};
</script>
