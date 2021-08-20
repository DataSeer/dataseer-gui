<template>
	<div class="header">
		<div class="shell">
			<div class="header__bar">
				<Logo></Logo>

				<nav class="nav">
					<ul>
						<li class="nav__link">
							<a href="#">Need Help?</a>
						</li>

						<li>
							<nav class="nav-account">
								<ul>
									<li>
										<router-link class="btn btn--tertiary" to="/sign-in">
											Sign In
										</router-link>
									</li>
									
									<li>
										<router-link class="btn btn--secondary" to="/sign-up">
											Sign Up
										</router-link>
									</li>
								</ul>
							</nav><!-- /.nav -->
						</li>
					</ul>
				</nav><!-- /.nav -->
			</div><!-- /.header__bar -->
			
			<Subheader />
		</div><!-- /.shell -->
	</div><!-- /.header -->
</template>

<script>
import Logo from '@/components/logo/logo';
import Subheader from '@/components/subheader/subheader';

export default {
	name: 'Header',

	components: {
		Logo,
		Subheader
	}
}
</script>
