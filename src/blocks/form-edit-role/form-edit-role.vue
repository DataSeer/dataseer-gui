<template>
	<Form className="form--edit" @submit.prevent="updateRole" :loading="loading">
		<FormStatus v-if="error || success" :text="message" :isError="error" />

		<FormBody>
			<FormGroup title="Annotator">
				<Grid columnGap="large">
					<GridColumn>
						<Field placeholder="Role Name" :value="formData.name" name="Role Name">
							<Icon name="key" color="currentColor" />

							Role Name
						</Field>
					</GridColumn>

					<GridColumn>
						<Field placeholder="Role Key" :value="formData.key" name="Role Key">
							<Icon name="key" color="currentColor" />

							Role Key
						</Field>
					</GridColumn>

					<GridColumn>
						<Field placeholder="Role Weight" :value="formData.weight" name="Role Weight">
							<Icon name="key" color="currentColor" />

							Role Weight
						</Field>
					</GridColumn>

					<GridColumn>
						<Field placeholder="Role Color" :value="formData.color" name="Role Color">
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
				<Button type="submit">Save Changes</Button>
			</li>

			<li>
				<Button className="tertiary">Cancel</Button>
			</li>

			<li>
				<Button className="tertiary">
					<Icon name="trash" color="#E36329" />
					Delete Role
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
		GridColumn,
		FieldCheckbox
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				name: '',
				key: '',
				weight: '',
				color: '',
				visible: false,
				isLocked: false
			},
			loading: false,
			error: false,
			success: false,
			message: '',
		};
	},


	/**
	 * Methods
	 */
	methods: {
		async updateRole() {
			const params = {
				name: this.formData.name,
				visible: this.formData.visible
			}
			
			try {
				await RoleService.updateRole(this.$route.params.id, params);
				this.success = true;
				this.message = `${this.formData.key} had been updated!`;
			
			} catch (e) {
				this.error = true;
				this.message = e.message;
			}
			
			this.loading = false;
		},
		async getRole() {
			const role = await RoleService.getRole(this.$route.params.id);

			this.formData = {
				name: role.label,
				key: role.key,
				weight: role.weight,
				color: role.color,
				visible: false,
				isLocked: false
			}
		},
	},

	created () {
		this.getRole();
	},
};
</script>
