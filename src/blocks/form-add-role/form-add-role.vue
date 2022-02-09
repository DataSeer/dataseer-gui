<template>
	<Form className="form--edit" @submit.prevent="handleFormSubmit" :loading="loading">
		<FormStatus v-if="error || success" :text="message" :isError="error" />
		
		<FormBody>
			<FormGroup>
				<Grid columnGap="large">
					<GridColumn>
						<Field
							:error="$v.formData.label.$error"
							placeholder="Role Name"
							v-model="formData.label"
							name="Role Name">
							<Icon name="key" color="currentColor" />

							Role Name
						</Field>
					</GridColumn>

					<GridColumn>
						<Field
							:error="$v.formData.key.$error"
							placeholder="Role Key"
							v-model="formData.key"
							name="Role Key">
							<Icon name="key" color="currentColor" />

							Role Key
						</Field>
					</GridColumn>

					<GridColumn>
						<Field
							:error="$v.formData.weight.$error"
							placeholder="Role Weight"
							v-model="formData.weight"
							name="Role Weight">
							<Icon name="key" color="currentColor" />

							Role Weight
						</Field>
					</GridColumn>

					<GridColumn>
						<Field
							:error="$v.formData.color.$error"
							placeholder="Role Color"
							v-model="formData.color"
							name="Role Color">
							<Icon name="key" color="currentColor" />

							Role Color
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
									<FieldCheckbox name="isActive" v-model="formData.visible" isToggle>
										Role Is {{ formData.visible ? 'Active' : 'Inactive'}}
									</FieldCheckbox>
								</li>

								<li>
									<FieldCheckbox name="isLocked" v-model="formData.isLocked" isToggle>
										Role Is {{ formData.isLocked ? 'Locked' : 'Not Locked'}}
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
				<Button type="submit">Add Role</Button>
			</li>

			<li>
				<Button
					type="button"
					to="/roles"
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
import { required, integer } from 'vuelidate/lib/validators';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormBody, FormActions, FormStatus, FormGroup } from '@/components/form/form';
import RoleService from '@/services/roles/roles';

export default {
	/**
	 * Name
	 */
	name: 'FormAddRole',

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
				label: '',
				key: '',
				weight: '',
				color: '',
				visible: false,
				isLocked: false
			},
			loading: false,
			error: false,
			success: false,
			message: ''
		};
	},

	/**
	 * Validations
	 */
	validations: {
		formData: {
			label: {
				required
			},
			key: {
				required
			},
			weight: {
				integer,
				required
			},
			color: {
				required
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
				await RoleService.addRole(this.formData)

				this.success = true;
				this.message = 'Example Success message';
			} catch (error) {
				this.error = true;
				this.message = error.message;	
			}

			this.loading = false
		},
		resetForm() {
			this.error = false;
			this.success = false;
		}
	},
}
</script>