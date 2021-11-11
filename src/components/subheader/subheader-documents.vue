<template>
	<div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
		<div class="subheader__left">
			<h3 id="subheader-title">
				<Icon name="documents" color="currentColor" />

				Documents
			</h3>
		</div>
		<!-- /.subheader__left -->

		<div class="subheader__right" :class="{ 'is-active': showMobileMenu }">
			<button class="subheader__btn btn-dropdown" @click="toggleMobileMenu"></button>

			<div class="subheader__menu">
				<ul>
					<li>
						<Button className="tertiary" square @onClick="changeFiltersVisibility(!getFiltersVisibility)">
							<Icon name="settings" color="currentColor" />
						</Button>
					</li>

					<li>
						<Search />
					</li>

					<li>
						<div tabindex="0" class="btn-layout" aria-label="select view">
							<span>View</span>

							<a
								tabindex="0"
								aria-label="list"
								class="btn__icon"
								:class="{ 'is-active': getDocumentView === 'list' }"
								href="#"
								@click.prevent="changeView('list')"
							>
								<Icon name="view_list" color="currentColor" />
							</a>

							<a
								tabindex="0"
								aria-label="grid"
								class="btn__icon"
								:class="{ 'is-active': getDocumentView === 'grid' }"
								href="#"
								@click.prevent="changeView('grid')"
							>
								<Icon name="view_grid" color="currentColor" />
							</a>
						</div>
						<!-- /.btn-layout -->
					</li>

					<li>
						<Button className="tertiary" to="/new-document">Upload new Document</Button>
					</li>
				</ul>
			</div>
			<!-- /.subheader__menu -->
		</div>
		<!-- /.subheader__right -->
	</div>
	<!-- /.subheader__inner -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Icon from '@/components/icon/icon';
import Search from '@/components/search/search.vue';
import Button from '@/components/button/button.vue';

export default {
	name: 'SubheaderDocuments',

	components: {
		Icon,
		Search,
		Button,
	},

	data: function() {
		return {
			showMobileMenu: false,
		};
	},

	computed: {
		...mapGetters(['getDocumentView', 'getFiltersVisibility']),
	},

	methods: {
		...mapActions(['changeView', 'changeFiltersVisibility']),
		toggleMobileMenu() {
			this.showMobileMenu = !this.showMobileMenu;
		},
	},
};
</script>
