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
					<Field name="email" :tabindex="0" readonly type="text" :value="email">
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
						:value="organization"
					>
						<Icon name="organization" color="currentColor" />

						Institution/Organization
					</Field>
				</GridColumn>

				<GridColumn>
					<Field
						name="role"
						:tabindex="0"
						readonly
						type="text"
						:value="role"
					>
						<Icon name="key" color="currentColor" />

						Role
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
	
	computed: {
		fullName: function() {
			return this.$store.state.account.user?.fullname || ''
		},
		email: function() {
			return this.$store.state.account.user?.username || ''
		},
		organization: function() {
			return this.$store.state.account.user?.organizations.map(organization => organization.name)?.join(', ') || 'None'
		},
		role: function() {
			return this.$store.state.account.user?.role.label || ''
		},
		
	},

	components: {
		Grid,
		GridColumn,
		Icon,
		Form,
		Field,
		FormHead,
		FormBody
	},
};
</script>
