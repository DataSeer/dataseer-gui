<template>
	<div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
		<div class="subheader__left">
			<h3 v-if="title" id="subheader-title">
				<Icon v-if="icon" :name="icon" color="currentColor" />

				{{ title }}
			</h3>
		</div> <!-- /.subheader__left -->

		<div class="subheader__right" :class="{ 'is-active': showMobileMenu }">
			<button class="subheader__btn btn-dropdown" @click="toggleMobileMenu"></button>

			<div class="subheader__menu">
				<ul>
					<li v-if="showFiltersButton">
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
						<Button className="tertiary" :to="buttonUrl" > {{ buttonLabel }} </Button>
					</li>
				</ul>
			</div> <!-- /.subheader__menu -->
		</div> <!-- /.subheader__right -->
	</div> <!-- /.subheader__inner -->
</template>

<script>

import Icon from '@/components/icon/icon';
import Search from '@/components/search/search.vue';
import Button from '@/components/button/button.vue';

export default {
	/**
	 * Name
	 */
	name: 'SubheaderTable',

	/**
	 * Components
	 */
	components: {
		Icon,
		Search,
		Button
	},

	/**
	 * Props
	 */
	props: {
		
		title: {
			type: String
		},
		icon: {
			type: String
		},
		buttonLabel: {
			type: String
		},
		buttonUrl: {
			type: String
		},
		searchInputValue: {
			type: String
		},
		showFiltersButton: {
			type: Boolean,
			default: false
		}
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			showMobileMenu: false,
			tooltips: {
				filtersText: 'Show Advanced Filter Controls'
			}
		};
	},

	/**
	 * Methods
	 */
	methods: {
		toggleMobileMenu() {
			this.showMobileMenu = !this.showMobileMenu;
		}
	}
};
</script>
