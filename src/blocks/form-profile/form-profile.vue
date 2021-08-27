<template>
	<div class="form form--profile">
		<form action="?" method="post">
			<div class="form__head">
				<h5>Your Profile</h5>
			</div><!-- /.form__head -->
			
			<div class="form__body">
				<FormRow name="full-name">
					<template #label>
						<Icon name="user" />
						Full Name
					</template>
					
					<input tabindex="-1" id="full-name" type="text" class="field" readonly :value="fullName">
				</FormRow>

				<FormRow name="email">
					<template #label>
						<Icon name="email" />
						Email Address
					</template>
					
					<input tabindex="-1" id="email" type="text" class="field" readonly :value="userData.email">
				</FormRow>

				<FormRow name="organization">
					<template #label>
						<Icon name="organization" />
						Institution/Organization
					</template>
					
					<input tabindex="-1" id="organization" type="text" class="field" readonly :value="userData.organization">
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
