<template>
	<Form className="form--sm" @submit.prevent="handleSubmit" :loading="loading">
		<FormHead centered>
			<h2>Sign In</h2> 

			<p>
				DataSeer promotes open data sharing with AI powered tools for linking data to research texts
			</p>
		</FormHead>

		<div
			v-if="error"
			class="form__status form__status--error"
		>
			<div class="form__status-inner">
				<p>{{message}}</p>
			</div><!-- /.form__Status-inner -->
		</div><!-- /.form__status -->

		<FormBody>
			<Grid rowGap="small">
				<GridColumn>
					<Field
						:error="$v.formData.email.$error"
						name="email"
						v-model.trim="formData.email"
						type="text"
						placeholder="Email Address"
					>
						<Icon name="email" color="currentColor" />

						Email Address
					</Field>
				</GridColumn>

				<GridColumn>
					<Field
						:error="$v.formData.password.$error"
						name="password"
						v-model.trim="formData.password"
						type="password"
						placeholder="Enter"
					>
						<Icon name="password" color="currentColor" />

						Password <span>minimum 8 characters</span>
					</Field>
				</GridColumn>
			</Grid>
		</FormBody>

		<FormActions centered>
			<li>
				<Button tabindex="0" type="submit">Sign In</Button>
			</li>

			<li>
				<Button tabindex="0" className="tertiary" type="button">Cancel</Button>
			</li>
		</FormActions>

		<FormMessage>
			<p>Forgot your password? <router-link tabindex="0" to="/forgot-password">Reset it</router-link></p>

			<p>Need an account? <router-link tabindex="0" to="/sign-up">Sign Up</router-link></p>
		</FormMessage><!-- /.form__message -->
	</Form>
</template>

<script>
/**
 * External Dependencies
 */
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Field from '@/components/field/field';
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormActions, FormMessage, FormHead, FormBody } from '@/components/form/form';

export default {
	/**
	 * Name
	 */
	name: 'FormSignIn',

	/**
	 * Components
	 */
	components: {
		Icon,
		Field,
		Button,
		Grid,
		GridColumn,
		Form,
		FormHead,
		FormBody,
		FormMessage,
		FormActions
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				email: '',
				password: ''
			},
			success: false,
			error: false,
			loading: false,
			message: ''
		};
	},

	/**
	 * Computed
	 */
	computed: {
		failedLogin() {
			return this.$store.state.account.status.failedLogin || false
		}
	},

	/**
	 * Validations
	 */
	validations: {
		formData: {
			email: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(8)
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('account', ['signin']),
		async handleSubmit() {
			this.loading = true;
			this.$v.$touch();
			
			if (this.$v.$invalid) return

			try {
				await this.signin({
					username: this.formData.email,
					password: this.formData.password
				})

				this.success = true,
				this.$router.push('/profile')
			} catch(e) {
				this.error = true
				this.message = e.message
			}
			
			this.loading = false;
		}
	},
};
</script>
