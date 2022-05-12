<template>
	<Form className="form--edit" @submit.prevent="updateRole" :loading="loading">
		<FormStatus v-if="error || success" :text="message" :isError="error" />

		<FormBody>
			<FormGroup title="Annotator">
				<Grid columnGap="large">
					<GridColumn>
						<Field readonly placeholder="Role Key" v-model="formData.key" name="Role Key">
							<Icon name="key" color="currentColor" />

							Role Key
						</Field>
					</GridColumn>
					
					<GridColumn>
						<Field placeholder="Role Name" v-model="formData.label" name="Role Name">
							<Icon name="key" color="currentColor" />

							Role Name
						</Field>
					</GridColumn>


					<GridColumn>
						<Field placeholder="Role Weight" v-model="formData.weight" name="Role Weight">
							<Icon name="key" color="currentColor" />

							Role Weight
						</Field>
					</GridColumn>

					<GridColumn>
						<FieldColor placeholder="Role Color" v-model="formData.color" name="Role Color">
							<Icon name="key" color="currentColor" />

							Role Color
						</FieldColor>
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
				<Button type="submit">Save Changes</Button>
			</li>

			<li>
				<Button to="/roles" className="tertiary">Cancel</Button>
			</li>

			<li>
				<Button
					type="button"
					className="tertiary"
					@onClick="deleteRole"
				>
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
import FieldColor from '@/components/field-color/field-color';
import Grid, { GridColumn } from '@/components/grid/grid';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import RoleService from '@/services/roles/roles';
import Form, { FormGroup, FormBody, FormActions, FormStatus } from '@/components/form/form';

export default {
	/**
	 * Name
	 */
	name: 'FormEditRole',

	/**
	 * Components
	 */
	components: {
		Form,
		FormBody,
		FormActions,
		FormStatus,
		FormGroup,
		Grid,
		Icon,
		Field,
		Button,
		FieldColor,
		GridColumn,
		FieldCheckbox
	},

	/**
	 * Props
	 */
	props: {
		formData: {
			type: Object,
			default: () => ({
				label: '',
				key: '',
				weight: '',
				color: '#006AC9',
				visible: false,
				isLocked: false
			})
		}
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			loading: false,
			error: false,
			success: false,
			message: '',
			confirmDeleteMessage: 'Are you sure you want to delete this role?',
		};
	},

	/**
	 * Computed
	 */
	computed: {
		roleID() {
			return this.$route.params.id 
		}
	},

	/**
	 * Methods
	 */
	methods: {
		async updateRole() {
			this.loading = true;
			
			const params = {
				label: this.formData.label,
				color: this.formData.color,
				visible: this.formData.visible,
				weight: this.formData.weight.toString()
			};
			
			try {
				await RoleService.updateRole(this.roleID, params);
				this.success = true;
				this.message = `${this.formData.key} has been successfully updated!`;
			
			} catch (e) {
				this.error = true;
				this.message = e.message;
			}
			
			this.loading = false;
		},
		async deleteRole() {
			const confirm = window.confirm(this.confirmDeleteMessage);
			if (!confirm) return

			this.loading = true;
			
			try {
				await RoleService.deleteRole(this.roleID);
				
				this.success = true;
				this.message = `${this.formData.key} has been successfully deleted!`;
				
			} catch (e) {
				this.error = true;
				this.message = e.message;
			}
			
			this.loading = false;
		},
	}
};
</script>
