<template>
	<div
		v-if="issues"
		ref="dropdown"
		class="field-issues js-dropdown-holder"
	>
		<Button
			type="button"
			className="tertiary"
			size="small"
			:active="isActive"
			@onClick.prevent="toggleIssuesDropdown"
		>
			<Icon name="plus" />

			Select issues
		</Button>

		<div class="field__inner">
			<p v-if="text">{{ text }}</p>

			<ul>
				<li v-for="issue in issues" :key="issue.id">
					<input
						tabindex="0"
						type="checkbox"
						class="sr-only"
						:name="issue.id + '-active'"
						:id="issue.id + '-active'"
						:value="issue.active"
						:checked="issue.active"
						@change="handleChange"
					/>

					<label :for="issue.id + '-active'">
						{{ issue.label }} <span v-if="issue.type">({{ issue.type }})</span>
					</label>
				</li>
			</ul>
		</div><!-- /.field__inner -->
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
		text: {
			type: String,
			default: ''
		},
		issues: {
			type: Array
		}
	},

	computed: {
		isActive() {
			return true
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleChange(e) {
			const issueID = e.target.id.split('-')[0];
			const issueKey = e.target.id.split('-')[1];
			const issueValue = e.target.checked

			this.$emit('change', issueID, issueKey, issueValue);
			clearDropdown(this.$refs.dropdown);
		},
		toggleIssuesDropdown() {
			this.$refs.dropdown.classList.toggle('is-active');
		},
	}
};
</script>
