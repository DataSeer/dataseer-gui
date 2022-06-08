<template>
	<div class="form form--issues form--curator-issues">
		<form action="?" method="post">
			<div class="form__head">
				<h6 class="form__title"><Dot :size="16" />Flag issues</h6>
				
				<FieldIssues
					:issuesList="issuesList"
					@change="handleIssueUpdate"
				/>
			</div><!-- /.form__head -->

			<div class="form__body">
				<FieldIssue
					isCurator
					v-for="issue in activeIssues"
					:key="issue.id"
					:issue="issue"
					@change="handleIssueUpdate" 
				/>

				<Field
					name="Additional Comments"
					type="textarea"
					placeholder="Additional Comments"
					v-model="formData.additionalComments"
				/>
			</div><!-- /.form__body -->

			<div class="form__actions">
				<ul>
					<li>
						<Button size="small" @onClick.prevent="handleSubmit">
							Save issues
						</Button>
					</li>

					<li>
						<ButtonLink @onClick.prevent="$emit('cancel')">Cancel</ButtonLink>
					</li>
				</ul>
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
import ButtonLink from '@/components/button-link/button-link';
import FieldIssue from '@/components/field-issue/field-issue';
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
		ButtonLink,
		FieldIssue,
		FieldIssues
	},
	
	/**
	 * Props
	 */
	props: {
		activeIssues: {
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
			formData: {
				additionalComments: '',
			}
		};
	},

	/**
	 * Methods
	 */
	methods: {
		handleIssueUpdate(id, value) {
			const issueIndex = this.issuesList.findIndex((issue) => issue.id == id);
			console.log(issueIndex);

			return
			this.issuesList[issueIndex].active = value;
			this.$emit('change');

			console.log(this.activeIssues);
		}, 
		handleSubmit() {
			this.$emit('submit', {
				issues: this.activeIssues,
				additionalComments: this.formData.additionalComments
			});
		}
	}
};
</script>
