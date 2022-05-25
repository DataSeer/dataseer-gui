<template>
	<Form ref="form" className="form--edit" :loading="loading">
		<FormStatus v-if="error || success" :text="message" :isError="error" />

		<FormBody>
			<FormGroup title="Document Info">
				<Grid columnGap="large" columnSize="half">
					<GridColumn>
						<Grid rowGap="small">
							<GridColumn>
								<Field
									type="textarea"
									size="medium"
									placeholder="Name"
									v-model="formData.name"
									name="Document Title"
								>
									<Icon name="document" color="currentColor" />

									Document Title
								</Field>
							</GridColumn>

							<GridColumn>
								<FieldSelect
									placeholder="Select Owner"
									v-model="formData.owner"
									:options="ownersList"
								>
									<Icon name="user" color="currentColor" />

									Document Owner(s)
								</FieldSelect>
							</GridColumn>

							<GridColumn>
								<FieldSelect
									multiple
									v-model="formData.organizations"
									:options="organizationsOptions"
								>
									<Icon name="organization" color="currentColor" />

									Institution/Organization(s)
								</FieldSelect>
							</GridColumn>
						</Grid>
					</GridColumn>

					<GridColumn>
						<Grid rowGap="small">
							<GridColumn>
								<Field
									name="Journal"
									v-model="formMetadata.journal"
								>
									<Icon name="book" color="currentColor" />

									Journal
								</Field>
							</GridColumn>
								<Field
									name="Publisher"
									v-model="formMetadata.publisher"
								>
									<Icon name="book" color="currentColor" />

									Publisher
								</Field>
							<GridColumn>

							</GridColumn>
							
							<GridColumn>
								<FieldDatepicker
									placeholder="From"
									v-model="formMetadata.createdAt"
								>
									<Icon name="book" color="currentColor" />

									Publish Date
								</FieldDatepicker>
							</GridColumn>
							
							<GridColumn>
								<Field
									name="DOI"
									trailingIcon="refresh"
									v-model="formMetadata.doi"
								>
									<Icon name="book" color="currentColor" />

									DOI
								</Field>
							</GridColumn>
						</Grid>
					</GridColumn>

					<GridColumn fullwidth>
						<Field
							type="textarea"
							size="large"
							v-model="authors"
							name="Authors"
						>
							<Icon name="user" color="currentColor" />

							Authors
						</Field>
					</GridColumn>
				</Grid>
			</FormGroup>
			
			<FormGroup title="Files">
				<Grid columnGap="large" columnSize="half">
					<GridColumn>
						<Grid rowGap="small">
							<GridColumn>
								<Field placeholder="Enter Display Name" v-model="primaryFileName" name="Display Name">
									<Icon name="document" color="currentColor" />

									Primary File Display Name
								</Field>
							</GridColumn>
							
							<GridColumn>
								<FieldFile
									v-model="primaryFile"
									accept=".docx, .pdf"
									name="primaryFile"
									buttonText="Upload New Version"
									alt
								>
									<template #label>
										<Icon name="document_new" color="currentColor" />

										Primary File
									</template>
								</FieldFile>
							</GridColumn>
						</Grid>
					</GridColumn>

					<GridColumn>
						<FieldFile
							v-model="appendFiles"
							name="appendFiles"
							buttonText="Upload Files"
							multiple
							alt
						>
							<template #label>
								<Icon name="document_new" color="currentColor" />

								Append File(s)
							</template>
						</FieldFile>
					</GridColumn>
				</Grid>
			</FormGroup>

			<FormGroup title="Settings">
				<Grid columnGap="large" columnSize="half">
					<GridColumn fullwidth>
						<Checkboxes vertical>
							<FieldCheckbox name="visible" v-model="formData.visible" isToggle>
								Document Is {{ formData.visible ? 'Active' : 'Inactive'}}
							</FieldCheckbox>
							
							<FieldCheckbox name="locked" v-model="formData.locked" isToggle>
								Document Is {{ formData.locked ? 'Locked' : 'Not Locked'}}
							</FieldCheckbox>
						</Checkboxes>
					</GridColumn>
				</Grid>
			</FormGroup>
		</FormBody>

		<FormActions>
			<li>
				<Button type="button" @onClick.prevent="handleFormSubmit">Save Changes</Button>
			</li>

			<li>
				<Button
					type="button"
					className="tertiary"
					@onClick.prevent="$router.go(-1)"
				>
					Cancel
				</Button>
			</li>

			<li>
				<Button type="button" className="tertiary" @onClick.prevent="handleDocumentDelete">
					<Icon name="trash" color="#E36329" />

					Delete Document
				</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
