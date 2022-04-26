<template>
	<Form className="form--edit">
		<FormBody>
			<FormGroup title="Document Info">
				<Grid columnGap="large" columnSize="half">
					<GridColumn>
						<Field
							type="textarea"
							size="medium"
							placeholder="Role Name"
							v-model="documentTitle"
							name="Document Title"
						>
							<Icon name="document" color="currentColor" />

							Document Title
						</Field>

						<FieldSelect
							placeholder="Select Owner"
							multiple
							v-model="owner"
							:options="accountsOptions"
						>
							<Icon name="user" color="currentColor" />

							Document Owner(s)
						</FieldSelect>

						<FieldSelect
							multiple
							v-model="organization"
							:options="organizationsOptions"
						>
							<Icon name="organization" color="currentColor" />

							Institution/Organization(s)
						</FieldSelect>
					</GridColumn>

					<GridColumn>
						<Field placeholder="Role Name" v-model="journal" name="Journal">
							<Icon name="book" color="currentColor" />

							Journal
						</Field>

						<Field placeholder="Role Name" v-model="publisher" name="Publisher">
							<Icon name="book" color="currentColor" />

							Publisher
						</Field>

						<FieldDatepicker v-model="publishDate" placeholder="From">
							<Icon name="book" color="currentColor" />

							Publish Date
						</FieldDatepicker>

						<Field placeholder="Role Name" v-model="doi" name="DOI" trailingIcon="refresh">
							<Icon name="book" color="currentColor" />

							DOI
						</Field>
					</GridColumn>

					<GridColumn fullwidth>
						<Field
							type="textarea"
							size="large"
							placeholder="Authors"
							v-model="documentAuthors"
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
							<FieldCheckbox name="isActive" v-model="isActive" isToggle>
								Document Is {{ isActive ? 'Active' : 'Inactive'}}
							</FieldCheckbox>
							
							<FieldCheckbox name="isLocked" v-model="isLocked" isToggle>
								Document Is {{ isLocked ? 'Locked' : 'Not Locked'}}
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
				<Button type="button" className="tertiary">Cancel</Button>
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
import Form, { FormActions, FormBody, FormGroup } from '@/components/form/form';
import Icon from '@/components/icon/icon';
import Grid, { GridColumn } from '@/components/grid/grid';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import FieldFile from '@/components/field-file/field-file';
import FieldDatepicker from '@/components/field-datepicker/field-datepicker';
import FieldSelect from '@/components/field-select/field-select';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

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
			formData: {},
			documentTitle: 'Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study',
			documentAuthors: `Laura Leadauthor (leadauthor@toh.ca)
				Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
				Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
				Department of Innovation in Medical Education University of Ottawa, Ottawa, Canada
				Faculty of Medicine Francophone Affairs University of Ottawa, Ottawa, Canada

				Nicole Etherington
				Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
				Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada

				Sandy Lam
				Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
				Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada

				Maxime Lê
				Patient and Family Advisory Council The Ottawa Hospital, Ottawa, Canada

				Laurie Proulx
				Patient and Family Advisory Council The Ottawa Hospital, Ottawa, Canada

				Meghan Britton
				Main Operating Room The Ottawa Hospital, Ottawa, Canada

				Julie Kenna
				Main Operating Room The Ottawa Hospital, Ottawa, Canada

				Antoine Przybylak-Brouillard
				Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
				Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada

				Jeremy Grimshaw
				Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada

				Teodor Grantcharov
				Department of General Surgery University of Toronto, Toronto, Canada
				Li Ka Shing Knowledge Institute St. Michael's Hospital, Toronto, Canada

				Sukhbir Singh
				Department of Obstetrics, Gynecology, and Newborn Care University of Ottawa, Ottawa, Canada`,
			journal: 'Journal of Medical Internet Research',
			publisher: 'JMIR Publications Inc.',
			publishDate: '2022-02-23T12:17:50.578Z',
			doi: '10.2196/15443',
			owner: ['620cc2bfe38a8e20f8cddff2'],
			organization: ['61e18b9cec2a6e58a1ef4f83'],
			primaryFileName: 'My Changed File Name',
			primaryFile: '',
			appendFiles: '',
			isActive: true,
			isLocked: false,

			authors: [],
			accountsOptions: [],
			organizationsOptions: []
		};
	},

	/**
	 * Methods
	 */
	methods: {	
		async getDropdownOptions() {
			const accounts = await accountsService.getAccountsList();
			const organizations = await organizationsService.getOrganizationsList();
			
			this.accountsOptions = accounts;
			this.organizationsOptions = organizations;
		},
		parseDataToForm() {
			const {
				createdAt = '',
				owner: { id: owner  } = '',
				metadata: {
					journal,
					publisher,
					date_published,
					doi,
					authors
				},
				pdf: {
					filename : pdfFilename
				},
				visible,
				locked
			} = this.data
			
			this.formData = {
				owner,
				doi,
				journal,
				publisher,
				date_published,
				locked: locked,
				createdAt,
				
				pdfFilename,
				
				visible,
				locked
			}
		},
		handleFormSubmit() {
			
		},
		handleDocumentDelete() {
			
		}
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.getDropdownOptions();
		// this.parseDataToForm();
	},
};
</script>
