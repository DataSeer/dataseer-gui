<template>
	<div class="form form--profile">
		<form action="?" method="post">
			<div class="form__head">
				<h5>Reset Your Password</h5>
			</div><!-- /.form__head -->
			
			<div class="form__body">
				<FormRow name="password">
					<template #label>
						<Icon name="password" />
						Password <span>minimum 8 characters</span>
					</template>
					
					<input id="password" type="password" class="field" placeholder="Enter Current Password">
					
					<input type="password" class="field" placeholder="Enter New Password">
				</FormRow>
			</div><!-- /.form__body -->
			
			<div class="form__actions">
				<ul>
					<li>
						<Button type="submit">Reset Password</Button>
					</li>
					
					<li>
						<Button alt>Cancel</Button>
					</li>
				</ul>
			</div><!-- /.form__actions -->
		</form>
	</div><!-- /.form -->
</template>

<script>
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import FormRow from '@/components/form-row/form-row'

export default {
  name: 'formResetPassword',
  components: {
    Icon,
    Button,
    FormRow
  }
}
</script>