/* eslint-disable */
/**
 * Internal Dependencies
 */
import Checkboxes from '@/components/checkboxes/checkboxes';
import Form, { FormStatus, FormActions, FormBody, FormGroup } from '@/components/form/form';
import Icon from '@/components/icon/icon';
import Grid, { GridColumn } from '@/components/grid/grid';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import FieldFile from '@/components/field-file/field-file';
import FieldDatepicker from '@/components/field-datepicker/field-datepicker';
import FieldSelect from '@/components/field-select/field-select';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

import documentsService from '@/services/documents/documents';
import accountsService from '@/services/account/accounts';
import organizationsService from '@/services/organizations/organizations';

import ScrollHandler from "@/utils/use-scroll-handler";

export default {
	/**
	 * Name
	 */
	name: 'FormManageDocument',

	/**
	 * Components
	 */
	components: {
		Form,
		FormBody,
		FormGroup,
		FormStatus,
		FormActions,
		Checkboxes,
		Icon,
		Grid,
		GridColumn,
		Field,
		Button,
		FieldFile,
		FieldSelect,
		FieldCheckbox,
		FieldDatepicker
	},

	/**
	 *Props
	 */
	props: {
		data: {
			type: Object,
			default: () => {}
		},
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
			
			authors: '',
			primaryFileName: '',
			primaryFile: '',
			appendFiles: '',
			formData: {},
			formMetadata: {},
			ownersList: [],
			organizationsOptions: [],
			documentConfirmDeleteMessage: 'Are you sure you want to delete this document?',
		};
	},
	
	/**
	 * Methods
	 */
	computed: {
		documentId() {
			return this.data._id
		}
	},

	/**
	 * Methods
	 */
	methods: {	
		async getDropdownOptions() {
			const accounts = await accountsService.getAccountsList();
			const organizations = await organizationsService.getOrganizationsList();
			
			this.ownersList = accounts;
			this.organizationsOptions = organizations;
		},
		parseDataToForm() {
			if (!this.data) return

			const {
				name,
				owner,
				visible,
				locked,
				organizations,
				metadata: {
					authors,
					journal,
					doi,
					createdAt,
					publisher
				},
				files
			} = this.data;

			// Populate authors
			this.authors = authors.reduce((acc, item) => {
				const author = `
${item.name} ${item.email ? `(${item.email})` : `${''}` }
${item.affiliations.join(`\n`)}`
				return acc + '\n' + author
			}, '').trim();

			// Populate metadata
			this.formMetadata.journal = journal;
			this.formMetadata.publisher = publisher;
			this.formMetadata.createdAt = createdAt;
			this.formMetadata.doi = doi;
			
			// Populate form data
			this.formData = {
				name,
				organizations: organizations.map(organization => organization._id),
				visible,
				locked,
				owner: owner._id
			};

			// Populate files
			this.primaryFileName = files[0].filename;
			this.primaryFile = [files[0]];
			this.appendFiles = files.filter((_, index) => index > 0);
		},
		resetForm() {
			this.loading = false;
			this.error = false;
			this.success = false;
			this.message = '';
		},
		async handleFormSubmit() {
			this.resetForm();
			this.loading = true;
			
			try {
				await documentsService.updateDocument(this.documentId, this.formData);
				await documentsService.updateDocumentMetadata(this.documentId, this.formMetadata);
				
				this.success = true;
				this.message = `${this.formData.name} has been updated!`;
			} catch (error) {
				this.error = true;
				this.message = error.message;
			}

			this.loading = false;
			ScrollHandler(this.$refs.form.$el);
		},
		async handleDocumentDelete() {
			const confirm = window.confirm(this.documentConfirmDeleteMessage);

			if (!confirm) return
			
			this.resetForm();
			
			try {
				await documentsService.deleteDocument(this.documentId);
				
				this.message = `${this.formData.name} has been deleted!`;
				this.$router.push('/documents');
			} catch (error) {
				this.error = true;
				this.message = error.message;
			}
		}
	},

	/**
	 * Created
	 */
	created () {
		this.getDropdownOptions();
		this.parseDataToForm();
	},
};
</script>
