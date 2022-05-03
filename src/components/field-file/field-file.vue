<template>
	<div class="field field--upload" :class="{ 'has-error': error, 'is-alt': alt }">
		<label :for="toKebabCase(name)" class="field__label">
			<slot name="label" />
		</label>

		<div tabindex="0" class="field__input">
			<input
				ref="inputFile"
				type="file"
				:id="toKebabCase(name)"
				:name="name"
				:accept="accept"
				:multiple="multiple"
				:files="value"
				@input="handleInput"
			/>

			<ul v-if="alt && value" class="field__files">
				<li v-for="(file, index) in value" :key="file.index">
					{{ file.name }}

					<button type="button" class="field__clear" @click="removeFile(index)" />
				</li>
			</ul>

			<div class="field__actions">
				<label :for="name">
					<Icon v-if="alt" name="ico_plus_circle" color="currentcolor" />

					<span :class="{ 'btn btn--secondary': !alt }">
						{{ buttonText }}
					</span>
				</label>
			</div>
			<!-- /.field__actions -->

			<p v-if="fileNames && !alt" class="field__text">
				{{ fileNames }}
			</p>

			<button type="button" v-if="value && !alt" @click="removeAllFiles" class="field__clear" />
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
/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import toKebabCase from '@/utils/str-to-kebab-case';

export default {
	/**
	 * Name
	 */
	name: 'FormFile',

	/**
	 * Components
	 */
	components: {
		Icon
	},

	/**
	 * Props
	 */
	props: {
		value: {
			type: [String, FileList, Array]
		},
		name: {
			type: String,
			default: ''
		},
		buttonText: {
			type: String,
			default: 'Choose File'
		},
		accept: {
			type: String,
			default: ''
		},
		error: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		alt: {
			type: Boolean,
			default: false
		}
	},

	/**
	 * Computed
	 */
	computed: {
		fileNames() {
			if (!this.value) return null;
			const items = [];
			[...this.value].map((item) => items.push(item.name));

			return items.join(', ');
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleInput(event) {
			const currentValue = this.value && this.multiple ? this.value : [];
			const filesArr = [...currentValue, ...event.target.files];
			this.$emit('input', filesArr);
		},
		removeAllFiles() {
			this.$refs.inputFile.value = null;
			this.$emit('input', null);
		},
		removeFile(index) {
			const newFileList = this.value;
			newFileList.splice(index, 1);

			if (!newFileList.length) {
				this.$refs.inputFile.value = null;
			}

			this.$emit('input', newFileList.length ? newFileList : null);
		},
		toKebabCase
	}
};
</script>
