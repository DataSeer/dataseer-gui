<template>
	<div class="form form--profile">
		<form action="?" method="post">
			<div class="form__head" tabindex="0">
				<h5>Your Profile</h5>
			</div><!-- /.form__head -->
			
			<div class="form__body">
				<FormRow 
					name="full-name"
					tabindex="0"
					readonly
					type="text"
					:value="fullName"
				>
					<Icon name="user" color="currentColor" />

					Full Name
				</FormRow>

				<FormRow 
					name="email"
					tabindex="0"
					readonly
					type="text"
					:value="userData.email"
				>
					<Icon name="email" color="currentColor" />

					Email Address
				</FormRow>

				<FormRow 
					name="organization"
					tabindex="0"
					readonly
					type="text"
					:value="userData.organization"
				>
					<Icon name="organization" color="currentColor" />

					Institution/Organization
				</FormRow>
			</div><!-- /.form__body -->
		</form>
	</div><!-- /.form -->
</template>

<script>
import FormRow from '@/components/form-row/form-row'
import Icon from '@/components/icon/icon';

export default {
  name: 'FormProfile',
  data: function() {
    return {
      userData: {
        firstname: 'Laura',
        lastname: 'Leadauthor',
        email: 'leadauthor@toh.ca',
        organization: 'University of Ottawa'
      }
    }
  },
  computed: {
    fullName: function() {
      return this.userData.firstname + ' ' + this.userData.lastname
    }
  },
  components : {
    FormRow,
    Icon
  }
}
</script>
