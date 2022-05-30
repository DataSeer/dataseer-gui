<template>
	<div class="popup popup--confirm">
		<h5 class="popup__title">
			<Icon name="question" />
			
			{{ title }}
		</h5><!-- /.popup__title -->
		
		<div v-if="message" class="popup__body">{{message}}</div><!-- /.popup__body -->
		
		<ul class="popup__actions">
			<li>
				<Button
					modifier="is-warning"
					@onClick="confirmFn"
				>
					{{ confirm }}
				</Button>
			</li>
			
			<li>
				<Button
					className="tertiary"
					@onClick="cancelFn"
				>
					{{ cancel }}
				</Button>
			</li>
		</ul><!-- /.popup__actions -->
	</div> <!-- /.popup -->
</template>

<script>
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';

export default {
	/**
	 * Name
	 */
	name: 'PopupConfirm',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button,
	},

	/**
	 * Props
	 */
	props: {
		message: String,
		confirm: {
			type: String,
			default: 'Confirm'
		},
		cancel: {
			type: String,
			default: 'Cancel'
		},
		cancelFn: Function,
		confirmFn: Function,
	},

	/**
	 * Data
	 */
	data() {
		return {
			title: 'Please Confirm'		
		};
	}
};
</script>
