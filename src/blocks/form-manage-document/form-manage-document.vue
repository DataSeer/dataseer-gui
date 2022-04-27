<template>
	<Form className="form--edit">
		<FormBody>
			<FormGroup title="Document Info">
				<Grid columnGap="large" columnSize="half">
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

						<FieldSelect
							placeholder="Select Owner"
							v-model="formData.owner"
							:options="ownersList"
						>
							<Icon name="user" color="currentColor" />

							Document Owner(s)
						</FieldSelect>

						<FieldSelect
							multiple
							v-model="formData.organizations"
							:options="organizationsOptions"
						>
							<Icon name="organization" color="currentColor" />

							Institution/Organization(s)
						</FieldSelect>
					</GridColumn>

					<GridColumn>
						<Field
							readonly
							name="Journal"
							v-model="journal"
						>
							<Icon name="book" color="currentColor" />

							Journal
						</Field>

						<Field
							readonly
							name="Publisher"
							v-model="publisher"
						>
							<Icon name="book" color="currentColor" />

							Publisher
						</Field>

						<FieldDatepicker
							readonly
							placeholder="From"
							v-model="publishDate"
						>
							<Icon name="book" color="currentColor" />

							Publish Date
						</FieldDatepicker>

						<Field
							readonly
							name="DOI"
							trailingIcon="refresh"
							v-model="doi"
						>
							<Icon name="book" color="currentColor" />

							DOI
						</Field>
					</GridColumn>

					<GridColumn fullwidth>
						<Field
							readonly
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
						<Field placeholder="Enter Display Name" v-model="primaryFileName" name="Display Name">
							<Icon name="document" color="currentColor" />

							Primary File Display Name
						</Field>

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
/**
 * Internal Dependencies
 */
import Checkboxes from '@/components/checkboxes/checkboxes';
import Form, { FormActions, FormBody, FormGroup } from '@/components/form/form';
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
			authors: '',
			
			primaryFileName: '',
			primaryFile: '',
			appendFiles: '',

			journal: '',
			publisher: '',
			publishDate: '',
			doi: '',

			formData: {},
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
			this.journal = journal;
			this.publisher = publisher;
			this.publishDate = createdAt;
			this.doi = doi;
			
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
		},
		async handleFormSubmit() {
			try {
				const res = await documentsService.updateDocument(this.documentId, this.formData);
				
				console.log(res);
			} catch (error) {
				console.log(error.message);
			}
		},
		async handleDocumentDelete() {
			const confirm = window.confirm(this.documentConfirmDeleteMessage);

			if (!confirm) return
			try {
				await documentsService.deleteDocument(this.documentId);
				
				this.$router.push('/documents');
			} catch (error) {
				console.log(error.message);
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
