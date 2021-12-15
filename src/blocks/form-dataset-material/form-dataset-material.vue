<template>
	<div class="form form--dataset">
		<form action="?" method="post">
			<div class="form__head">
				<div class="form__head-inner">
					<h5 v-if="title">{{ title }}</h5>

					<p>{{formData.material.value || 'Undefined Type'}}</p>
				</div><!-- /.form__head-inner -->
			</div>
			
			<div class="form__body">
				<Grid rowGap="medium">
					<GridColumn>
						<FieldSelect
							:error="$v.type.$error"
							:options="[
								{	
									value: 'material-1',
									title: 'Material 1'
								},
								{
									value: 'material-2',
									title: 'Material 2'
								},
								{
									value: 'material-3',
									title: 'Material 3'
								},
								{
									value: 'material-4',
									title: 'Material 4'
								}
							]"
							name="material"
							v-model.trim="formData.material"
							placeholder="Material Type"
						>
							<Icon name="flask" />

							Material Type <a href="#">Type Definitions</a>
						</FieldSelect>
					</GridColumn>

					<GridColumn>
						<Checkboxes>
							<FieldCheckbox name="reuse" v-model="formData.reuse" isDropdown>
								This material is re-used from another public or private source
							</FieldCheckbox>

							<FieldCheckbox
								name="practices"
								v-model="formData.practices"
								isDropdown
								v-if="formData.reuse !== null"
							>
								<a href="#">Best practices</a> for this material type have been followed

								<button
									tabindex="0"
									type="button"
									class="text-toggle"
									@click="practices_text = !practices_text"
								>
									{{ textToggle(practices_text) }}
								</button>
							</FieldCheckbox>

							<HiddenText v-if="practices_text">
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit labore, laborum
									ipsam nostrum atque dolore eum cumque vero vel perferendis.
								</p>
							</HiddenText>
						</Checkboxes>
					</GridColumn>

					<GridColumn>
						<Field
							v-if="formData.reuse !== null"
							name="rrid"
							v-model.trim="formData.rrid"
							type="text"
							placeholder="https://"
						>
							<Icon name="chain" color="currentColor" />

							RRID
						</Field>
					</GridColumn>

					<GridColumn>
						<Field name="instructions" type="textarea" v-model="formData.instructions">
							<Icon name="comment" />

							Additional Comments or Instructions
						</Field>
					</GridColumn>
				</Grid>
			</div>
			<!-- /.form__body -->

			<div class="form__cta">
				<div class="form__cta-row">
					<div class="form__cta-col">
						<Button @onClick="handleComplete">Complete This Material</Button>
					</div>
					<!-- /.form__cta-col -->

					<div class="form__cta-col">
						<Button className="tertiary" v-tooltip.top-center="tooltips.connectText">
							<Icon name="connect" />

							Connect Text
						</Button>

						<Button
							className="tertiary"
							v-tooltip.top-center="tooltips.deleteText"
							@onClick="handleDelete"
						>
							<Icon name="trash" />

							Delete
						</Button>
					</div>
					<!-- /.form-__cta-col -->
				</div>
				<!-- /.form__cta-row -->
			</div>
			<!-- /.form__cta -->
		</form>
	</div>
	<!-- /.form -->
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import Field from '@/components/field/field';
import FieldSelect from '@/components/field-select/field-select';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import HiddenText from '@/components/hidden-text/hidden-text';
import Grid, { GridColumn } from '@/components/grid/grid';
import Checkboxes from '@/components/checkboxes/checkboxes';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

export default {
	/**
	 * Name
	 */
	name: 'FormDatasetMaterial',

	/**
	 * Components
	 */
	components: {
		Icon,
		Grid,
		Field,
		Button,
		Checkboxes,
		HiddenText,
		GridColumn,
		FieldSelect,
		FieldCheckbox
	},
	
	/**
	 * Props
	 */
	props: {
		title: {
			type: String,
			default: ''
		},
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				material: '',
				reuse: null,
				practices: null,
				rrid: '',
				permalink: '',
				instructions: '',
			},
			practices_text: false,
			tooltips: {
				connectText: 'Select additional sentences from the document to connect to this dataset',
				deleteText: 'Delete this Dataset'
			}
		};
	},

	/**
	 * Watch
	 */
	watch: {
		formData: {
			handler() {
				this.$emit('onDatasetComplete', false)
			},
			deep: true
		}
	},

	/**
	 * Validations
	 */
	validations: {
		type: {
			required
		},
		subtype: {
			required
		},
		permalink: {
			required
		}
	},

	/**
	 * Methods
	 */
	methods: {
		textToggle(check) {
			return check ? 'Hide' : 'Show';
		},
		toggleIssuesForm(e) {
			e.preventDefault();
			this.isIssuesFormVisible = !this.isIssuesFormVisible;
		},
		handleDelete(e) {
			e.preventDefault();
			const confirmDelete = window.confirm('Are you sure you want to delete this dataset?');

			if (confirmDelete) {
				this.$emit('onDatasetDelete')
			}
		},
		openPopup(e) {
			e.preventDefault();
			this.$refs.textPassagePopup.showModal();
		},
		handleComplete(e) {
			e.preventDefault();
			this.$emit('onDatasetComplete', true)
		}
	}
};
</script>
