<template>
	<div class="header">
		<div class="header__bar">
			<Logo></Logo>

			<nav class="header__nav">
				<ul>
					<li>
						<a href="#">Need Help?</a>
					</li>

					<li>
						<router-link to="/sign-in">
							<Button href="/" alt>Sign In</Button>
						</router-link>
					</li>

					<li>
						<router-link to="/sign-up">
							<Button href="/" alt>Sign Up</Button>
						</router-link>
					</li>
				</ul>
			</nav><!-- /.header__nav -->
		</div><!-- /.header__bar -->
	</div><!-- /.header -->
</template>

<script>
import Button from '@/components/button/button';
import Logo from '@/components/logo/logo';

export default {
	name: 'Header',

	components: {
		Button,
		Logo
	}
}
</script>
