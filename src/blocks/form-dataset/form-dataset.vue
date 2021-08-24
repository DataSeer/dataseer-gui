<template>
  <div class="form form--profile">
		<form action="?" method="post">
			<div class="form__body">
				<FormRow :error="$v.type.$error" name="type">
					<template #label>
						<Icon name="grid" />
						Data Type <a href="#">Type Definitions</a>
					</template>
					
					<div class="select">
						<select id="organization" v-model.trim="type">
							<option disabled selected value="">Tabular Data</option>
							
							<option value="option-1">Option 1</option>
							
							<option value="option-2">Option 2</option>
							
							<option value="option-3">Option 3</option>
						</select>
					</div><!-- /.select -->
				</FormRow>
        <FormRow :error="$v.subtype.$error" name="type">
					<template #label>
						<Icon name="grid" />
						Data Subtype
					</template>
					
					<div class="select">
						<select id="organization" v-model.trim="subtype">
							<option disabled selected value="">Subject Table Data</option>
							
							<option value="option-1">Option 1</option>
							
							<option value="option-2">Option 2</option>
							
							<option value="option-3">Option 3</option>
						</select>
					</div><!-- /.select -->
				</FormRow>
        <FormRow>
          <template #label>
						<Icon name="chain" />
						DOI or Permalink
					</template>
          <input id="permalink" type="text" class="field" v-model.trim="permalink" placeholder="https://">
        </FormRow>
        <FormRow>
          <template #label>
						<Icon name="comment" />
						Additional Comments or Instructions
					</template>
          <textarea name="instructions" class="field"></textarea><!-- /# -->
        </FormRow>
			</div><!-- /.form__body -->
      <div class="form__cta">
        <div class="form__cta-col">
          <Button>Complete This Dataset</Button>
        </div><!-- /.form__cta-col -->
        <div class="form__cta-col">
          <a href="#" v-tooltip.top-center="tooltips.connectText">
            <Icon name="connect" />
            Connect Text
          </a>
          <a href="#">
            <Icon name="trash" />
            Delete
          </a>
        </div><!-- /.form-__cta-col -->
      </div><!-- /.form__cta -->
		</form>
	</div><!-- /.form -->
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import FormRow from '@/components/form-row/form-row.vue';
import Icon from '@/components/icon/icon.vue';
import Button from '@/components/button/button.vue';

export default {
  name: "FormDataset",

  components: {
    FormRow,
    Icon,
    Button
  },

  data: function() {
    return {
      type: '',
      subtype: '',
      permalink: '',
      instructions: '',
			tooltips: {
				connectText: 'Select additional sentences from the document to connect to this dataset'
			}
    }
  },

  validations: {
			type: {
				required,
			},
			subtype: {
				required,
			},
      permalink: {
        required
      }
		},
}
</script>
