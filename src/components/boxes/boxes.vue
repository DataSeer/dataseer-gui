<template>
	<div class="boxes">
		<ul>
			<slot></slot>

			<li>
				<div class="box box--upload">
					<Icon name="document_new" />

					<router-link to="/new-document" class="btn btn--tertiary">Upload new Document</router-link>
				</div><!-- /.box box-/-upload -->
			</li>
		</ul>
	</div><!-- /.boxes -->
</template>

<script>
import Icon from '@/components/icon/icon'

export default {
	/**
	* Name
	*/
	name: 'Boxes',

	/**
	* Components
	*/
	components: {
		Icon
	},
}
</script>
