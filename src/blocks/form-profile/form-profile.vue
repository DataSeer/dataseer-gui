<template>
	<Form className="form--profile">
		<FormHead>
			<h5>Your Profile</h5>
		</FormHead>

		<FormBody>
			<Grid>
				<GridColumn>
					<Field name="full-name" :tabindex="0" readonly type="text" :value="fullName">
						<Icon name="user" color="currentColor" />

						Full Name
					</Field>
				</GridColumn>

				<GridColumn>
					<Field name="email" :tabindex="0" readonly type="text" :value="userData.email">
						<Icon name="email" color="currentColor" />

						Email Address
					</Field>
				</GridColumn>

				<GridColumn>
					<Field
						name="organization"
						:tabindex="0"
						readonly
						type="text"
						:value="userData.organization"
					>
						<Icon name="organization" color="currentColor" />

						Institution/Organization
					</Field>
				</GridColumn>
			</Grid>
		</FormBody>
	</Form>
</template>

<script>
import Field from '@/components/field/field';
import Icon from '@/components/icon/icon';
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormHead, FormBody } from '@/components/form/form';

export default {
	name: 'FormProfile',

	data: function() {
		return {
			userData: {
				firstname: 'Laura',
				lastname: 'Leadauthor',
				email: 'leadauthor@toh.ca',
				organization: 'University of Ottawa'
			}
		};
	},

	computed: {
		fullName: function() {
			return this.userData.firstname + ' ' + this.userData.lastname;
		}
	},

	components: {
		Grid,
		GridColumn,
		Icon,
		Form,
		Field,
		FormHead,
		FormBody
	}
};
</script>
