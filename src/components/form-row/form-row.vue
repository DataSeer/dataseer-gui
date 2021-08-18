<template>
	<div class="form__row" :class="{'has-error': error}">
		<label :for="name" class="form__label">
			<slot name="label" />
		</label>
		
		<div class="form__controls">
			<slot />
		</div><!-- /.form__controls -->
	</div><!-- /.form__row -->
</template>

<script>
export default {
	name: 'FormRow',
	props: ['error', 'name']
}
</script>
