<template>
	<div class="intro">
		<div class="intro__head">
			<h3>
				No {{type}} Yet

				<span>Need to Add Some?</span>
			</h3>

			<figure>
				<img src="@/assets/images/intro-img@2x.png" alt="Example Image Title" />
			</figure>
		</div><!-- /.intro__head -->

		<div class="intro__body">
			<div class="intro__about">
				<p>Our AI has not detected any {{type}} in this document.</p>

				<p>
					<Icon name="arrow_up" color="#8CABCD" /> If you want to add some, first select a text
					passage in the document which references {{type}}
				</p>

				<p>
					<Icon name="arrow_down" color="#8CABCD" />

					Then click the <Icon name="add" color="currentColor" /> “Add” button below
				</p>

				<p>
					<Button className="tertiary">I need more help</Button>
				</p>
			</div>
			<!-- /.intro__about -->

			<div class="intro__tip">
				<h6>Pro-Tip</h6>

				<p>
					If multiple text passages make reference to the same {{type}}, you can shift+click to
					select more than one
				</p>

				<p>
					Additionally, you can add more text passgaes later by using the “Connect Text” button
				</p>
			</div>
			<!-- /.intro__tip -->
		</div><!-- /.intro__body -->
	</div><!-- /.intro -->
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
	name: 'Intro',

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
		type: {
			type: String,
			default: 'Datasets'
		}
	}
}
</script>
