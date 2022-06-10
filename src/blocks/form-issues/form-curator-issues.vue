<template>
	<div class="form form--issues form--curator-issues">
		<form action="?" method="post">
			<div class="form__head">
				<h6 class="form__title"><Dot :size="16" />Flag issues</h6>
				
				<FieldIssues
					span:issuesList="issuesList"
					@change="(issue, value) => toggleIssue(issue, value)"
				/>
			</div><!-- /.form__head -->

			<div class="form__body">
				<ul class="form__issues">
					<li v-for="issue in formData.issues" :key="issue.id">
						<BtnClose @onClick="toggleIssue(issue, false)" /> 
						
						{{ issue.label }}
					</li>
				</ul>
				
				<Field
					name="Additional Comments"
					type="textarea"
					placeholder="Additional Comments"
					v-model="formData.additionalComments"
				/>
			</div><!-- /.form__body -->

			<div class="form__actions">
				<Button @onClick.prevent="$emit('cancel')">Cancel</Button>
			</div><!-- /.form__actions -->
		</form>
	</div><!-- /.form form--dataset -->
</template>

<script>
/* eslint-disable */
/**
 * Internal Dependencies
 */
import Dot from '@/components/dot/dot';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import BtnClose from '@/components/btn-close/btn-close';
import FieldIssues from '@/components/field-issues/field-issues';

export default {
	/**
	 * Name
	 */
	name: 'formCuratorIssues',

	/**
	 * Components
	 */
	components: {
		Dot,
		Field,
		Button,
		BtnClose,
		FieldIssues
	},
	
	/**
	 * Props
	 */
	props: {
		issues: {
			type: Object,
			default: () => {}
		},
		issuesList: {
			type: Array,
			default: () => []
		}
	},

	/**
	 * Watch
	 */
	watch: {
		formData: {
			handler(newValue) {
				this.$emit('change', newValue);
			},
			deep: true
		}
	},

	/**
	 * Data
	 */

	data() {
		return {
			formData: {
				issues: [],
				additionalComments: '',
			}
		};
	},

	/**
	 * Methods
	 */
	methods: {
		toggleIssue(issue, value){
			const index = this.formData.issues.findIndex(item => item.id === issue.id);
			
			if (value) {
				if ( index === -1 ) this.formData.issues = [...this.formData.issues, issue];
			} else {
				this.formData.issues.splice(index, 1);
			}
		},
	},

	created () {
		this.formData = {...this.issues};
	},
};
</script>
