<template>
	<div v-if="issues" class="field-issues">
		<p v-if="text">{{ text }}</p>

		<ul>
			<li v-for="issue in issues" :key="issue.id">
				<input
					tabindex="0"
					type="checkbox"
					class="sr-only"
					:name="issue.id"
					:id="issue.id"
					:value="issue.active"
					:checked="issue.active"
					@change="handleChange"
				/>

				<label :for="issue.id">
					{{ issue.label }}
				</label>
			</li>
		</ul>
	</div>
	<!-- /.field -->
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'FieldIssues',

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

	/**
	 * Methods
	 */
	methods: {
		handleChange(event) {
			this.$emit('change', event);
		}
	}
};
</script>
