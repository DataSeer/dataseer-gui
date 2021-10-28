<template>
  <div class="report-chart">
		<div class="report__graph">
			<img src="@/assets/images/images/chart.png" alt="Chart">
			</div><!-- /.report__graph -->

		<div class="report__content">
			<h4>This Chart Needs A Title or Short Description</h4>

			<ul>
				<li>
					<Button
						className="tertiary"
						size="small"
						block
					>
						<Icon name="focus" color="#006AC9"/>
						
						View Larger
					</Button>
				</li>

				<li>
					<Button
						className="tertiary"
						size="small"
						block
						@onClick="copyLinkToClip()"
					>
						<Icon name="documents" color="#006AC9"/>
						
						{{copyButtonText}}
					</Button>
				</li>
			</ul>
		</div><!-- /.report__content -->
	</div><!-- /.report-chart -->
</template>

<script>
import Icon from '@/components/icon/icon'
import Button from '@/components/button/button'

export default {
	/**
	 * Name
	 */
  name: "ReportChart",

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
    shareLink: {
			type: String,
			default: ''
		}
  },

	/**
	 * Data
	 */
	data: function() {
		return {
			copyButtonText: "Copy Share Link"
		}
	},

	/**
	 * Methods
	 */
	methods: {
		copyLinkToClip() {	
			const listener = (e) => {
				e.preventDefault();
				e.clipboardData.setData("text/plain", this.shareLink);

				this.copyButtonText = 'Copied';

				setTimeout(()=> {
					this.copyButtonText = 'Copy To Clipboard';
				}, 5000);
			}
			
			document.addEventListener("copy", listener);
			document.execCommand("copy");
			document.removeEventListener("copy", listener);
		}
	}
}
</script>
