<template>
	<div class="form form--sm">
		<form action="?" method="post" @submit.prevent="submit">
			<div class="form__head" tabindex="0">
				<h2>Sign Up</h2>

				<p>DataSeer promotes open data sharing with AI powered tools for linking data to research texts</p>
			</div>
			<!-- /.form__head -->

			<div class="form__statuses" v-if="!loading && submitStatus">
				<div class="form__status form__status--error" v-if="submitStatus === 'ERROR'">
					<p v-for="(error, index) in errors" :key="index">{{ error }}</p>
				</div>
				<!-- /.form__status -->
			</div>
			<!-- /.form__status -->

			<div class="form__body">
				<div class="form__row">
					<Field :error="$v.name.$error" name="full-name" v-model.trim="name" type="text" placeholder="Enter">
						<Icon name="user" color="currentColor" />

						Full Name
					</Field>
				</div>
				<!-- /.form__row -->

				<div class="form__row">
					<Field :error="$v.email.$error" name="email" v-model.trim="email" type="text" placeholder="Enter">
						<Icon name="email" color="currentColor" />

						Email Address
					</Field>
				</div>
				<!-- /.form__row -->

				<div class="form__row">
					<Field
						:error="$v.password.$error || $v.password_confirm.$error"
						name="password"
						v-model.trim="password"
						type="password"
						placeholder="Enter"
					>
						<Icon name="password" color="currentColor" />

						Password <span>minimum 8 characters</span>
					</Field>

					<Field :error="$v.password_confirm.$error" name="password-confirm" v-model.trim="password_confirm" type="password" placeholder="Confirm">
					</Field>
				</div>
				<!-- /.form__row -->

				<div class="form__row">
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
				</div>
				<!-- /.form__row -->
			</div>
			<!-- /.form__body -->

			<div class="form__actions">
				<ul>
					<li>
						<Button tabindex="0" type="submit">Sign Up</Button>
					</li>

					<li>
						<Button tabindex="0" className="tertiary">Cancel</Button>
					</li>
				</ul>
			</div>
			<!-- /.form__actions -->

			<div class="form__message">
				<p>
					Already have an account?

					<router-link tabindex="0" to="/sign-in">Sign in</router-link>
				</p>
			</div>
			<!-- /.form__message -->
		</form>
	</div>
	<!-- /.form -->
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

import Button from '@/components/button/button';
import Field from '@/components/field/field';
import FieldSelect from '@/components/field-select/field-select';
import Icon from '@/components/icon/icon';

export default {
	name: 'FormSignUp',

	components: {
		Button,
		Field,
		Icon,
		FieldSelect
	},

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
