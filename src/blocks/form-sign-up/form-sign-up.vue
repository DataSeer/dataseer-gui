<template>
	<div class="form form--sm">
		<form action="?" method="post" @submit.prevent="submit">
			<div class="form__head">
				<h2>Sign Up</h2>
				
				<p>DataSeer promotes open data sharing with AI powered tools for linking data to research texts </p>
			</div><!-- /.form__head -->

			<div class="form__statuses" v-if="!loading && submitStatus">
				<div class="form__status form__status--error" v-if="submitStatus === 'ERROR'">
					<p v-for="(error, index) in errors" :key="index">{{error}}</p>
				</div><!-- /.form__status -->
			</div><!-- /.form__status -->
			
			<div class="form__body">
				<FormRow :error="$v.name.$error" name="full-name">
					<template #label>
						<Icon name="user" />
						Full Name
					</template>
					
					<input id="full-name" type="text" class="field" v-model.trim="name" placeholder="Enter">
				</FormRow>

				<FormRow :error="$v.email.$error" name="email">
					<template #label>
						<Icon name="email" />
						Email Address
					</template>
					
					<input id="email" type="text" class="field" v-model.trim="email" placeholder="Enter">
				</FormRow>

				<FormRow :error="$v.password.$error || $v.password_confirm.$error" name="password">
					<template #label>
						<Icon name="password" />
						Password <span>minimum 8 characters</span>
					</template>
					
					<input id="password" type="password" class="field" v-model.trim="password" placeholder="Enter">
					
					<input type="password" class="field" v-model.trim="password_confirm" placeholder="Confirm">
				</FormRow>

				<FormRow :error="$v.organization.$error" name="organization">
					<template #label>
						<Icon name="organization" />
						Institution/Organization
					</template>
					
					<div class="select">
						<select id="organization" v-model.trim="organization">
							<option disabled selected value="">Select</option>
							
							<option value="option-1">Option 1</option>
							
							<option value="option-2">Option 2</option>
							
							<option value="option-3">Option 3</option>
						</select>
					</div><!-- /.select -->
				</FormRow>
			</div><!-- /.form__body -->
			
			<div class="form__actions">
				<ul>
					<li>
						<Button type="submit">Sign Up</Button>
					</li>
					
					<li>
						<Button alt>Cancel</Button>
					</li>
				</ul>
			</div><!-- /.form__actions -->
			
			<div class="form__message">
				<p>
					Already have an account?
					
					<router-link to="/sign-in">
						Sign in
					</router-link>
				</p>
			</div><!-- /.form__message -->
		</form>
	</div><!-- /.form -->
</template>

<script>
	import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

	import Button from '@/components/button/button';
	import FormRow from '@/components/form-row/form-row';
	import Icon from '@/components/icon/icon';

	export default {
		name: 'FormSignUp',

		components: {
			Button,
			FormRow,
			Icon
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
			}
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
					this.submitStatus = 'ERROR'
				} else {
					this.loading = true;
					setTimeout(() => {
						this.submitStatus = 'OK'
						this.loading = false;
						this.$router.push({
							name: 'SignIn', params: {success: true}
						})
					}, 500)
				}
			}
		},
	}
</script>
