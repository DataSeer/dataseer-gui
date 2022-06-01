<template>
	<Form className="form--new-document" @submit.prevent="handleFormSubmit" :loading="loading">
		<FormHead centered>
			<h2>Upload Your Research Text</h2>

			<p>
				DataSeer will process the document and highlight passages which may need links to a
				dataset, code, lab materials, or protocol
			</p>
		</FormHead>

		<FormStatus ref="formStatus" v-show="error || success" :text="message" :isError="error" />
		
		<FormBody>
			<Grid rowGap="extralarge">
				<GridColumn>
					<FieldFile
						:error="$v.formData.file.$error"
						v-model="formData.file"
						accept=".tei, .pdf"
						name="file"
					>
						<template #label>
							<Icon name="document_new" color="currentColor" />

							Select Your Primary File
						</template>

						<template #helptext> Supported formats: <strong>PDF, TEI</strong> </template>
					</FieldFile>
				</GridColumn>

				<GridColumn>
					<FieldFile v-model="formData.attachedFiles" name="attachedFiles" multiple="multiple">
						<template #label>
							<Icon name="documents" color="currentColor" />

							Select Additional Support Files <em>Optional</em>
						</template>

						<template #helptext>
							All file formats supported
						</template>
					</FieldFile>
				</GridColumn>

				<template v-if="isAdministrator">
					<GridColumn>
						<FieldSelect
							v-model.trim="formData.owner"
							name="owner"
							placeholder="Document Owner"
							:options="accountsList"
						>
							<Icon name="user" color="currentColor" />

							Document Owner
						</FieldSelect>
					</GridColumn>

					<GridColumn>
						<FieldSelect
							v-model.trim="formData.organizations"
							name="organization"
							placeholder="Include All"
							multiple
							:options="organizationsList"
						>
							<Icon name="organization" color="currentColor" />

							Institution/Organization
						</FieldSelect>
					</GridColumn>
				</template>

				<GridColumn>
					<div class="checkboxes checkboxes--center">
						<ul>
							<FieldCheckbox
								v-model="formData.dataseerML"
								name="checkbox"
							>
								This is a new version of an article DataSeer has already assessed
							</FieldCheckbox>
						</ul>
					</div> <!-- /.checkboxes -->
				</GridColumn>
			</Grid>
		</FormBody>

		<FormActions>
			<li>
				<Button tabindex="0" type="submit">Upload Documents</Button>
			</li>

			<li>
				<Button tabindex="0" to="/documents" type="button" className="tertiary">Cancel</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
/**
 * External Dependencies
 */
import { required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Grid, { GridColumn } from '@/components/grid/grid';
import FieldFile from '@/components/field-file/field-file';
import FieldSelect from '@/components/field-select/field-select';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import Form, { FormActions, FormHead, FormBody, FormStatus } from '@/components/form/form';

import accountsService from '@/services/account/accounts';
import documentsService from '@/services/documents/documents';
import organizationsService from '@/services/organizations/organizations';

import ScrollHandler from "@/utils/use-scroll-handler";

export default {
	/**
	 * Name
	 */
	name: 'FormNewDocument',

	/**
	 * Components
	 */
	components: {
		Form,
		FormActions,
		FormHead,
		FormBody,
		FormStatus,
		Grid,
		GridColumn,
		Icon,
		Button,
		FieldFile,
		FieldSelect,
		FieldCheckbox
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				file: '',
				attachedFiles: '',
				dataseerML: false,
				organizations: [],
				owner: '',
			},
			success: false,
			error: false,
			loading: false,
			message: '',
			formMessages: {
				success: 'Your document was successfully uploaded',
				error: 'There was an error uploading your document.'
			},
			accountsList: [],
			organizationsList: [],
		};
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('account', [
			'userId',
			'userOrganizationsIds',
			'userRoleWeight'
		]),
		isAdministrator() {
			return this.userRoleWeight >= 1000;
		}
	},

	validations: {
		formData: {
			file: {
				required,
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		resetFormState() {
			this.success = false,
			this.error = false,
			this.message = ''
		},
		async populateFormData() {
			try {
				const accountsList = await accountsService.getAccountsList();
				const organizationsList = await organizationsService.getOrganizationsList();

				this.accountsList = accountsList;
				this.organizationsList = organizationsList;

				this.formData = {
					...this.formData,
					organizations: this.userOrganizationsIds,
					owner: this.userId,
				}
			} catch (e) {
				this.error = true
				this.message = e.message
			}
						
			this.loading = false
		},
		async handleFormSubmit() {
			this.resetFormState();
			this.$v.$touch();
			if (this.$v.$invalid) return 

			this.loading = true;
			
			const params = {
				file: this.formData.file[0],
				attachedFiles: this.formData.attachedFiles,
				dataseerML: this.formData.dataseerML,
				owner: this.formData.owner,
				organizations: this.formData.organizations.join(', '),
			}
			
			try {
				await documentsService.addDocument(params)

				this.success = true;
				this.message = this.formMessages.success;
			} catch (error) {
				this.error = true;
				this.message = error.message || this.formMessages.error;
			}

			this.loading = false;
			ScrollHandler(this.$refs.formStatus.$el);
		}
	},

	created () {
		this.populateFormData();
	},
};
</script>
