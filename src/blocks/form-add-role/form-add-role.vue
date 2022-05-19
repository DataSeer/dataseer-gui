<template>
	<Form className="form--edit" @submit.prevent="handleFormSubmit" :loading="loading">
		<FormStatus ref="formStatus" v-show="error || success" :text="message" :isError="error" />
		
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
						<FieldColor
							:error="$v.formData.color.$error"
							placeholder="Role Color"
							v-model="formData.color"
							name="Role Color"
						>
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
				<Button type="submit">Add Role</Button>
			</li>

			<li>
				<Button
					type="button"
					to="/curator-roles"
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
import FieldColor from '@/components/field-color/field-color';
import Button from '@/components/button/button';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormBody, FormActions, FormStatus, FormGroup } from '@/components/form/form';
import RoleService from '@/services/roles/roles';

import ScrollHandler from "@/utils/use-scroll-handler";

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
		FieldColor,
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
				color: '#006AC9',
				visible: false,
				isLocked: false
			},
			loading: false,
			error: false,
			success: false,
			message: '',
			formMessages: {
				success: 'You\'ve successfully added a new role',
				error: 'There was an error adding your role.'
			},
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
			if (this.$v.$invalid) return
			
			this.loading = true;

			try {
				await RoleService.addRole(this.formData)
				
				this.success = true;
				this.message = this.formMessages.success;
			} catch (error) {
				this.error = true;
				this.message = error.message || this.formMessages.error;
			}

			this.loading = false;
			ScrollHandler(this.$refs.formStatus.$el);
		},
		resetForm() {
			this.error = false;
			this.success = false;
			this.message = '';
		}
	},
}
</script>