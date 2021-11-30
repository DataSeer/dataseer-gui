<template>
	<Main>
		<FormNewDocument />

		<template #right>
			<Banner>
				<template #image>
					<img src="@/assets/images/form-img-3@2x.png" alt="Example Image Title" />
				</template>

				<h4>DataSeer is powered by Machine Learning, which means it’s always improving.</h4>

				<p>
					By uploading your article and telling it about the things it gets right and gets wrong about your datasets, you’re training DataSeer to
					improve.
				</p>
			</Banner>
		</template>
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Main from '@/components/main/main';
import Banner from '@/components/banner/banner';
import FormNewDocument from '@/blocks/form-new-document/form-new-document';

export default {
	/**
	 * Name
	 */
	name: 'NewDocument',

	/**
	 * Components
	 */
	components: {
		Main,
		Banner,
		FormNewDocument
	}
};
</script>
