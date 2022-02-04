<template>
	<Form className="form--sm" @submit.prevent="handleSubmit" :loading="loading">
		<FormHead centered>
			<h2>Sign Up</h2>

			<p>
				DataSeer promotes open data sharing with AI powered tools for linking data to research texts
			</p>
		</FormHead>

		<div class="form__status form__status--error" v-if="error">
			<div class="form__status-inner">
				<p>{{message}}</p>
			</div><!-- /.form__status__inner -->
		</div> <!-- /.form__status -->

		<div class="form__status form__status--success" v-if="success">
			<div class="form__status-inner">
				<p>{{message}}</p>
			</div><!-- /.form__status__inner -->
		</div> <!-- /.form__status -->

		<FormBody>
			<Grid rowGap="small">
				<GridColumn>
					<Field
						:error="$v.formData.fullname.$error"
						name="fullname"
						v-model.trim="formData.fullname"
						type="text"
						placeholder="Enter"
					>
						<Icon name="user" color="currentColor" />

						Full Name
					</Field>
				</GridColumn>
				
				<Field
					:error="$v.formData.username.$error"
					name="username"
					v-model.trim="formData.username"
					type="email"
					placeholder="Enter"
				>
					<Icon name="email" color="currentColor" />

					Email Address
				</Field>

				<GridColumn>
					<Field
						:error="$v.formData.password.$error || $v.formData.confirm_password.$error"
						name="password"
						v-model.trim="formData.password"
						type="password"
						placeholder="Enter"
					>
						<Icon name="password" color="currentColor" />

						Password <span>minimum 8 characters</span>
					</Field>

					<Field
						name="password-confirm"
						v-model.trim="formData.confirm_password"
						type="password"
						placeholder="Confirm"
					>
					</Field>
				</GridColumn>

				<GridColumn>
					<FieldSelect
						name="organization"
						v-model="formData.organizations"
						:options="organizationsList"
						multiple
						placeholder="Select"
					>
						<Icon name="organization" color="currentColor" />

						Institution/Organization
					</FieldSelect>
				</GridColumn>
			</Grid>
		</FormBody>

		<FormActions centered>
			<li>
				<Button tabindex="0" type="submit">Sign Up</Button>
			</li>

			<li>
				<Button tabindex="0" className="tertiary">Cancel</Button>
			</li>
		</FormActions>

		<FormMessage>
			<p>
				Already have an account?

				<router-link tabindex="0" to="/sign-in">Sign in</router-link>
			</p>
		</FormMessage>
	</Form>
</template>

<script>
/**
 * External Dependencies
 */
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import FieldSelect from '@/components/field-select/field-select';
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormActions, FormMessage, FormHead, FormBody } from '@/components/form/form';
import accountService from '@/services/account/auth-account';
import organizationsService from '@/services/organizations/organizations';

export default {
	/**
	 * Name
	 */
	name: 'FormSignUp',

	/**
	 * Components
	 */
	components: {
		Grid,
		GridColumn,
		Icon,
		Form,
		Field,
		Button,
		FormHead,
		FormBody,
		FormMessage,
		FormActions,
		FieldSelect
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				username: '',
				fullname: '',
				password: '',
				confirm_password: '',
				organizations: ''
			},
			organizationsList: [
				{
					id: '',
					value: 'None'
				}
			],
			organizationsListDefault: {},
			success: false,
			error: false,
			loading: false,
			message: ''
		};
	},

	/**
	 * Validations
	 */
	validations: {
		formData: {
			fullname: {
				required,
				minLength: minLength(2)
			},
			username: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(8)
			},
			confirm_password: {
				required,
				sameAsPassword: sameAs('password')
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		resetForm() {
			this.loading = false;
			this.success = false;
			this.error = false;
		},
		async handleSubmit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.resetForm();
				this.loading = true;

				const data = {
					username: this.formData.username,
					fullname: this.formData.fullname,
					password: this.formData.password,
					confirm_password: this.formData.confirm_password,
					organizations: this.formData.organizations
						? this.formData.organizations.map((organization) => organization.value)
						: [this.organizationsListDefault[0].value],
					'g-recaptcha-response': ''
				};

				try {
					await window.grecaptcha
						.execute('6LfqazQeAAAAAM8oJnxDYOdca9iO_gnWUOZwvgku', { action: 'submit' })
						.then((token) => {
							data['g-recaptcha-response'] = token;
						});

					await accountService.signup(data);
					this.success = true;
					this.message = `Sign up has been completed! You can signin with username ${data.username} !`;
				} catch (e) {
					this.error = true;
					this.message = e.message;
				}
			}

			this.loading = false;
		},
		async getOrganizationsList() {
			const organizationsList = await organizationsService.getOrganizationsList();
			
			this.organizationsList = organizationsList;
			this.organizationsListDefault = organizationsList.filter(
				(entry) => entry.label === 'None'
			);
		}
	},

	/**
	 * Mounted
	 */
	created() {
		this.getOrganizationsList();
	}
};
</script>
