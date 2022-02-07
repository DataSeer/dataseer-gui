<template>
	<Form className="form--edit" @submit.prevent="updateAccount" :loading="loading">
		<FormStatus v-if="error || success" :text="message" :isError="error"  />

		<FormBody>
			<FormGroup>
				<h4>{{formData.username}}</h4>

				<Grid columnGap="large">
					<GridColumn>
						<Field
							placeholder="Full Name"
							v-model.trim="formData.fullname"
							name="fullname"
						>
							<Icon name="user" color="currentColor" />

							Full Name
						</Field>
					</GridColumn>

					<GridColumn>
						<FieldSelect
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

			<FormGroup>
				<h4>Settings</h4>

				<Grid columnGap="large">
					<GridColumn>
						<div class="checkboxes checkboxes--vertical">
							<ul>
								<li>
									<FieldCheckbox name="isActive" v-model="formData.disabled" isToggle>
										Account Is {{ formData.disabled ? 'Active' : 'Inactive'}}
									</FieldCheckbox>
								</li>

								<li>
									<FieldCheckbox name="isLocked" v-model="formData.visible" isToggle>
										Account Is {{ formData.visible ? 'Locked' : 'Not Locked'}}
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

			<li>
				<Button className="tertiary" type="button" @onClick="deleteAccount">
					<Icon name="trash" color="#E36329" /> Delete Account
				</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
/**
 * Internal Dependencies
 */
import Form, { FormBody, FormActions, FormStatus } from '@/components/form/form';
import Icon from '@/components/icon/icon';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import Grid, { GridColumn } from '@/components/grid/grid';
import FieldSelect from '@/components/field-select/field-select';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import AccountsService from '@/services/account/accounts';
import RolesService from '@/services/roles/roles';
import organizationsService from '@/services/organizations/organizations';

export default {
	/**
	 * Name
	 */
	name: 'FormEditAccount',

	/**
	 * Components
	 */
	components: {
		Form,
		FormBody,
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
	
	data() {
		return {
			formData: {
				fullname: '',
				username: '',
				role: {
					value: '',
					label: ''
				},
				disabled: false,
				visible: false,
				organizations: [{
					value: '',
					label: ''
				}],
			},
			rolesList: [
				{
					id: '',
					value: 'None'
				}
			],
			organizationsList: [
				{
					id: '',
					value: 'None'
				}
			],
			loading: false,
			error: false,
			success: false,
			message: '',
		}
	},

	methods: {
		async getAccount() {
			const result = await AccountsService.getAccount(this.$route.params.id);
			const { visible, disabled, fullname, username} = result
			
			const getOrganizations = () => (
				result.organizations.map(organization =>({
					value: organization._id,
					label: organization.name,	
				}))
			)
			
			const getRole = () => ({
				value: result.role._id,
				label: result.role.label,	
			})

			this.formData = {
				fullname: fullname,
				username: username,
				role: getRole(),
				disabled: disabled,
				visible: visible,
				organizations: getOrganizations(),
			}
		},
		async updateAccount() {
			const params = {
				fullname: this.formData.fullname,
				role: this.formData.role.value,
				organizations: this.formData.organizations.map(entry => entry.value),
				disabled: this.formData.disabled,
				visible: this.formData.visible
			}

			try {
				await AccountsService.updateAccount(this.$route.params.id, params)
				this.success = true;
				this.message = `${this.formData.username} was updated successfully!`;
			} catch (e) {
				this.error = true;
				this.message = e.message;
			}
		},
		async deleteAccount() {
			const confirmDelete = window.confirm('Are you sure you want to delete this Account?');

			if (!confirmDelete) return
			
			try {
				await AccountsService.deleteAccount(this.$route.params.id);
				this.success = true;
				this.message = `${this.formData.username} deleted successfully!`;
			} catch (e) {
				this.error = true;
				this.message = e.message;
			}
		},
		async getOrganizationsList() {
			const organizationsList = await organizationsService.getOrganizationsList();
			
			this.organizationsList = organizationsList;
		},
		async getRolesList() {
			const rolesList = await RolesService.getRolesList();
			
			this.rolesList = rolesList;
		}
	},

	created () {
		this.getRolesList();
		this.getOrganizationsList();
		this.getAccount();
	},
};
</script>
