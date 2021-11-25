<template>
	<div class="form form--edit">
		<div class="form__body">
			<div class="form__group">
				<h4>johnsmith@xzynetworks.com</h4>

				<div class="form__row">
					<div class="form__col">
						<Field placeholder="Full Name" :value="fullName" name="Full Name">
							<Icon name="user" color="currentColor" />

							Full Name
						</Field>
					</div>
					<!-- /.form__col -->
				</div>
				<!-- /.form__row -->

				<div class="form__row">
					<div class="form__col">
						<FieldSelect
							placeholder="Role"
							v-model="role"
							:options="[
								{
									value: 'Curator'
								},
								{
									value: 'Annotator'
								},
								{
									value: 'Standard User'
								},
								{
									value: 'Visitor'
								}
							]"
						>
							<Icon name="key" color="currentColor" />

							Role
						</FieldSelect>
					</div>
					<!-- /.form__col -->
				</div>
				<!-- /.form__row -->

				<div class="form__row">
					<div class="form__col">
						<FieldSelect
							placeholder="Role"
							multiple
							v-model="organization"
							:options="[
								{
									value: 'University of Ottowa'
								},
								{
									value: 'American Journalist'
								},
								{
									value: 'DataSeer'
								},
								{
									value: 'ASAP & MJFF'
								},
								{
									value: 'American Chemistry Society'
								},
								{
									value: 'University of Manchester'
								}
							]"
						>
							<Icon name="organization" color="currentColor" />

							Role
						</FieldSelect>
					</div>
					<!-- /.form__col -->
				</div>
				<!-- /.form__row -->
			</div>
			<!-- /.form__group -->

			<div class="form__group">
				<h4>Settings</h4>

				<div class="form__row">
					<div class="form__col">
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
					<!-- /.form__col -->
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
	name: 'FormEditAccount',

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
			fullName: 'John Smith',
			email: 'johnsmith@xzynetworks.com',
			role: {
				value: 'Standard User'
			},
			organization: [
				{
					value: 'University of Ottowa'
				}
			],
			isActive: true,
			isLocked: false
		};
	}
};
</script>
