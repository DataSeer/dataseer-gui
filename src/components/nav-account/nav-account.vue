<template>
	<nav class="nav-account" :class="{ 'is-logged-in': getLogin }">
		<ul v-if="getLogin">
			<li>
				<DropDown>
					<template #header>
						<div class="dropdown__account">
							Administration

							<span class="dropdown__arrow"></span>
						</div>
						<!-- /.dropdown__account -->
					</template>

					<div class="dropdown__nav">
						<ul>
							<li>
								<router-link tabindex="0" to="/profile">
									<Icon name="user" color="CurrentColor" />

									Accounts
								</router-link>
							</li>

							<li>
								<router-link tabindex="0" to="/profile">
									<Icon name="key" color="CurrentColor" />

									Roles
								</router-link>
							</li>

							<li>
								<router-link tabindex="0" to="/profile">
									<Icon name="organization" color="CurrentColor" />

									Organizations
								</router-link>
							</li>
						</ul>

						<ul>
							<li>
								<router-link tabindex="0" to="/profile">
									<Icon name="database" color="CurrentColor" />

									Repo-Recommender
								</router-link>
							</li>

							<li>
								<router-link tabindex="0" to="/profile">
									<Icon name="list_alt" color="CurrentColor" />

									Go to Wiki
								</router-link>
							</li>

							<li>
								<router-link tabindex="0" to="/profile">
									<Icon name="refresh" color="CurrentColor" />

									Refresh Datatypes
								</router-link>
							</li>
						</ul>
					</div>
					<!-- /.dropdown__nav -->
				</DropDown>
			</li>

			<li>
				<router-link tabindex="0" to="/documents">documents</router-link>
			</li>

			<li>
				<DropDown>
					<template #header>
						<div class="dropdown__account">
							Carli C.

							<div class="dropdown__button">
								L

								<span class="dropdown__arrow"></span>
							</div>
							<!-- /.dropdown__button -->
						</div>
						<!-- /.dropdown__account -->
					</template>

					<div class="dropdown__nav">
						<ul>
							<li>
								<router-link tabindex="0" to="/profile">
									<Icon name="user" color="CurrentColor" />

									User Profile
								</router-link>
							</li>

							<li>
								<a tabindex="0" @click.prevent="login(false)">
									<Icon name="signout" color="CurrentColor" />

									Sign Out
								</a>
							</li>
						</ul>
					</div>
					<!-- /.dropdown__nav -->
				</DropDown>
			</li>
		</ul>

		<ul v-else>
			<li>
				<router-link tabindex="0" class="btn btn--tertiary" to="/sign-in">
					Sign In
				</router-link>
			</li>

			<li>
				<router-link tabindex="0" class="btn btn--secondary" to="/sign-up">
					Sign Up
				</router-link>
			</li>
		</ul>
	</nav>
	<!-- /.nav -->
</template>

<script>
import DropDown from '@/components/dropdown/dropdown';
import Icon from '@/components/icon/icon';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'navAccount',
	computed: {
		...mapGetters(['getLogin']),
	},

	methods: {
		...mapActions(['login']),
	},

	components: {
		Icon,
		DropDown,
	},
};
</script>
