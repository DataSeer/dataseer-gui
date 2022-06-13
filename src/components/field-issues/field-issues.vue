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
				<li v-for="(item, index) in issuesList" :key="index">
					<input
						tabindex="0"
						type="checkbox"
						class="sr-only"
						:name="`issue-${index}-dropdown`"
						:id="`issue-${index}-dropdown`"
						:value="issues.some(issue => issue === item)"
						:checked="issues.some(issue => issue === item)"
						@change="(e) => handleChange(item, e)"
					/>

					<label :for="`issue-${index}-dropdown`"> {{ item }} </label>
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
		issues: {
			type: Array,
			default: () => []
		},
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
		handleChange(item, e) {
			this.$emit('change', item, e.target.checked);
			
			// Close dropdown after selection
			clearDropdown(this.$refs.dropdown);
		},
		toggleIssuesDropdown() {
			this.$refs.dropdown.classList.toggle('is-active');
		},
	}
};
</script>
