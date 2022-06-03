<template>
	<div class="form form--issues form--default-issues">
		<form action="?" method="post">
			<div class="form__head">
				<h6 class="form__title"><Dot :size="16" /> Curator Issues</h6>

				<p class="form__author">from Carli C.</p>

				<p class="form__date">3 Days Ago</p>
			</div> <!-- /.form__heading -->

			<div class="form__body">
				<FieldIssue
					v-for="activeIssue in activeIssues"
					:key="activeIssue.id"
					:issue="activeIssue"
					@change="updateIssue"
				/>

				<div class="form__comment">
					{{ formData.additionalComments }}
				</div> <!-- /.form__comment -->
			</div> <!-- /.form__body -->

			<div class="form__actions">
				<ul>
					<li>
						<Button size="small" className="tertiary" @onClick.prevent="handleSubmit">
							All Issues Addressed
						</Button>
					</li>

					<li>
						<ButtonLink @onClick.prevent="$emit('messageCurator')">Message Curator</ButtonLink>
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
	name: 'FormDefaultIssues',

	/**
	 * Components
	 */
	components: {
		Dot,
		Button,
		ButtonLink,
		FieldIssue
	},

	props: {
		issues: {
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
				additionalComments: ''
			}
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
		updateIssue(id, key, value) {
			const issueIndex = this.issues.findIndex((issue) => issue.id == id);
			this.issues[issueIndex][key] = value;
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
