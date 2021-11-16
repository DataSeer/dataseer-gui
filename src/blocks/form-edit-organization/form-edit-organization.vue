<template>
	<div class="form form--edit">
		<div class="form__body">
			<div class="form__group">
				<h4>American Chemistry Society</h4>

				<div class="form__row">
					<div class="form__col">
						<Field :value="name" name="Organization Name" readonly>
							<Icon name="organization" color="currentColor" />

							Organization Name
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
import Button from '@/components/button/button';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

export default {
	/**
	 * Name
	 */
	name: 'FormEditOrganization',

	/**
	 * Components
	 */
	components: {
		Icon,
		Field,
		Button,
		FieldCheckbox
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			name: 'American Chemistry Society',
			isActive: true,
			isLocked: false
		};
	}
};
</script>
