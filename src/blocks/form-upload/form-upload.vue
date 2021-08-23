<template>
  <div class="form form--lg form--upload">
    <form action="?" method="post" @submit.prevent="onSubmit">
      <div class="form__head form__head--center">
        <h2>Upload Your Research Text</h2>
        
        <p>DataSeer will process the document and highlight passages which may need links to a dataset</p>
      </div><!-- /.form__head -->

      <div class="form__statuses" v-if="submitStatus !== null">
        <div class="form__status form__status--error" v-if="submitStatus === 'ERROR'">
          <p>Example error message</p>
        </div><!-- /.form__status -->

        <div class="form__status form__status--success" v-if="submitStatus === 'OK'">
          <p>Example success message</p>
        </div><!-- /.form__status -->
      </div><!-- /.form__statuses -->
      
      <div class="form__body">
        <div class="form__row">
          <label for="primary-file" class="form__label">
            Select Your Primary File
          </label>

          <div class="field field--upload">
            <input type="file" id="primary-file" accept=".docx, .pdf" @change="onPrimaryFileChange">
            
            <label for="primary-file">
              <span class="btn btn--secondary">Choose File</span>

              {{primaryFile}}
            </label>
          </div><!-- /.field -->

            <div class="form__helptext">
              <p>Supported formats: <strong>PDF, docx</strong></p>
            </div><!-- /.form__helptext -->
        </div><!-- /.form__row -->

        <div class="form__row">
          <label for="additional-files" class="form__label">
            Select Additional Support Files <em>Optional</em>
          </label>

          <div class="field field--upload">
            <input type="file" id="additional-files" multiple="multiple" @change="onAdditionalFileChange">
            
            <label for="additional-files">
              <span class="btn btn--secondary">Choose Files</span>

              {{additionalFiles}}
            </label>
          </div><!-- /.field -->

          <div class="form__helptext">
              <p>All file formats supported</p>
            </div><!-- /.form__helptext -->
        </div><!-- /.form__row -->

        <div class="form__row">
          <div class="checkboxes checkboxes--center">
            <ul>
              <li>
                <div class="checkbox">
                  <input type="checkbox" id="is-new-version">
                  
                  <label for="is-new-version">This is a new version of an article DataSeer has already assessed</label>
                </div><!-- /.checkbox -->
              </li>
            </ul>
          </div><!-- /.checkboxes -->
        </div><!-- /.form__row -->
      </div><!-- /.form__body -->
      
      <div class="form__actions">
        <ul>
          <li>
            <Button type="submit">Upload Documents</Button>
          </li>
          
          <li>
            <Button alt>Cancel</Button>
          </li>
        </ul>
      </div><!-- /.form__actions -->
    </form>
  </div><!-- /.form -->
</template>

<script>
import Button from '@/components/button/button';

export default {
  name: 'FormUpload',
  data: function() {
    return {
      primaryFile: '',
      additionalFiles: '',
      submitStatus: null,
    }
  },

  components: {
    Button
  },
  
  methods: {
    onPrimaryFileChange(e) {
      if (e.target.files.length) {
        this.primaryFile = e.target.files[0].name;
      } 
    },
    onAdditionalFileChange(e) {
      if (e.target.files.length === 1) {
        this.additionalFiles = e.target.files[0].name;
      } else if (e.target.files.length >= 1) {
        this.additionalFiles = `${e.target.files.length} files`;
      } else {
        this.additionalFiles = '';
      }
    },
    onSubmit() {
      if (this.primaryFile) {
        console.log('success');
        this.submitStatus = 'OK'
      } else {
        console.log('false');
        this.submitStatus = 'ERROR'
      }

      console.log(this.submitStatus);
    }
  }
}
</script>
