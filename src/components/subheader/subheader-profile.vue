<template>
	<div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
		<div class="subheader__left">
			<h3 id="subheader-title">
				<Icon name="user" />

				User Profile
			</h3>
		</div>
		<!-- /.subheader__left -->

		<div class="subheader__right">
			<Button className="tertiary" @click="exitProfile">Exit Profile</Button>
		</div>
		<!-- /.subheader__right -->
	</div>
	<!-- /.subheader__inner -->
</template>

<script>
import { mapActions } from 'vuex';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button.vue';

export default {
	name: 'SubheaderProfile',

	components: {
		Button,
		Icon
	},

	methods: {
		...mapActions(['setLogin']),
		...mapActions(['setCuretor']),
		exitProfile(event) {
			event.preventDefault();
			this.setLogin(false);
			this.setCuretor(false);

			this.$router.push({
				name: 'Documents'
			});
		}
	}
};
</script>
