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
						<Button
							className="tertiary"
							square
							@onClick="$emit('filtersButtonClick')"
							v-tooltip.top-center="tooltips.filtersText"
						>
							<Icon name="settings" color="currentColor" />
						</Button>
					</li>

					<li>
						<Search
							:value="searchInputValue"
							@input="(value) => this.$emit('searchInput', value)"
						/>
					</li>

					<li>
						<Button className="tertiary" to="/new-document">Upload new Document</Button>
					</li>
				</ul>
			</div> <!-- /.subheader__menu -->
		</div> <!-- /.subheader__right -->
	</div> <!-- /.subheader__inner -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Icon from '@/components/icon/icon';
import Search from '@/components/search/search.vue';
import Button from '@/components/button/button.vue';

export default {
	/**
	 * Name
	 */
	name: 'SubheaderDocuments',

	/**
	 * Components
	 */
	components: {
		Icon,
		Search,
		Button,
	},

	/**
	 * Props
	 */
	props: {
		searchInputValue: {
			type: String,
			default: ''
		},
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			showMobileMenu: false,
			tooltips: {
				filtersText: 'Show Advanced Filter Controls',
			},
		};
	},
	
	/**
	 * Computed
	 */
	computed: {
		...mapGetters(['getDocumentView', 'getFiltersVisibility']),
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions(['changeView', 'changeFiltersVisibility']),
		toggleMobileMenu() {
			this.showMobileMenu = !this.showMobileMenu;
		},
	},
};
</script>
