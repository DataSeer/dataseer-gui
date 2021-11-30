<template>
	<div class="form form--dataset">
		<form action="?" method="post">
			<div class="form__body">
				<Field
					:error="$v.type.$error"
					:options="[
						{
							title: 'Material 1'
						},
						{
							title: 'Material 2'
						},
						{
							title: 'Material 3'
						},
						{
							title: 'Material 4'
						}
					]"
					name="material"
					v-model.trim="material"
					placeholder="Material Type"
				>
					<Icon name="grid" color="currentColor" />

					Material Type <a href="#">Type Definitions</a>
				</Field>

				<div class="checkboxes">
					<ul>
						<FieldCheckbox name="reuse" v-model="reuse" isDropdown>
							This material is re-used from another public or private source
						</FieldCheckbox>

						<FieldCheckbox name="practices" v-model="practices" isDropdown v-if="reuse !== null">
							<a href="#">Best practices</a> for this material type have been followed

							<button
								tabindex="0"
								type="button"
								class="text-toggle"
								@click="practices_text = !practices_text"
							>
								{{ textToggle(practices_text) }}
							</button>
						</FieldCheckbox>

						<HiddenText v-if="practices_text">
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit labore, laborum
								ipsam nostrum atque dolore eum cumque vero vel perferendis.
							</p>
						</HiddenText>
					</ul>
				</div>

				<Field
					v-if="reuse !== null"
					name="rrid"
					v-model.trim="rrid"
					type="text"
					placeholder="https://"
				>
					<Icon name="chain" color="currentColor" />

					RRID
				</Field>

				<Field name="instructions" type="textarea" v-model="instructions">
					<Icon name="comment" />

					Additional Comments or Instructions
				</Field>
			</div>
			<!-- /.form__body -->

			<div class="form__cta">
				<div class="form__cta-row">
					<div class="form__cta-col">
						<Button>Complete This Dataset</Button>
					</div>
					<!-- /.form__cta-col -->

					<div class="form__cta-col">
						<Button className="tertiary" v-tooltip.top-center="tooltips.connectText">
							<Icon name="connect" />

							Connect Text
						</Button>

						<Button
							className="tertiary"
							v-tooltip.top-center="tooltips.deleteText"
							@onClick="handleDelete"
						>
							<Icon name="trash" />

							Delete
						</Button>
					</div>
					<!-- /.form-__cta-col -->
				</div>
				<!-- /.form__cta-row -->
			</div>
			<!-- /.form__cta -->
		</form>
	</div>
	<!-- /.form -->
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import Field from '@/components/field/field';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import HiddenText from '@/components/hidden-text/hidden-text';

export default {
	name: 'FormDatasetMaterial',

	components: {
		Field,
		Icon,
		Button,
		FieldCheckbox,
		HiddenText
	},

	data: function() {
		return {
			material: '',
			reuse: null,
			practices: null,
			practices_text: false,
			rrid: '',
			permalink: '',
			instructions: '',
			tooltips: {
				connectText: 'Select additional sentences from the document to connect to this dataset',
				deleteText: 'Delete this Dataset'
			}
		};
	},

	validations: {
		type: {
			required
		},
		subtype: {
			required
		},
		permalink: {
			required
		}
	},

	methods: {
		textToggle(check) {
			return check ? 'Hide' : 'Show';
		},

		handleDelete() {
			window.confirm('Are you sure you want to delete this dataset?');
		}
	}
};
</script>
