<template>
	<div class="main main--edit">
		<div class="shell">
			<div class="main__inner">
				<div class="main__left">
					<FormManageDocument />
				</div>

				<!-- /.main__left -->
				<div class="main__right"></div>
				<!-- /.main__right -->
			</div>
			<!-- /.main__inner -->
		</div>
		<!-- /.shell -->
	</div>
	<!-- /.main -->
</template>

<script>
/**
 * Internal Dependencies
 */
import FormManageDocument from '@/blocks/form-manage-document/form-manage-document';

export default {
	/**
	 * Name
	 */
	name: 'ManageDocument',

	/**
	 * Components
	 */
	components: {
		FormManageDocument
	}
};
</script>
