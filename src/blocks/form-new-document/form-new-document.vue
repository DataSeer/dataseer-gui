<template>
	<div class="form form--new-document">
		<form action="?" method="post" @submit.prevent="onSubmit">
			<div class="form__head form__head--center">
				<h2>Upload Your Research Text</h2>

				<p>
					DataSeer will process the document and highlight passages which may need links to a
					dataset, code, lab materials, or protocol
				</p>
			</div>
			<!-- /.form__head -->

			<div class="form__statuses" v-if="errors">
				<div class="form__status form__status--error">
					<p>{{ errorMessage }}</p>
				</div>
				<!-- /.form__status -->
			</div>
			<!-- /.form__statuses -->

			<div class="form__body">
				<Grid rowGap="medium">
					<GridColumn>
						<FieldFile
							v-model="primaryFile"
							accept=".docx, .pdf"
							name="primaryFile"
							:error="errors"
						>
							<template #label>
								<Icon name="document_new" color="currentColor" />

								Select Your Primary File
							</template>

							<template #helptext> Supported formats: <strong>PDF, docx</strong> </template>
						</FieldFile>
					</GridColumn>

					<GridColumn>
						<FieldFile v-model="additionalFiles" name="additionalFiles" multiple="multiple">
							<template #label>
								<Icon name="documents" color="currentColor" />

								Select Additional Support Files <em>Optional</em>
							</template>

							<template #helptext>
								All file formats supported
							</template>
						</FieldFile>
					</GridColumn>
				</Grid>

				<div class="form__row">
					<div class="checkboxes checkboxes--center">
						<ul>
							<FieldCheckbox name="checkbox" @onChange="onCheckboxChange">
								This is a new version of an article DataSeer has already assessed
							</FieldCheckbox>
						</ul>
					</div>
					<!-- /.checkboxes -->
				</div>
				<!-- /.form__row -->
			</div>
			<!-- /.form__body -->

			<div class="form__actions">
				<ul>
					<li>
						<Button tabindex="0" type="submit">Upload Documents</Button>
					</li>

					<li>
						<Button tabindex="0" className="tertiary">Cancel</Button>
					</li>
				</ul>
			</div>
			<!-- /.form__actions -->
		</form>
	</div>
	<!-- /.form -->
</template>

<script>
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import FieldFile from '@/components/field-file/field-file';
import Grid, { GridColumn } from '@/components/grid/grid';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

export default {
	name: 'FormNewDocument',

	data: function() {
		return {
			primaryFile: '',
			additionalFiles: '',
			errorMessage: '',
			checkbox: false,
			errors: false
		};
	},

	components: {
		Grid,
		GridColumn,
		Icon,
		Button,
		FieldFile,
		FieldCheckbox
	},

	methods: {
		onCheckboxChange(event) {
			const name = event.target.name;
			this[name] = event.target.checked;
		},
		onSubmit() {
			if (!this.primaryFile) {
				this.errors = true;
				this.errorMessage = 'Example error message';
			}
		}
	}
};
</script>
