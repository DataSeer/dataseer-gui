<template>
	<Form className="form--edit" @submit.prevent="handleFormSubmit" :loading="loading">
		<FormStatus ref="formStatus" v-show="error || success" :text="message" :isError="error" />
		
		<FormBody>
			<FormGroup>
				<Grid columnGap="large">
					<GridColumn>
						<Field
							:error="$v.formData.name.$error"
							v-model.trim="formData.name"
							name="name"
						>
							<Icon name="organization" color="currentColor" />

							Organization Name
						</Field>
					</GridColumn>
				</Grid>
			</FormGroup>
			
			<FormGroup title="Settings">
				<Grid columnGap="large">
					<GridColumn>
						<div class="checkboxes checkboxes--vertical">
							<ul>
								<li>
									<FieldCheckbox name="visible" v-model="formData.visible" isToggle>
										Organization Is {{ formData.visible ? 'Active' : 'Inactive'}}
									</FieldCheckbox>
								</li>

								<li>
									<FieldCheckbox name="locked" v-model="formData.locked" isToggle>
										Organization Is {{ formData.locked ? 'Locked' : 'Not Locked'}}
									</FieldCheckbox>
								</li>
							</ul>
						</div> <!-- /.checkboxes -->
					</GridColumn>
				</Grid>
			</FormGroup>
		</FormBody>

		<FormActions>
			<li>
				<Button type="submit">Add Organization</Button>
			</li>

			<li>
				<Button
					type="button"
					to="/organizations"
					className="tertiary"
				>
					Cancel
				</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
/**
 * External Dependencies
 */
import { required, minLength } from 'vuelidate/lib/validators';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormBody, FormActions, FormStatus, FormGroup } from '@/components/form/form';
import organizationsService from '@/services/organizations/organizations';

import ScrollHandler from "@/utils/use-scroll-handler";

export default {
	/**
	 * Name
	 */
	name: 'FormAddOrganization',

	/**
	 * Components
	 */
	components: {
		Form,
		Icon,
		Grid,
		Field,
		Button,
		FormBody,
		FormGroup,
		FormStatus,
		GridColumn,
		FormActions,
		FieldCheckbox
	},	

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				name: '',
				visible: true,
				locked: false,
			},
			loading: false,
			error: false,
			success: false,
			message: '',
			formMessages: {
				success: 'You\'ve successfully added an organization',
				error: 'There was an error adding your organization.'
			},
		};
	},

	/**
	 * Validations
	 */
	validations: {
		formData: {
			name: {
				required,
				minLength: minLength(3)
			},
		}
	},

	/**
	 * Methods
	 */
	methods: {
		async handleFormSubmit() {
			this.resetForm();
			this.$v.$touch();
			if (this.$v.$invalid) {
				return
			}
			
			this.loading = true

			try {
				await organizationsService.addOrganization(this.formData)

				this.success = true;
				this.message = this.formMessages.success;
			} catch (error) {
				this.error = true;
				this.message = error.message || this.formMessages.error;	
			}

			this.loading = false
			ScrollHandler(this.$refs.formStatus.$el);
		},
		resetForm() {
			this.error = false;
			this.success = false;
		}
	},
}
</script>