<template>
	<Form className="form--profile" @submit.prevent="handleSubmit" :loading="loading">
		<FormHead>
			<h5>Reset Your Password</h5>
		</FormHead>

		<div class="form__status form__status--error" v-if="error">
			<div class="form__status-inner">
				<p>{{message}}</p>
			</div><!-- /.form__status__inner -->
		</div> <!-- /.form__status -->

		<div class="form__status form__status--success" v-if="success">
			<div class="form__status-inner">
				<p>{{message}}</p>
			</div><!-- /.form__status__inner -->
		</div> <!-- /.form__status -->

		<FormBody>
			<Grid rowGap="small">
				<GridColumn>
					<Field
						:error="$v.formData.$anyError"
						name="current_password"
						v-model.trim="formData.current_password"
						type="password"
						placeholder="Enter Current Password"
					>
						<Icon name="password" color="currentColor" />

						Password <span>minimum 8 characters</span>
					</Field>

					<Field
						:error="$v.formData.new_password.$error"
						name="new_password"
						v-model.trim="formData.new_password"
						type="password"
						placeholder="Enter New Password"
					/>

					<Field
						:error="$v.formData.confirm_new_password.$error"
						name="confirm_new_password"
						v-model.trim="formData.confirm_new_password"
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

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Field from '@/components/field/field';
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormHead, FormBody, FormActions } from '@/components/form/form';
import accountService from '@/services/account/auth-account';

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
			formData: {
				current_password: '',
				new_password: '',
				confirm_new_password: ''
			},
			success: false,
			error: false,
			loading: false,
			message: ''
		};
	},

	validations: {
		formData: {
			current_password: {
				required
			},
			new_password: {
				required,
				minLength: minLength(8)
			},
			confirm_new_password: {
				sameAsPassword: sameAs('new_password')
			}
		}
	},

	methods: {
		resetForm() {
			this.loading = false;
			this.success = false;
			this.error = false;
		},
		async handleSubmit() {
			this.$v.$touch();
			this.resetForm();

			if (!this.$v.$invalid) {
				this.loading = true;
				const data = {
					username: this.$store.state.account.user?.username,
					...this.formData
				}
								
				try {
					await accountService.resetPassword(data);
					this.success = true;
					this.message = "Password changed successfully.";
				} catch(e) {
					this.error = true;
					this.message = e.message;
				}
			} 

			this.loading = false;
		}
	}
};
</script>
