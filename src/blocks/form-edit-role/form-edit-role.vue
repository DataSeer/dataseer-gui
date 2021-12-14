<template>
	<div class="form form--edit">
		<div class="form__body">
			<div class="form__group">
				<h4>Annotator</h4>

				<Grid columnGap="large">
					<GridColumn>
						<Field placeholder="Role Name" :value="name" name="Role Name">
							<Icon name="key" color="currentColor" />

							Role Name
						</Field>
					</GridColumn>

					<GridColumn>
						<Field placeholder="Role Key" :value="key" name="Role Key">
							<Icon name="key" color="currentColor" />

							Role Key
						</Field>
					</GridColumn>

					<GridColumn>
						<Field placeholder="Role Weight" :value="weight" name="Role Weight">
							<Icon name="key" color="currentColor" />

							Role Weight
						</Field>
					</GridColumn>

					<GridColumn>
						<Field placeholder="Role Color" :value="color" name="Role Color">
							<Icon name="key" color="currentColor" />

							Role Color
						</Field>
					</GridColumn>
				</Grid>
			</div>
			<!-- /.form__group -->

			<div class="form__group">
				<h4>Settings</h4>

				<Grid columnGap="large">
					<GridColumn>
						<div class="checkboxes checkboxes--vertical">
							<ul>
								<li>
									<FieldCheckbox name="isActive" v-model="isActive" isToggle>
										Role Is {{ isActive ? 'Active' : 'Inactive'}}
									</FieldCheckbox>
								</li>

								<li>
									<FieldCheckbox name="isLocked" v-model="isLocked" isToggle>
										Role Is {{ isLocked ? 'Locked' : 'Not Locked'}}
									</FieldCheckbox>
								</li>
							</ul>
						</div>
						<!-- /.checkboxes -->
					</GridColumn>
				</Grid>
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
import Grid, { GridColumn } from '@/components/grid/grid';
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
		Grid,
		Icon,
		Field,
		Button,
		GridColumn,
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
