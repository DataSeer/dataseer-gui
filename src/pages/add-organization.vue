<template>
	<Main>
		<FormAddOrganization />
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Main from '@/components/main/main';
import FormAddOrganization from '@/blocks/form-add-organization/form-add-organization';

export default {
	/**
	 * Name
	 */
	name: 'AddOrganization',

	/**
	 * Components
	 */
	components: {
		Main,
		FormAddOrganization
	},
}
</script>
