<template>
	<div class="dataset">
		<h6 class="dataset__title">{{dataset.title}}</h6><!-- /.dataset__title -->

		<div class="dataset__tags">
			<span>{{dataset.tag}}</span>

			<ul>
				<li v-for="(category, index) in dataset.categories" :key="index">{{category}}</li>
			</ul>
		</div><!-- /.dataset__tags -->

		<div class="dataset__content">
			<ul>
				<li>
					<Icon name="texts" color="currentColor" />

					{{dataset.descreiption}}
				</li>

				<li :class="{'is-empty': !dataset.url}">
					<Icon name="chain" color="currentColor" />

					<a v-if="dataset.url" :href="dataset.url" target="_blank">{{dataset.url}}</a>

					<p v-if="!dataset.url">No DOI Provided</p>
				</li>

				<li>
					<Icon name="comment" color="currentColor" />

					{{dataset.comment}}
				</li>
			</ul>
		</div><!-- /.dataset__content -->
	</div><!-- /.dataset -->
</template>

<script>
import Icon from '@/components/icon/icon'

export default {
	/**
	 * Name
	*/
	name: 'Dataset',

	/**
	 * Props
	*/
	props: ['dataset'],

	/**
	 * Components
	*/
	components: {
		Icon
	}
}
</script>
