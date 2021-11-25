<template>
	<div class="form form--edit">
		<div class="form__body">
			<div class="form__group">
				<h4>Document Info</h4>

				<Grid columnGap="large" rowGap="small">
					<GridColumn size="half">
						<Field type="textarea" size="medium" placeholder="Role Name" v-model="documentTitle" name="Document Title">
							<Icon name="document" color="currentColor" />

							Document Title
						</Field>

						<FieldSelect
							placeholder="Select Owner"
							multiple
							v-model="owner"
							:options="[
								{
									value: 'Laura Leadauthor'
								},
								{
									value: 'Some Username'
								},
								{
									value: 'Owner 3'
								},
								{
									value: 'Owner 4'
								},
								{
									value: 'Owner 5'
								},
								{
									value: 'Owner 6'
								}
							]"
						>
							<Icon name="document" color="currentColor" />

							Document Owner(s)
						</FieldSelect>

						<FieldSelect
							:options="[
								{
									value: 'ASAP'
								},
								{
									value: 'ASAP & MJFF'
								},
								{
									value: 'American Chemistry Society'
								},
								{
									value: 'DataSeer'
								},
								{
									value: 'University of Manchester'
								},
								{
									value: 'University of Washington'
								}
							]"
							multiple
							v-model="organization"
						>
							<Icon name="document" color="currentColor" />

							Document Owner(s)
						</FieldSelect>
					</GridColumn>

					<GridColumn size="half">
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

						<Field placeholder="Role Name" v-model="doi" name="DOI">
							<Icon name="book" color="currentColor" />

							DOI
						</Field>
					</GridColumn>

					<GridColumn>
						<Field type="textarea" size="large" placeholder="Authors" v-model="documentAuthors" name="Authors">
							<Icon name="user" color="currentColor" />

							Authors
						</Field>
					</GridColumn>
				</Grid>
			</div>
			<!-- /.form__group -->

			<div class="form__group">
				<h4>Files</h4>

				<Grid columnGap="large" rowGap="small">
					<GridColumn size="half">
						<Field placeholder="Enter Display Name" v-model="primaryFileName" name="Display Name">
							<Icon name="document" color="currentColor" />

							Primary File Display Name
						</Field>

						<FieldFile v-model="primaryFile" accept=".docx, .pdf" name="primaryFile" buttonText="Upload New Version" alt>
							<template #label>
								<Icon name="document_new" color="currentColor" />

								Primary File
							</template>
						</FieldFile>
					</GridColumn>

					<GridColumn size="half">
						<FieldFile v-model="appendFiles" name="appendFiles" buttonText="Upload Files" multiple alt>
							<template #label>
								<Icon name="document_new" color="currentColor" />

								Append File(s)
							</template>
						</FieldFile>
					</GridColumn>
				</Grid>
			</div>
			<!-- /.form__group -->

			<div class="form__group">
				<h4>Settings</h4>

				<div class="checkboxes checkboxes--vertical">
					<ul>
						<li>
							<FieldCheckbox name="isActive" v-model="isActive" isToggle>Organization Is Active</FieldCheckbox>
						</li>

						<li>
							<FieldCheckbox name="isLocked" v-model="isLocked" isToggle>Organization Is Not Locked</FieldCheckbox>
						</li>
					</ul>
				</div>
			</div>
			<!-- /.form__group -->
		</div>
		<!-- /.form__body -->

		<div class="form__actions">
			<ul>
				<li>
					<Button>Save Changes</Button>
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
			</ul>
		</div>
		<!-- /.form__actions -->
	</div>
	<!-- /.form -->
</template>

<script>
/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Grid, { GridColumn } from '@/components/grid/grid';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import FieldFile from '@/components/field-file/field-file';
import FieldDatepicker from '@/components/field-datepicker/field-datepicker';
import FieldSelect from '@/components/field-select/field-select';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

export default {
	/**
	 * Name
	 */
	name: 'FormManageDocument',

	/**
	 * Components
	 */
	components: {
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
	 * Data
	 */
	data: function() {
		return {
			documentTitle:
				'Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study',
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
			publishDate: 1615888800000,
			doi: '10.2196/15443',
			owner: [
				{
					value: 'Laura Leadauthor'
				},
				{
					value: 'Some Username'
				}
			],
			organization: [
				{
					value: 'ASAP'
				}
			],
			primaryFileName: 'My Changed File Name',
			primaryFile: '',
			appendFiles: '',
			isActive: true,
			isLocked: false
		};
	}
};
</script>
