++6<template>
	<Form className="form--new-document" @submit.prevent="handleFormSubmit" :loading="loading">
		<FormHead centered>
			<h2>Upload Your Research Text</h2>

			<p>
				DataSeer will process the document and highlight passages which may need links to a
				dataset, code, lab materials, or protocol
			</p>
		</FormHead>

		<FormStatus v-if="error || success" :text="message" :isError="error" />

		<FormBody>
			<Grid rowGap="extralarge">
				<GridColumn>
					<FieldFile
						:error="$v.formData.file.$error"
						v-model="formData.file"
						accept=".docx, .pdf"
						name="file"
					>
						<template #label>
							<Icon name="document_new" color="currentColor" />

							Select Your Primary File
						</template>

						<template #helptext> Supported formats: <strong>PDF, docx</strong> </template>
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

				<GridColumn>
					<div class="checkboxes checkboxes--center">
						<ul>
							<FieldCheckbox
								v-model="formData.assessed"
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
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import Form, { FormActions, FormHead, FormBody, FormStatus } from '@/components/form/form';
import documentsService from '@/services/documents/documents';

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
				assessed: false,
			},
			success: false,
			error: false,
			loading: false,
			message: ''
		};
	},

	computed: {
		...mapGetters('account', ['userId', 'userOrganizations'])
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
		async handleFormSubmit() {
			this.resetFormState();
			this.$v.$touch();

			if (this.$v.$invalid) return 
			
			this.loading = true;

			const params = {
				file: this.formData.file[0],
				owner: this.userId,
				organizations: this.userOrganizations.map(entry => entry._id),
				attachedFiles: this.formData.attachedFiles,
			}

			try {
				await documentsService.addDocument(params)

				this.success = true;
				this.message = "Example success message";
			} catch (error) {
				this.error = true;
				this.message = error.message;
			}

			this.loading = false;
		},
		resetFormState() {
			this.success = false,
			this.error = false,
			this.message = ''
		},
	}
};
</script>
