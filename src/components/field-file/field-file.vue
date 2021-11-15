<template>
	<div class="field field--upload" :class="{ 'has-error': error }">
		<label :for="name" class="field__label">
			<slot name="label" />
		</label>

		<div tabindex="0" class="field__input">
			<input ref="file" type="file" :id="name" :name="name" :value="file" :accept="accept" :multiple="multiple" @change="onChange" />

			<label :for="name">
				<span class="btn btn--secondary">Choose File</span>
			</label>

			<p class="field__text">{{ text }}</p>

			<a href="#" v-if="file" @click.prevent="onClear" class="field__clear"></a>
		</div>
		<!-- /.field__input -->

		<div class="field__helptext">
			<slot name="helptext" />
		</div>
		<!-- /.field__helptext -->
	</div>
	<!-- /.form__row -->
</template>

<script>
export default {
	name: 'FormFile',

	props: ['file', 'name', 'text', 'error', 'accept', 'multiple'],

	methods: {
		onChange(event) {
			this.$emit('onChange', event);
		},
		onClear() {
			this.$emit('onClear', this.name);
		}
	}
};
</script>
