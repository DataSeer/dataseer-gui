<template>
	<Form className="form--sm" @submit.prevent="handleSubmit" :loading="loading">
		<FormHead centered>
			<h2>Sign In</h2> 

			<p>
				DataSeer promotes open data sharing with AI powered tools for linking data to research texts
			</p>
		</FormHead>

		<div
			v-if="this.$store.state.account.status.failedLogin"
			class="form__status form__status--error"
		>
			<div class="form__status-inner">
				<p>{{this.$store.state.account.status.message}}</p>
			</div><!-- /.form__Status-inner -->
		</div><!-- /.form__status -->

		<FormBody>
			<Grid rowGap="small">
				<GridColumn>
					<Field
						:error="$v.email.$error"
						name="email"
						v-model.trim="email"
						type="text"
						placeholder="Email Address"
					>
						<Icon name="email" color="currentColor" />

						Email Address
					</Field>
				</GridColumn>

				<GridColumn>
					<Field
						:error="$v.password.$error"
						name="password"
						v-model.trim="password"
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
			<p>Forgot your password? <a href="#">Reset it</a></p>

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
import router from '@/router';

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
			email: '',
			password: '',
			loading: false
		};
	},

	/**
	 * Com
	 */
	computed: {
		failedLogin() {
			return this.$store.state.account.status.failedLogin
		}
	},

	/**
	 * Validations
	 */
	validations: {
		email: {
			required,
			email
		},
		password: {
			required,
			minLength: minLength(8)
		}
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('account', ['login']),
		handleLogout() {
			this.loading = true;
			this.logout();
		},
		async handleSubmit() {
			this.loading = true;
			this.$v.$touch();
			
			if (!this.$v.$invalid) {
				await this.login({
					username: this.email,
					password: this.password
				})

				this.loading = false;
				
				if (!this.failedLogin) {
					router.push('/profile');
				}
			}
		}
	},
};
</script>
