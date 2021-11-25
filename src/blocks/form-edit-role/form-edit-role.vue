<template>
	<div class="form form--edit">
		<div class="form__body">
			<div class="form__group">
				<h4>Annotator</h4>

				<div class="form__row">
					<div class="form__col">
						<Field placeholder="Role Name" :value="name" name="Role Name">
							<Icon name="key" color="currentColor" />

							Role Name
						</Field>
					</div>
					<!-- /.form__col -->
				</div>
				<!-- /.form__row -->

				<div class="form__row">
					<div class="form__col">
						<Field placeholder="Role Key" :value="key" name="Role Key">
							<Icon name="key" color="currentColor" />

							Role Key
						</Field>
					</div>
					<!-- /.form__col -->
				</div>
				<!-- /.form__row -->

				<div class="form__row">
					<div class="form__col">
						<Field placeholder="Role Weight" :value="weight" name="Role Weight">
							<Icon name="key" color="currentColor" />

							Role Weight
						</Field>
					</div>
					<!-- /.form__col -->
				</div>
				<!-- /.form__row -->

				<div class="form__row">
					<div class="form__col">
						<Field placeholder="Role Color" :value="color" name="Role Color">
							<Icon name="key" color="currentColor" />

							Role Color
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
import Button from '@/components/button/button';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

export default {
	/**
	 * Name
	 */
	name: 'FormEditRole',

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
			name: 'Annotator',
			key: 'Moderator',
			weight: '100',
			color: '#006AC9',
			isActive: true,
			isLocked: false
		};
	}
};
</script>
