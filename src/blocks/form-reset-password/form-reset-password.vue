<template>
	<div class="form form--profile">
		<form action="?" method="post" @submit.prevent="submit">
			<div class="form__head" :tabindex="0">
				<h5>Reset Your Password</h5>
			</div>
			<!-- /.form__head -->

			<div class="form__status form__status--error" v-if="submitStatus === 'ERROR'">
				<p v-for="(error, index) in errors" :key="index">{{ error }}</p>
			</div>
			<!-- /.form__status -->

			<div class="form__body">
				<div class="form__row">
					<Field
						:error="$v.password_current.$error || $v.password_new.$error"
						name="password"
						v-model.trim="password_current"
						type="password"
						placeholder="Enter Current Password"
					>
						<Icon name="password" color="currentColor" />

						Password <span>minimum 8 characters</span>
					</Field>
				</div>
				<!-- /.form__row -->

				<div class="form__row">
					<Field :error="$v.password_new.$error" name="password-confirm" v-model.trim="password_new" type="password" placeholder="Enter New Password">
					</Field>
				</div>
				<!-- /.form__row -->
			</div>
			<!-- /.form__body -->

			<div class="form__actions">
				<ul>
					<li>
						<Button :tabindex="0" type="submit">Reset Password</Button>
					</li>

					<li>
						<Button :tabindex="0" className="tertiary">Cancel</Button>
					</li>
				</ul>
			</div>
			<!-- /.form__actions -->
		</form>
	</div>
	<!-- /.form -->
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Field from '@/components/field/field';

export default {
	name: 'formResetPassword',

	data: function() {
		return {
			password_current: '',
			password_new: '',
			submitStatus: null,
			loading: false,
			errors: ['This is example error message']
		};
	},

	validations: {
		password_current: {
			required
		},
		password_new: {
			required,
			minLength: minLength(8)
		}
	},

	components: {
		Icon,
		Button,
		Field
	},

	methods: {
		submit() {
			this.$v.$touch();

			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR';
			} else {
				this.loading = true;

				setTimeout(() => {
					this.loading = false;
					this.$router.push({
						name: 'SignIn'
					});
				}, 1000);
			}
		}
	}
};
</script>
