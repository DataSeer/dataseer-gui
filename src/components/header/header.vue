<template>
	<div class="header" :class="{ 'is-menu-expanded': showMobileMenu }">
		<div tabindex="0" class="header__bar" aria-label="main header bar">
			<Shell>
				<div class="header__bar-inner">
					<Logo />

					<navTrigger @onClick="toggleMenu" />

					<nav class="nav">
						<ul>
							<li>
								<navAccount></navAccount>
							</li>
						</ul>
					</nav> <!-- /.nav -->
				</div> <!-- /.header__bar-inner -->
			</Shell> <!-- /.shell -->
		</div> <!-- /.header__bar -->

		<portal-target name="subheader" />
	</div> <!-- /.header -->
</template>

<script>
import Logo from '@/components/logo/logo';
import Shell from '@/components/shell/shell';
import navAccount from '@/components/nav-account/nav-account';
import navTrigger from '@/components/nav-trigger/nav-trigger';

export default {
	name: 'Header',

	data: function() {
		return {
			showMobileMenu: false
		};
	},

	components: {
		Logo,
		Shell,
		navTrigger,
		navAccount
	},

	methods: {
		toggleMenu() {
			this.showMobileMenu = !this.showMobileMenu;
		}
	}
};
</script>
