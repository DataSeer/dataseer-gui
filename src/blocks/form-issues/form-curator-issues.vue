<template>
	<div class="form form--issues">
		<form action="?" method="post">
			<div class="form__head">
				<h6 class="form__title"><Dot :size="16" />Flag issues</h6>

				<Button
					className="tertiary"
					size="small"
					:active="isIssuesDropdownVisible"
					@onClick.prevent="toggleIssuesDropdown"
				>
					<Icon name="plus" />

					Select issues
				</Button>
			</div><!-- /.form__head -->

			<div v-if="isIssuesDropdownVisible" class="form__issues">
				<FieldIssues
					text="Select all that apply…"
					:issues="issues"
					@change="updateIssue"
				/>
			</div><!-- /.form__issues -->

			<div class="form__body">
				<FieldIssue
					v-for="activeIssue in activeIssues"
					:key="activeIssue.id"
					:issue="activeIssue"
					isCurator @change="updateIssue" 
				/>

				<Field
					name="Additional Comments"
					type="textarea"
					placeholder="Additional Comments"
					v-model="additionalComments"
				/>
			</div><!-- /.form__body -->

			<div class="form__actions">
				<ul>
					<li>
						<Button size="small" @onClick="saveIssues">
							Save issues
						</Button>
					</li>

					<li>
						<ButtonLink @onClick="cancel">Cancel</ButtonLink>
					</li>
				</ul>
			</div><!-- /.form__actions -->
		</form>
	</div><!-- /.form form--dataset -->
</template>

<script>
/**
 * Internal Dependencies
 */
import Dot from '@/components/dot/dot';
import Icon from '@/components/icon/icon';
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
		Icon,
		Field,
		Button,
		ButtonLink,
		FieldIssue,
		FieldIssues
	},

	/**
	 * Data
	 */

	data() {
		return {
			isIssuesDropdownVisible: false,
			additionalComments: '',
			issues: [
				{
					id: 'issue1',
					label: 'URL broken',
					required: true,
					completed: true,
					active: false
				},
				{
					id: 'issue1',
					label: 'Input incorrect (wrong cat#/RRID/PID/DOI/other)',
					required: true,
					completed: true,
					active: false
				},
				{
					id: 'issue1',
					label: 'Item not yet publicly accessible',
					required: true,
					completed: true,
					active: false
				},
				{
					id: 'issue1',
					label: 'Not an appropriate reference',
					required: true,
					completed: true,
					active: false
				},
				{
					id: 'issue1',
					label: 'Dataset not provided',
					required: true,
					completed: true,
					active: false
				}
			]
		};
	},

	/**
	 * Computed
	 */
	computed: {
		activeIssues: function() {
			return this.issues.filter((issue) => issue.active);
		}
	},

	/**
	 * Methods
	 */
	methods: {
		toggleIssuesDropdown() {
			this.isIssuesDropdownVisible = !this.isIssuesDropdownVisible;
		},
		updateIssue(id, key, value) {
			const issueIndex = this.issues.findIndex((issue) => issue.id == id);
			this.issues[issueIndex][key] = value;
		},
		saveIssues(e) {
			e.preventDefault();
		},
		cancel(e) {
			e.preventDefault();
			this.$emit('cancelClick')
		}
	}
};
</script>
