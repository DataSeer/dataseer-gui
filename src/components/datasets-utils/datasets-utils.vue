<template>
	<ul class="datasets-utils">
		<li>
			<button
				tabindex="0"
				v-tooltip.right="mergeText"
				:aria-label="mergeText"
				@click.prevent="$emit('mergeButtonClick')"
			>
				<Icon name="merge" />
			</button>
		</li>

		<li>
			<button
				tabindex="0"
				v-tooltip.right="addText"
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
