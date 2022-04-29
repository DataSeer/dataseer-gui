<template>
	<div class="author">
		<div class="author__head">
			<h6><strong>{{author.name}}</strong>
				{{author.email ? `(${author.email})`: ``}}
			</h6>

			<ul v-if="author.isLeadAuthor || author.isSubmittingAuthor" class="author__badges">
				<li v-if="author.isLeadAuthor">
					<span>{{ badgesTitles.lead }}</span>
				</li>

				<li v-if="author.isSubmittingAuthor">
					<span>{{ badgesTitles.submitting }}</span>
				</li>
			</ul><!-- /.author__badges -->
		</div><!-- /.author__head -->

		<div class="author__content">
			{{author.description}}
		</div><!-- /.author__content -->
	</div><!-- /.author -->
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'Author',

	/**
	 * Props
	 */
	props: ['author'],

	/**
	 * Props
	 */
	data() {
		return {
			badgesTitles: {
				lead: 'Lead Author',
				submitting: 'Submitting Author'
			}
		}
	},
}
</script>
