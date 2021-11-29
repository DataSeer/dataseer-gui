<template>
	<Form className="form--sm" @submit.prevent="submit">
		<FormHead centered>
			<h2>Sign In</h2>

			<p>DataSeer promotes open data sharing with AI powered tools for linking data to research texts</p>
		</FormHead>

		<div class="form__status form__status--success" v-if="$route.params.success">
			<p>Great! Your account is created, please sign in</p>
		</div>
		<!-- /.form__status -->

		<FormBody>
			<Field :error="$v.email.$error" name="email" v-model.trim="email" type="text" placeholder="Email Address">
				<Icon name="email" color="currentColor" />

				Email Address
			</Field>

			<Field :error="$v.password.$error" name="password" v-model.trim="password" type="password" placeholder="Enter">
				<Icon name="password" color="currentColor" />

				Password <span>minimum 8 characters</span>
			</Field>
		</FormBody>

		<FormActions centered>
			<li>
				<Button tabindex="0" type="submit">Sign In</Button>
			</li>

			<li>
				<Button tabindex="0" className="tertiary">Cancel</Button>
			</li>
		</FormActions>

		<FormMessage>
			<p>Forgot your password? <a href="#">Reset it</a></p>

			<p>Need an account? <router-link tabindex="0" to="/sign-up">Sign Up</router-link></p>
		</FormMessage>
		<!-- /.form__message -->
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
		...mapActions(['setLogin']),
		...mapActions(['setCurator']),
		submit() {
			this.loading = true;
			this.$v.$touch();

			if (this.$v.$invalid) {
				setTimeout(() => {
					this.loading = false;
					console.log('FAILED LOGIN');
				}, 500);
			} else {
				console.log('SUCCESS');
				this.loading = false;

				this.setCurator(this.email === 'curator@test.com');
				this.setLogin(true);
				this.$router.push({
					name: 'Documents'
				});
			}
		}
	}
};
</script>
