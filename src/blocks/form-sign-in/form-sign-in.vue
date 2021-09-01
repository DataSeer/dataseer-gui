<template>
	<div class="form form--sm">
		<form action="?" method="post" @submit.prevent="submit">
			<div class="form__head" tabindex="0">
				<h2>Sign In</h2>
				
				<p>DataSeer promotes open data sharing with AI powered tools for linking data to research texts</p>
			</div><!-- /.form__head -->

			<div class="form__statuses" v-if="$route.params.success">
				<div class="form__status form__status--success">
					<p>Great! Your account is created, please sign in</p>
				</div><!-- /.form__status -->
			</div><!-- /.form__status -->
			
			<div class="form__body">
				<FormRow
					:error="$v.email.$error"
					name="email"
					v-model.trim="email"
					type="text"
					placeholder="Email Address"
				>
					<Icon name="email" color="currentColor" />

					Email Address
				</FormRow>
				
				<FormRow 
					:error="$v.password.$error"
					name="password"
					v-model.trim="password"
					type="password"
					placeholder="Enter"
				>
					<Icon name="password" color="currentColor" />

					Password <span>minimum 8 characters</span>
				</FormRow>
			</div><!-- /.form__body -->
			
			<div class="form__actions">
				<ul>
					<li>
						<Button tabindex="0" type="submit">Sign In</Button>
					</li>
					
					<li>
						<Button tabindex="0" className="tertiary">Cancel</Button>
					</li>
				</ul>
			</div><!-- /.form__actions -->

			<div class="form__message">
				<p>Forgot your password? <a href="#">Reset it</a></p>
				
				<p>Need an account? <router-link tabindex="0" to="/sign-up">Sign Up</router-link></p>
			</div><!-- /.form__message -->
		</form>
	</div><!-- /.form -->
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex'

import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import FormRow from '@/components/form-row/form-row'

export default {
	name: 'FormSignIn',

	components: {
		Button,
		FormRow,
		Icon
	},

	data: function() {
		return {
			email: '',
			password: '',
			loading: false
		}
	},

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

	methods: {
		...mapActions([
			'login'
		]),
		submit() {
			this.loading = true;
			this.$v.$touch();

			if (this.$v.$invalid) {
				setTimeout(() => {
					this.loading = false;
					console.log('FAIL')
				}, 500)
			} else {
				console.log('SUCCESS')
				this.loading = false;

				this.login(true);
				this.$router.push({
					name: 'Documents'
				})
			}
		}
	}
}
</script>

