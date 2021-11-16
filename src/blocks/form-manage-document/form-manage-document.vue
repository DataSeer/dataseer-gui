<template>
	<div class="form form--edit">
		<div class="form__body">
			<div class="form__group">
				<h4>Document Info</h4>

				<div class="form__row">
					<div class="form__col form__col--1of2">
						<Field type="textarea" placeholder="Role Name" v-model="documentTitle" name="Document Title">
							<Icon name="document" color="currentColor" />

							Document Title
						</Field>

						<FieldSelect
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
							multiple
							v-model="owner"
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
						<!-- /# -->
					</div>
					<!-- /.form__col -->

					<div class="form__col form__col--1of2">
						<Field placeholder="Role Name" v-model="journal" name="Journal">
							<Icon name="key" color="currentColor" />

							Journal
						</Field>

						<Field placeholder="Role Name" v-model="publisher" name="Publisher">
							<Icon name="key" color="currentColor" />

							Publisher
						</Field>

						<Field placeholder="Role Name" v-model="publishDate" name="Publish Date">
							<Icon name="key" color="currentColor" />

							Publish Date
						</Field>

						<Field placeholder="Role Name" v-model="doi" name="DOI">
							<Icon name="key" color="currentColor" />

							DOI
						</Field>
					</div>
					<!-- /.form__col -->
				</div>
				<!-- /.form__row -->
			</div>
			<!-- /.form__group -->

			<div class="form__group">
				<h4>Settings</h4>

				<div class="form__row">
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
					<!-- /.checkboxes -->
				</div>
				<!-- /.form__row -->
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
import Field from '@/components/field/field';
import FieldSelect from '@/components/field-select/field-select';
import Button from '@/components/button/button';
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
		Field,
		Button,
		FieldSelect,
		FieldCheckbox
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			documentTitle:
				'Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study',
			journal: 'Journal of Medical Internet Research',
			publisher: 'JMIR Publications Inc.',
			publishDate: '2021-03-16',
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
			isActive: true,
			isLocked: false
		};
	}
};
</script>
