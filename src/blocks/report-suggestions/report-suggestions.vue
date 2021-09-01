<template>
	<div class="report-suggestions">
		<h4 v-if="title" class="report__title">{{title}}</h4>
		
		<div v-if="suggestions" class="report__body" ref="source">
			<ul>
				<li v-for="(suggestion, index) in suggestions" :key="index">
					<h6>{{suggestion.title}}</h6>
					
					<a v-if="!suggestion.isPrivate" :href="suggestion.url" target="_blank">{{suggestion.url}}</a>

					<p v-if="suggestion.isPrivate">The data are not publicly available due to their containing information that could compromise the privacy of research participants.</p>
				</li>
			</ul>
		</div><!-- /.report__body -->

		<Button tabindex="1" className="secondary" @onClick="copyToClip()">{{buttonText}}</Button>
	</div><!-- /.report-suggestions -->
</template>

<script>
import Button from '@/components/button/button'

export default {
	/**
	* Name
	*/
	name: 'reportSuggestions',
	
	/**
	* Props
	*/
	props: ['title', 'suggestions'],

	/**
	* Components
	*/
	components: {
		Button
	},

	/**
	* Data
	*/
	data: function() {
		return {
			buttonText: "Copy To Clipboard"
		}
	},

	/**
	* Methods
	*/
	methods: {
		copyToClip() {
			const str = this.$refs.source.innerHTML

			function listener(e) {
				e.clipboardData.setData("text/html", str);
				e.clipboardData.setData("text/plain", str);
				e.preventDefault();
			}
			document.addEventListener("copy", listener);
			document.execCommand("copy");
			document.removeEventListener("copy", listener);

			this.buttonText = 'Copied';
			
			setTimeout(()=> {
				this.buttonText = 'Copy To Clipboard';
			}, 5000);
		}
	},
}
</script>
