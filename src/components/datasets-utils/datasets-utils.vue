<template>
	<ul class="datasets-utils">
		<li>
			<button
				href="#"
				v-tooltip.right="mergeText"
				tabindex="0"
				:aria-label="mergeText"
				@click.prevent="$emit('mergeButtonClick')"
			>
				<Icon name="merge" />
			</button>
		</li>

		<li>
			<button
				href="#"
				v-tooltip.right="addText"
				tabindex="0"
				:aria-label="addText"
				@click.prevent="$emit('addButtonClick')"
			>
				<Icon name="add" />
			</button>
		</li>
	</ul>
	<!-- /.datasets-utils -->
</template>

<script>
import Icon from '@/components/icon/icon.vue';

export default {
	name: 'DatasetsUtils',

	components: {
		Icon
	},

	data: function() {
		return {
			mergeText: 'Merge existing datasets',
			addText: 'Add New Dataset'
		};
	}
};
</script>
