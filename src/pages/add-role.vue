<template>
	<Main>
		<FormAddRole />
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Main from '@/components/main/main';
import FormAddRole from '@/blocks/form-add-role/form-add-role';

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
		FormAddRole
	},
}
</script>
