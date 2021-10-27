<template>
  <div class="form form--lg form--new-document">
    <form action="?" method="post" @submit.prevent="onSubmit">
      <div class="form__head form__head--center">
        <h2>Upload Your Research Text</h2>
        
        <p>DataSeer will process the document and highlight passages which may need links to a dataset, code, lab materials, or protocol</p>
      </div><!-- /.form__head -->

      <div class="form__statuses" v-if="errors">
        <div class="form__status form__status--error">
          <p>{{errorMessage}}</p>
        </div><!-- /.form__status -->
      </div><!-- /.form__statuses -->
      
      <div class="form__body">
        <FormFile 
          :file="primaryFile"
          accept=".docx, .pdf"
          name="primaryFile"
          :error="errors"
          :text="getFileName('primaryFileText')"
          @onChange="onFieldChange"
          @onClear='clearField'
        >
          <template #label>
            <Icon name="document_new" color="currentColor" />
            Select Your Primary File
          </template>

          <template #helptext>
            Supported formats: <strong>PDF, docx</strong>
          </template>
        </FormFile>  

        <FormFile 
          :file="additionalFiles"
          name="additionalFiles"
          multiple="multiple"
          :text="getFileName('additionalFilesText')"
          @onChange="onFieldChange"
          @onClear='clearField'
        >
          <template #label>
            <Icon name="documents" color="currentColor" />
            
            Select Additional Support Files <em>Optional</em>
          </template>

          <template #helptext>
            All file formats supported
          </template>
        </FormFile>  
        
        <div class="form__row">
          <div class="checkboxes checkboxes--center">
            <ul>
              <FormCheckbox
                name="checkbox"
                @onChange="onCheckboxChange"
              >
                This is a new version of an article DataSeer has already assessed
              </FormCheckbox>
            </ul>
          </div><!-- /.checkboxes -->
        </div><!-- /.form__row -->
      </div><!-- /.form__body -->
      
      <div class="form__actions">
        <ul>
          <li>
            <Button tabindex="0" type="submit">Upload Documents</Button>
          </li>
          
          <li>
            <Button tabindex="0" className="tertiary">Cancel</Button>
          </li>
        </ul>
      </div><!-- /.form__actions -->
    </form>
  </div><!-- /.form -->
</template>

<script>
  import Icon from '@/components/icon/icon';
  import Button from '@/components/button/button';
  import FormFile from '@/components/form-file/form-file';
  import FormCheckbox from '@/components/form-checkbox/form-checkbox';

  export default {
    name: 'FormNewDocument',
    data: function() {
      return {
        primaryFile: '',
        additionalFiles: '',
        primaryFileText: [],
        additionalFilesText: [],
        checkbox: false,
        errorMessage: '',
        errors: false
      }
    },

    components: {
      Icon,
      Button,
      FormFile,
      FormCheckbox
    },

    methods: {
      getFileName(name) {
        return this[name].join(', ');
      },
      onFieldChange(event) {
        const name = event.target.name;
        this[name] = event.target.value;

        this[`${name}Text`] = Object.values(event.target.files).map(file => file.name)
      },
      onCheckboxChange(event) {
        const name = event.target.name;
        this[name] = event.target.checked;
      },
      clearField(name){
        this[name] = '';
        this[`${name}Text`] = [];
      },
      onSubmit() {
        if (!this.primaryFile) {
          this.errors = true;
          this.errorMessage = 'Example error message'
        }
      }
    }
  }
</script>
