<template>
	<div class="table__pagination pagination">
		<div class="pagination__inner">
			<div class="pagination__total">
				Items <span>{{ totalItems }}</span>
			</div>
			<!-- /.pagination__total -->

			<div class="pagination__steps">
				<Button size="small" highlighted :disabled="!(this.currentPage > 0)" @onClick="previous()" className="tertiary" square>
					<Icon name="angle_left" color="currentColor" />
				</Button>

				<ul>
					<li>Page</li>

					<li v-for="pageButton in pageButtons" :key="pageButton.name" class="pagination-item">
						<button
							type="button"
							@click="setPage(pageButton.name)"
							:disabled="pageButton.isDisabled"
							:class="{
								'is-active': pageButton.name === currentPage
							}"
							:aria-label="`Go to page number ${pageButton.name + 1} `"
						>
							{{ pageButton.name + 1 }}
						</button>
					</li>
				</ul>

				<Button size="small" highlighted :disabled="currentPage + 1 >= pages" @onClick="next()" className="tertiary" square>
					<Icon name="angle_right" color="currentColor" />
				</Button>
				<!-- /.pagination__button -->
			</div>
			<!-- /.pagination__steps -->

			<div class="pagination__dropdown">
				<label for="items-per-page">Items Per Page</label>

				<select @change="setItemsPerPage(dropdownValue)" v-model="dropdownValue" name="items-per-page" id="items-per-page">
					<option :value="2">2</option>

					<option :value="5">5</option>

					<option :value="10">10</option>

					<option :value="20">20</option>

					<option :value="50">50</option>

					<option :value="100">100</option>
				</select>

				<Icon name="angle_down" color="currentColor" />
			</div>
			<!-- /.pagination__dropdown -->
		</div>
		<!-- /.pagination__inner -->
	</div>
	<!-- /.pagination -->
</template>

<script>
/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';

export default {
	/**
	 * Name
	 */
	name: 'Pagination',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button
	},

	/**
	 * Props
	 */
	props: {
		totalItems: { type: Number },
		pageChanged: { type: Function },
		perPageChanged: { type: Function }
	},

	/**
	 * Data
	 */
	data() {
		return {
			currentPage: 0,
			pages: 1,
			maxbuttonItems: 5,
			dropdownValue: 50
		};
	},

	computed: {
		maxVisibleButtons() {
			return this.pages + 1 < this.maxbuttonItems ? this.pages + 1 : this.maxbuttonItems;
		},

		startPos() {
			if (this.currentPage <= 1 || this.pages <= this.maxbuttonItems) {
				return 0;
			}

			if (this.currentPage + 2 >= this.pages) {
				return this.pages - this.maxVisibleButtons;
			}

			return this.currentPage - 2;
		},

		endPos() {
			return Math.min(this.startPos + this.maxVisibleButtons, this.pages);
		},

		pageButtons() {
			const range = [];

			for (let i = this.startPos; i < this.endPos; i += 1) {
				range.push({
					name: i,
					isDisabled: i === this.currentPage
				});
			}

			return range;
		}
	},

	/**
	 * Methods
	 */
	methods: {
		setPage(page) {
			this.currentPage = page;
			this.pageChanged({ currentPage: this.currentPage + 1 });
		},
		previous() {
			if (this.currentPage > 0) this.setPage(this.currentPage - 1);
		},
		next() {
			if (this.currentPage < this.pages) this.setPage(this.currentPage + 1);
		},
		calcPageCount() {
			if (this.totalItems > this.dropdownValue) {
				this.pages = Math.ceil(this.totalItems / this.dropdownValue);
			} else {
				this.pages = 1;
				this.setPage(0);
			}
		},
		setItemsPerPage(value) {
			this.perPageChanged({ currentPerPage: value });
			this.calcPageCount();
		}
	},

	/**
	 * Watch
	 */
	watch: {
		totalItems() {
			this.calcPageCount();
		}
	},

	/**
	 * Created
	 */
	created() {
		this.setItemsPerPage(this.dropdownValue);
		this.calcPageCount();
	}
};
</script>
