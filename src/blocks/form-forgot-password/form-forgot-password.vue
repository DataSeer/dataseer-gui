<template>
	<Form className="form--sm" @submit.prevent="handleSubmit" :loading="loading">
		<FormHead centered>
			<h2>Forgot password</h2>
			
			<p>Reset it now.</p>
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
						:error="$v.formData.username.$error"
						type="text"
						name="username"
						v-model.trim="formData.username"
						placeholder="Enter your email address here"
					>
						<Icon name="email" color="currentColor" />

						Email Address
					</Field>
				</GridColumn>
			</Grid>
		</FormBody>

		<FormActions centered>
			<li>
				<Button :tabindex="0" type="submit">Send Mail</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
/**
 * External Dependencies
 */
import { required, email } from 'vuelidate/lib/validators';

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
	name: 'FormForgotPassword',

	components: {
		Icon,
		Grid,
		GridColumn,
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
				username: '',
			},
			success: false,
			error: false,
			loading: false,
			message: ''
		};
	},

	validations: {
		formData: {
			username: {
				required,
				email
			},
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

			if (!this.$v.$invalid) {
				this.loading = true;
												
				try {
					await accountService.forgetPassword(this.formData.username);
					this.success = true;
					this.message = `An email has been sent at the following address: ${this.formData.username}`;
					
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
