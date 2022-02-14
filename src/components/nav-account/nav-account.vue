<template>
	<nav class="nav-account" :class="{ 'is-logged-in': isLoggedIn }">
		<ul v-if="isLoggedIn">
			<li v-if="userRoleWeight >= 100">
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
								<router-link tabindex="0" to="/accounts">
									<Icon name="user" color="CurrentColor" />

									Accounts
								</router-link>
							</li>

							<li v-if="userRoleWeight >= 1000">
								<router-link tabindex="0" to="/curator-roles">
									<Icon name="key" color="CurrentColor" />

									Roles
								</router-link>
							</li>

							<li>
								<router-link tabindex="0" to="/organizations">
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
							{{username}}

							<div class="dropdown__button">
								{{username.charAt(0)}}

								<span class="dropdown__arrow" />
							</div> <!-- /.dropdown__button -->
						</div> <!-- /.dropdown__account -->
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
								<a tabindex="0" @click.prevent="handleLogout">
									<Icon name="signout" color="CurrentColor" />

									Sign Out
								</a>
							</li>
						</ul>
					</div><!-- /.dropdown__nav -->
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
	</nav><!-- /.nav -->
</template>

<script>
/**
 * External Dependencies
 */
import { mapActions, mapGetters } from 'vuex';

/**
 * Internal Dependencies
 */
import DropDown from '@/components/dropdown/dropdown';
import Icon from '@/components/icon/icon';

export default {
	/**
	 * Name
	 */
	name: 'navAccount',
	
	/**
	 * Components
	 */
	components: {
		Icon,
		DropDown
	},
	
	/**
	 * Computed
	 */
	computed: {
		...mapGetters('account', ['username', 'userRoleWeight']),
		isLoggedIn() {
			return this.$store.state.account.status?.loggedIn
		},
	},
	
	/**
	 * Methods
	 */
	methods: {
		...mapActions('account', ['logout']),
		handleLogout(e) {
			e.preventDefault();
			this.logout();
		}
	}
};
</script>
