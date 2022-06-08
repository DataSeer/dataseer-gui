<template>
	<div
		ref="dropdown"
		class="field-issues js-dropdown-holder"
	>
		<Button
			type="button"
			className="tertiary"
			size="small"
			@onClick.prevent="toggleIssuesDropdown"
		>
			<Icon name="plus" />

			{{ toggleButtonText }}
		</Button>

		<div class="field__inner">
			<p v-if="title">{{ title }}</p>

			<ul>
				<li v-for="item in issuesList" :key="item.id">
					<input
						tabindex="0"
						type="checkbox"
						class="sr-only"
						:name="item.id"
						:id="item.id + '-dropdown'"
						:value="item.active"
						:checked="item.active"
						@change="handleChange"
					/>
					
					<label :for="item.id + '-dropdown'"> {{ item.label }} </label>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import { clearDropdown } from '@/utils/use-dropdowns';

export default {
	/**
	 * Name
	 */
	name: 'FieldIssues',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button
	},

	/**
	 * Props
	 */
	props: {
		issuesList: {
			type: Array,
			default: () => []
		}
	},

	/**
	 * Data
	 */
	data() {
		return {
			title: 'Select all that apply…',
			toggleButtonText: 'Select issues'
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleChange(e) {
			const { name, checked } = e.target;
			
			this.$emit('change', name, checked);
			// Close dropdown after selection
			clearDropdown(this.$refs.dropdown);
		},
		toggleIssuesDropdown() {
			this.$refs.dropdown.classList.toggle('is-active');
		},
	}
};
</script>
