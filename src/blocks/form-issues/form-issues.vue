<template>
	<div class="form form--issues">
		<form action="?" method="post">
			<div class="form__head">
				<h6 class="form__title"><Dot :size="16" /> Curator Issues</h6>

				<p class="form__author">from Carli C.</p>

				<p class="form__date">3 Days Ago</p>
			</div>
			<!-- /.form__heading -->

			<div class="form__body">
				<FieldIssue
					v-for="activeIssue in activeIssues"
					:key="activeIssue.id"
					:issue="activeIssue"
					@change="updateIssue"
				/>

				<div class="form__comment">
					{{ additionalComments }}
				</div>
				<!-- /.form__comment -->
			</div>
			<!-- /.form__body -->

			<div class="form__actions">
				<ul>
					<li>
						<Button size="small" className="tertiary">
							All Issues Addressed
						</Button>
					</li>

					<li>
						<ButtonLink>Message Curator</ButtonLink>
					</li>
				</ul>
			</div>
			<!-- /.form__actions -->
		</form>
	</div>
</template>

<script>
/**
 * Internal Dependencies
 */
import Dot from '@/components/dot/dot';
import Button from '@/components/button/button';
import ButtonLink from '@/components/button-link/button-link';
import FieldIssue from '@/components/field-issue/field-issue';

export default {
	/**
	 * Name
	 */
	name: 'FormIssues',

	/**
	 * Components
	 */
	components: {
		Dot,
		Button,
		ButtonLink,
		FieldIssue
	},

	/**
	 * Data
	 */
	data() {
		return {
			additionalComments:
				'In addition to the 2 issues above, please also link to the abc-xyz set. Thanks!',
			issues: [
				{
					id: 'issue11',
					label: 'A particular issue number one',
					type: undefined,
					required: false,
					recommended: false,
					completed: false,
					active: false
				},

				{
					id: 'issue12',
					label: 'Needs Citation',
					type: 'required',
					required: false,
					recommended: false,
					completed: false,
					active: true
				},

				{
					id: 'issue13',
					label: 'Needs Citation',
					type: 'recommended',
					required: false,
					recommended: false,
					completed: false,
					active: true
				},

				{
					id: 'issue14',
					label:
						'A really bad issue that is a bit longer and wraps to two or more lines of written text',
					type: undefined,
					required: false,
					recommended: false,
					completed: false,
					active: false
				},

				{
					id: 'issue15',
					label: 'Missing Support Files',
					type: undefined,
					required: false,
					recommended: false,
					completed: false,
					active: false
				},
				{
					id: 'issue16',
					label: 'A particular issue number one',
					type: undefined,
					required: false,
					recommended: false,
					completed: false,
					active: false
				},
				{
					id: 'issue17',
					label: 'Different issue',
					type: undefined,
					required: false,
					recommended: false,
					completed: false,
					active: false
				},

				{
					id: 'issue18',
					label:
						'A really bad issue that might be a little bit longer and wrap to two or more lines of written text',
					type: undefined,
					required: false,
					recommended: false,
					completed: false,
					active: false
				},

				{
					id: 'issue19',
					label: 'One more issue down here',
					type: undefined,
					required: false,
					recommended: false,
					completed: false,
					active: false
				},

				{
					id: 'issue20',
					label: 'Other (Described in comments below)',
					type: undefined,
					required: false,
					recommended: false,
					completed: false,
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
		}
	}
};
</script>
