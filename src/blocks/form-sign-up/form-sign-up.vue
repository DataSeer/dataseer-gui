<template>
	<Form className="form--sm" @submit.prevent="submit">
		<FormHead centered>
			<h2>Sign Up</h2>

			<p>DataSeer promotes open data sharing with AI powered tools for linking data to research texts</p>
		</FormHead>

		<div class="form__status form__status--error" v-if="submitStatus === 'ERROR' && !loading">
			<p v-for="(error, index) in errors" :key="index">{{ error }}</p>
		</div>
		<!-- /.form__status -->

		<FormBody>
			<Field :error="$v.name.$error" name="full-name" v-model.trim="name" type="text" placeholder="Enter">
				<Icon name="user" color="currentColor" />

				Full Name
			</Field>

			<Field :error="$v.email.$error" name="email" v-model.trim="email" type="text" placeholder="Enter">
				<Icon name="email" color="currentColor" />

				Email Address
			</Field>

			<Field :error="$v.password.$error || $v.password_confirm.$error" name="password" v-model.trim="password" type="password" placeholder="Enter">
				<Icon name="password" color="currentColor" />

				Password <span>minimum 8 characters</span>
			</Field>

			<Field :error="$v.password_confirm.$error" name="password-confirm" v-model.trim="password_confirm" type="password" placeholder="Confirm">
			</Field>

			<FieldSelect
				:error="$v.organization.$error"
				name="organization"
				v-model.trim="organization"
				:options="[
					{
						value: 'Organization 0'
					},
					{
						value: 'Organization 1'
					},
					{
						value: 'Organization 2'
					}
				]"
				placeholder="Select"
			>
				<Icon name="organization" color="currentColor" />

				Institution/Organization
			</FieldSelect>
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
import Form, { FormActions, FormMessage, FormHead, FormBody } from '@/components/form/form';

export default {
	/**
	 * Name
	 */
	name: 'FormSignUp',

	/**
	 * Components
	 */
	components: {
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
			name: '',
			email: '',
			password: '',
			password_confirm: '',
			organization: '',
			submitStatus: null,
			loading: false,
			errors: ['Oops! This email address is already registered']
		};
	},

	/**
	 * Validations
	 */
	validations: {
		name: {
			required,
			minLength: minLength(2)
		},
		email: {
			required,
			email
		},
		password: {
			required,
			minLength: minLength(8)
		},
		password_confirm: {
			required,
			sameAsPassword: sameAs('password')
		},
		organization: {
			required
		}
	},

	/**
	 * Methods
	 */
	methods: {
		submit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR';
			} else {
				this.loading = true;
				setTimeout(() => {
					this.submitStatus = 'OK';
					this.loading = false;
					this.$router.push({
						name: 'SignIn',
						params: { success: true }
					});
				}, 500);
			}
		}
	}
};
</script>
