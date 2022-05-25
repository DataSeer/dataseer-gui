<template>
	<div v-if="src" class="report-chart">
		<div class="report__graph">
			<img :src="src" alt="Chart" />
		</div> <!-- /.report__graph -->

		<div class="report__content">
			<h4>This Chart Needs A Title or Short Description</h4>

			<ul>
				<li>
					<Button className="tertiary" size="small" block @onClick="showModal">
						<Icon name="focus" color="#006AC9" />

						{{ popupButtonText }}
					</Button>
				</li>

				<li>
					<Button className="tertiary" size="small" block @onClick="copyLinkToClip()">
						<Icon name="documents" color="#006AC9" />

						{{ copyButtonText }}
					</Button>
				</li>
			</ul>
		</div> <!-- /.report__content -->

		<Popup ref="reportChartPopup" name="report-chart-popup">
			<figure>
				<img :src="src" alt="Chart" />
			</figure>
		</Popup>
	</div>
	<!-- /.report-chart -->
</template>

<script>
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Popup from '@/components/popup/popup';

export default {
	/**
	 * Name
	 */
	name: 'ReportChart',

	/**
	 * Components
	 */
	components: {
		Icon,
		Popup,
		Button
	},

	/**
	 * Props
	 */
	props: {
		url: {
			type: String,
			default: ''
		},
		src: {
			type: String,
			default: undefined
		}
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			popupButtonText: 'View Larger',
			copyButtonText: 'Copy Share Link'
		};
	},

	/**
	 * Methods
	 */
	methods: {
		copyLinkToClip() {
			const listener = (e) => {
				e.preventDefault();
				e.clipboardData.setData('text/plain', this.url);

				this.copyButtonText = 'Copied';

				setTimeout(() => {
					this.copyButtonText = 'Copy To Clipboard';
				}, 5000);
			};

			document.addEventListener('copy', listener);
			document.execCommand('copy');
			document.removeEventListener('copy', listener);
		},
		showModal() {
			this.$refs.reportChartPopup.showModal();
		}
	}
};
</script>
