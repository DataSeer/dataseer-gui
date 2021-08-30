<template>
	<div class="form__row" :class="{'has-error': error}">
		<label :for="name" class="form__label">
			<slot />
		</label>
		
		<div class="form__controls">
			<div 
				v-if="options.length"
				class="select"
				:class="{'is-selected': value.length}" 
			>
				<select :id="name" :value="value" @change="handleChange">
					<option disabled value="" v-if="placeholder">{{placeholder}}</option>
					<option
						v-for="(option, index) in options"
						:key="index"
						:value="option"
					>
						{{option}}
					</option>
				</select>
			</div>
			<input 
				v-else
				class="field"
				:tabindex="tabindex"
				:id="name"
				:type="type"
				:value="value"
				:placeholder="placeholder"
				@input="handleChange"
			>
			{{value}}
		</div><!-- /.form__controls -->
	</div><!-- /.form__row -->
</template>

<script>
export default {
	name: 'FormRow',
	props: {
		type: {
			type: String,
			default: 'text'
		},
		error: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ""
		},
		placeholder: {
			type: String,
			default: ''
		},
		tabindex: {
			type: Number,
			default: 0
		},
		options: {
			type: Array,
			default: () => []
		}
	},

	methods: {
		handleChange(event) {
			this.$emit('input', event.target.value) 
		}
	}
}
</script>
