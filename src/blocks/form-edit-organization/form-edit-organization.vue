<template>
	<Form className="form--edit" @submit.prevent="updateOrganization" :loading="loading">
		<FormStatus v-if="error || success" :text="message" :isError="error" />
		
		<FormBody>
			<FormGroup :title="title">
				<Grid columnGap="large">
					<GridColumn>
						<Field
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
				<Button type="submit">Save Changes</Button>
			</li>

			<li>
				<Button to="/organizations" type="button" className="tertiary">Cancel</Button>
			</li>

			<li>
				<Button type="button" @onClick="deleteOrganization" className="tertiary">
					<Icon name="trash" color="#E36329" /> Delete Role
				</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
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

export default {
	/**
	 * Name
	 */
	name: 'FormEditOrganization',

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
			title: '',
			formData: {
				name: '',
				visible: false,
				locked: false,
			},
			loading: false,
			error: false,
			success: false,
			message: ''
		};
	},

	/**
	 * Computed
	 */
	computed: {
		organizationId() {
			return this.$route.params.id
		}
	},

	/**
	 * Methods
	 */
	methods: {
		async updateOrganization() {
			this.loading = true;
			this.error = false;
			
			const params = {
				name: this.formData.name,
				visible:  this.formData.visible
			}	

			try {
				await organizationsService.updateOrganization(this.organizationId, params);
				this.success = true;
				this.message = 'Success';
			} catch (error) {
				this.error = true;
				this.message = error.message;
			}

			this.loading = false;
		},
		async getOrganization() {
			this.loading = true;
			
			try {
				const organization = await organizationsService.getOrganization(this.organizationId);

				this.title = organization.name;
				this.formData.name = organization.name;
				this.formData.visible = organization.visible;
			} catch (error) {
				this.error = true;
				this.message = error.message;
			}

			this.loading = false;
		},
		async deleteOrganization() {
			const confirmDelete = window.confirm('Are you sure you want to delete this Organization?');

			if (!confirmDelete) return;
			this.loading = true;
			
			try {
				this.resetForm()
				await organizationsService.deleteOrganization(this.organizationId);
				
				this.success = true;
				this.message = "Example message on organization delete success";
			} catch (error) {
				this.error = true;
				this.message = error.message;
			}

			this.loading = false;
		},
		resetForm() {
			this.error = false;
			this.success = false;
			this.message = '';
		}
	},
	
	/**
	 * Created
	 */
	created () {
		this.getOrganization();
	},
};
</script>
