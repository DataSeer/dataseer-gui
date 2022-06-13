<template>
	<div class="form form--issues form--curator-issues">
		<form action="?" method="post">
			<div class="form__head">
				<h6 class="form__title"><Dot :size="16" />Flag issues</h6>
				
				<FieldIssues
					:issues="issues.active"
					:issuesList="issuesList"
					@change="(issue, value) => toggleIssue(issue, value)"
				/>
			</div><!-- /.form__head -->

			<div class="form__body">
				<ul class="form__issues">
					<li v-for="(issue, index) in activeIssues" :key="`issue-${index}`">
						<BtnClose @onClick="toggleIssue(issue, false)" /> 
						
						{{ issue }}
					</li>
				</ul>
				
				<Field
					name="Additional Comments"
					type="textarea"
					placeholder="Additional Comments"
					v-model="formData.comment"
				/>
			</div><!-- /.form__body -->

			<div class="form__actions">
				<Button @onClick.prevent="$emit('cancel')">Cancel</Button>
			</div><!-- /.form__actions -->
		</form>
	</div><!-- /.form form--dataset -->
</template>

<script>
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
			default: () => []
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
				active: [],
				comment: '',
			}
		};
	},

	/**
	 * Computed
	 */
	computed: {
		activeIssues() {
			return this.issuesList.filter(issue => this.issues.active.some(item => item === issue) );
		}
	},

	/**
	 * Methods
	 */
	methods: {
		toggleIssue(issue, value){
			const index = this.formData.active.findIndex(item => item === issue);
			
			if (value) {
				if ( index === -1 ) this.formData.active = [...this.formData.active, issue];
			} else {
				if ( index !== -1 ) this.formData.active.splice(index, 1);
			}
		},
	},

	/**
	 * Created
	 */
	created () {
		this.formData = {...this.issues };
	},
};
</script>

