<template>
	<Form className="form--profile" @submit.prevent="handleSubmit" :loading="loading">
		<FormHead>
			<h5>Reset Your Password</h5>
		</FormHead>

		<div class="form__status form__status--error" v-if="submitStatus === 'ERROR'">
			<div class="form__status-inner">
				<p v-for="(error, index) in errors" :key="index">{{ error }}</p>
			</div><!-- /.form__status__inner -->
		</div>
		<!-- /.form__status -->

		<FormBody>
			<Grid rowGap="small">
				<GridColumn>
					<Field
						:error="formHasError"
						name="password"
						v-model.trim="password_current"
						type="password"
						placeholder="Enter Current Password"
					>
						<Icon name="password" color="currentColor" />

						Password <span>minimum 8 characters</span>
					</Field>

					<Field
						:error="$v.password_new.$error"
						name="password-new"
						v-model.trim="password_new"
						type="password"
						placeholder="Enter New Password"
					/>

					<Field
						:error="$v.password_confirm.$error"
						name="password-confirm-new"
						v-model.trim="password_confirm"
						type="password"
						placeholder="Confirm New Password"
					/>
				</GridColumn>
			</Grid>
		</FormBody>

		<FormActions>
			<li>
				<Button :tabindex="0" type="submit">Reset Password</Button>
			</li>

			<li>
				<Button :tabindex="0" className="tertiary" type="button">Cancel</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
/**
 * External Dependencies
 */
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Field from '@/components/field/field';
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormHead, FormBody, FormActions } from '@/components/form/form';

export default {
	name: 'formResetPassword',

	components: {
		Grid,
		GridColumn,
		Icon,
		Button,
		Field,
		Form,
		FormHead,
		FormBody,
		FormActions
	},

	data: function() {
		return {
			password_current: '',
			password_new: '',
			password_confirm: '',
			submitStatus: null,
			loading: false,
			errors: ['This is example error message']
		};
	},
	computed: {
		formHasError() {
			return this.$v.password_current.$error || this.$v.password_new.$error || this.$v.password_confirm.$error
		}
	},

	validations: {
		password_current: {
			required
		},
		password_new: {
			required,
			minLength: minLength(8)
		},
		password_confirm: {
			sameAsPassword: sameAs('password_new')
		}
	},

	methods: {
		...mapActions('account', ['resetPassword']),
		async handleSubmit() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.loading = true;
				
				await this.resetPassword({
					username: this.$store.state.account.user?.fullname,
					currentPassword: this.password_current,
					newPassword: this.password_new,
					confirmNewPassword: this.password_confirm
				});
			} 

			this.loading = false;
		}
	}
};
</script>
