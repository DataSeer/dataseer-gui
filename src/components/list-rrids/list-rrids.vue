<template>
	<div
		class="list list-rrids"
		:class="{
			'is-readonly': readonly,
			'list--sm': this.size === 'small',
			'list--md': this.size === 'medium',
			'list--lg': this.size === 'large'
		}"
	>
		<label
			v-if="this.$slots.default"
			:for="toKebabCase(name)"
			class="list__label"
			:class="{ 'sr-only': hideLabel }"
		>
			<slot />
		</label>

		<span v-if="error !== ''" class="list__error">{{ error }}</span>
		<div v-if="Array.isArray(list)" class="list__RRIDs">
			<p v-if="list.length > 0 && error === ''" class="list__RRIDsMsg">Results for "<a :href="entity.URL">{{ entity.name }}</a>":</p>
			<p v-if="list.length < 1 && error === ''" class="list__RRIDsMsg">No results found</p>
			<ul class="list__RRIDsURLs">
				<li v-for="item in list" :key="item.href" class="list__RRIDsURL">
					{{ item.RRID }} ({{ item.text }})
					<a :href="item.href" target="_blank">↗</a>
				</li>
			</ul>
		</div>

		<div v-if="Array.isArray(links) && links.length > 0" class="list__searchURLs">
			<p>Search for "{{ entity.name }}" in
				<span v-for="item in links" :key="item.href" class="list__searchURL">
					<a :href="item.href" target="_blank">{{ item.text }}</a>
				</span>
				.
			</p>
		</div>

		<div class="list__controls">
			<div v-if="trailingIcon" class="list__trailing-icon">
				<Icon :name="trailingIcon" />
			</div>
		</div> <!-- /.list__controls -->
	</div> <!-- /.list -->
</template>

<script>
/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import toKebabCase from '@/utils/str-to-kebab-case';

export default {
	/**
	 * Name
	 */
	name: 'ListOfRRIDs',

	/**
	 * Components
	 */
	components: {
		Icon
	},

	/**
	 * Props
	 */
	props: {
		list: {
			type: Array,
			default: () => []
		},
		links: {
			type: Array,
			default: () => []
		},
		error: {
			type: String,
			default: ''
		},
		entity: {
			type: Object,
			default: () => {}
		},
		type: {
			type: String,
			default: 'text'
		},
		name: {
			type: String,
			default: ''
		},
		value: {
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		trailingIcon: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: ''
		},
		tabindex: {
			type: Number,
			default: 0
		},
		readonly: {
			type: Boolean,
			default: false
		},
		hideLabel: {
			type: Boolean,
			default: false
		}
	},

	/**
	 * Computed
	 */
	computed: {},

	/**
	 * Methods
	 */
	methods: {
		handleChange(e) {
			this.$emit('input', e.target.value);
		},
		toKebabCase
	}
};
</script>
