<template>
	<Form className="form--sm" @submit.prevent="submit">
		<FormHead centered>
			<h2>Sign Up</h2>

			<p>
				DataSeer promotes open data sharing with AI powered tools for linking data to research texts
			</p>
		</FormHead>

		<div class="form__status form__status--error" v-if="submitStatus === 'ERROR' && !loading">
			<div class="form__status-inner">
				<p v-for="(error, index) in errors" :key="index">{{ error }}</p>
			</div><!-- /.form__status-inner -->
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
					type="text"
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
						:error="$v.formData.organization.$error"
						name="organization"
						v-model.trim="formData.organization"
						:options="organizations"
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
import { mapActions } from 'vuex';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Field from '@/components/field/field';
import Button from '@/components/button/button';
import FieldSelect from '@/components/field-select/field-select';
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormActions, FormMessage, FormHead, FormBody } from '@/components/form/form';
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
				fullname: '',
				username: '',
				password: '',
				confirm_password: '',
				organization: '',
			},
			organizations: [{
				value: ''
			}],
			submitStatus: null,
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
			},
			organization: {
				required
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('account', ['signup']),
		async submit() {
			this.$v.$touch();
			
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR';
			} else {
				this.loading = true;
				await this.ssignup(this.FormData);
			}
		},
		async getOrganizations() {
			const organizations = await organizationsService.getOrganizations()
			this.organizations = organizations.map(organization => {
				return {
					value: organization.name
				}
			});
		}
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.getOrganizations();
	},
};
</script>
