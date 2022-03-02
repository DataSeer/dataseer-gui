<template>
	<Form className="form--edit" @submit.prevent="handleFormSubmit" :loading="loading">
		<FormStatus v-if="error || success" :text="message" :isError="error" />

		<FormBody>
			<FormGroup>
				<Grid columnGap="large">
					<GridColumn>
						<Field
							:error="$v.formData.username.$error"
							placeholder="Username"
							v-model.trim="formData.username"
							name="fullname"
						>
							<Icon name="email" color="currentColor" />

							Username
						</Field>
					</GridColumn>

					<GridColumn>
						<Field
							:error="$v.formData.fullname.$error"
							placeholder="Full Name"
							v-model.trim="formData.fullname"
							name="fullname"
						>
							<Icon name="user" color="currentColor" />

							Full Name
						</Field>
					</GridColumn>

					<GridColumn>
						<Field
							:error="$v.formData.password.$error"
							name="password"
							v-model.trim="formData.password"
							type="password"
							placeholder="Enter"
						>
							<Icon name="password" color="currentColor" />

							Password <span>minimum 8 characters</span>
						</Field>

						<Field
							:error="$v.formData.confirm_password.$error"
							name="password-confirm"
							v-model.trim="formData.confirm_password"
							type="password"
							placeholder="Confirm"
						>
						</Field>
					</GridColumn>

					<GridColumn>
						<FieldSelect
							:error="$v.formData.role.$error"
							placeholder="Role"
							v-model.trim="formData.role"
							:options="rolesList"
						>
							<Icon name="key" color="currentColor" />

							Role
						</FieldSelect>
					</GridColumn>

					<GridColumn>
						<FieldSelect
							:error="$v.formData.organizations.$error"
							placeholder="Institution/Organization"
							multiple
							v-model.trim="formData.organizations"
							:options="organizationsList"
						>
							<Icon name="organization" color="currentColor" />

							Institution/Organization
						</FieldSelect>
					</GridColumn>
				</Grid>
			</FormGroup>

			<FormGroup title="Settings">
				<Grid columnGap="large">
					<GridColumn>
						<div class="checkboxes checkboxes--vertical">
							<ul>
								<li>
									<FieldCheckbox
										name="isActive"
										v-model="formData.disabled"
										isToggle
									>
										Account Is {{ formData.disabled ? 'Active' : 'Inactive' }}
									</FieldCheckbox>
								</li>

								<li>
									<FieldCheckbox
										name="isLocked"
										v-model="formData.visible"
										isToggle
									>
										Account Is {{ formData.visible ? 'Locked' : 'Not Locked' }}
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
				<Button type="submit">Save Changes</Button>
			</li>

			<li>
				<Button to="/accounts" className="tertiary">Cancel</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
/**
 * External Dependencies
 */
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

/**
 * Internal Dependencies
 */
import Form, { FormBody, FormActions, FormStatus, FormGroup } from '@/components/form/form';
import Icon from '@/components/icon/icon';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import Grid, { GridColumn } from '@/components/grid/grid';
import FieldSelect from '@/components/field-select/field-select';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import AccountsService from '@/services/account/accounts';
import RolesService from '@/services/roles/roles';
import organizationsService from '@/services/organizations/organizations';

const mustHaveOrganizationSelected = (value) => value.length;


export default {
	/**
	 * Name
	 */
	name: 'FormAddAccount',	

	/**
	 * Components
	 */
	components: {
		Form,
		FormBody,
		FormGroup,
		FormStatus,
		FormActions,
		Grid,
		Icon,
		Field,
		Button,
		GridColumn,
		FieldSelect,
		FieldCheckbox
	},

	/**
	 * Data
	 */
	data() {
		return {
			formData: {
				username: '',
				fullname: '',
				password: '',
				confirm_password: '',
				role: '',
				disabled: false,
				visible: false,
				organizations: []
			},
			rolesList: [],
			organizationsList: [],
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
			username: {
				required,
				email
			},
			fullname: {
				required,
				minLength: minLength(3)
			},
			password: {
				required,
				minLength: minLength(8)
			},
			confirm_password: {
				required,
				sameAsPassword: sameAs('password')
			},
			role: {
				required,
			},
			organizations: {
				mustHaveOrganizationSelected,
			}
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
				await AccountsService.addAccount(this.formData);

				this.success = true;
				this.message = 'Example Success message';
			} catch (error) {
				this.error = true;
				this.message = error.message;	
			}

			this.loading = false
		},
		async getOrganizationsList() {
			const organizationsList = await organizationsService.getOrganizationsList();

			this.organizationsList = organizationsList;
		},
		async getRolesList() {
			const rolesList = await RolesService.getRolesList();

			this.rolesList = rolesList;
		},
		resetForm() {
			this.error = false;
			this.success = false;
		}
	},

	/**
	 * Created
	 */
	created () {
		this.getRolesList();
		this.getOrganizationsList();
	},
}
</script>
