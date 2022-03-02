<template>
	<Main>
		<FormAddAccount />
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Main from '@/components/main/main';
import FormAddAccount from '@/blocks/form-add-account/form-add-account';

export default {
	/**
	 * Name
	 */
	name: 'AddAccount',

	/**
	 * Components
	 */
	components: {
		Main,
		FormAddAccount
	},
}
</script>
