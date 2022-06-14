<template>
	<div class="form form--issues form--default-issues">
		<div class="form__head">
			<h6 class="form__title"><Dot :size="16" /> Curator Issues</h6>

			<p v-if="issues.author" class="form__author">{{issues.author}}</p>

			<p class="form__date">{{createdAt}}</p>
		</div> <!-- /.form__heading -->

		<div class="form__body">
			<ul class="field-issue" >
				<FieldCheckbox
					v-for="(issue, index) in formData"
					:key="`issue-${index}`"
					:name="`issue-${index}`"
					:value="issue.completed"
					@onChange="(e) => handleChange(e, index)"
				>
					{{ issue.label }}
				</FieldCheckbox>
			</ul> <!-- /.field-issue -->

			<div class="form__comment">
				{{ issues.comment }}
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
					<ButtonLink :href="`mailto:${issues.author}`">Message Curator</ButtonLink>
				</li>
			</ul>
		</div><!-- /.form__actions -->
	</div>
</template>

<script>
/**
 * External Dependencies
 */
import { formatDistance } from 'date-fns'

/**
 * Internal Dependencies
 */
import Dot from '@/components/dot/dot';
import Button from '@/components/button/button';
import ButtonLink from '@/components/button-link/button-link';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

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
		FieldCheckbox
	},

	/**
	 * Props
	 */
	props: {
		issues: {
			type: Object,
			default: () => {}
		},
	},

	/**
	 * Data
	 */
	data() {
		return {
			formData: []
		};
	},

	/**
	 * Computed
	 */
	computed: {
		createdAt() {
			return formatDistance(new Date(this.issues.createdAt), new Date(), { addSuffix: true })	
		}
	},

	/**
	 * Watch
	 */
	watch: {
		issues: {
			handler(newIssues) {
				this.populateFormData(Object.values(JSON.parse(JSON.stringify(newIssues.active))))
			},
			deep: true
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleChange(e, index) {
			this.$set(this.formData, index, {
				...this.formData[index],
				completed: e.target.checked
			});
		},
		handleSubmit() {
			this.$emit('submit', this.formData);
		},
		populateFormData(issues) {
			if (!issues) return
			
			this.formData = issues.filter(issue => issue).map(issue => ({
				completed: false,
				label: issue
			}));
		}
	},
	
	/**
	 * Created
	 */
	created () {
		this.populateFormData(this.issues.active);
	},
};
</script>
