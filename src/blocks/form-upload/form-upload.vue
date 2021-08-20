<template>
  <div class="form form--lg form--upload">
    <form action="?" method="post">
      <div class="form__head form__head--center">
        <h2>Upload Your Research Text</h2>
        
        <p>DataSeer will process the document and highlight passages which may need links to a dataset</p>
      </div><!-- /.form__head -->
      
      <div class="form__body">
        <FormRow name="primary-file">
          <template #label>
            <Icon name="document" />
            Select Your Primary File
          </template>
          
          <input id="primary-file" type="text" class="field" placeholder="Email Address">
        </FormRow>
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
import formRow from '@/components/form-row/form-row'
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';

export default {
  name: 'FormUpload',
  components: {
    formRow,
    Button,
    Icon
  }

}
</script>

<style lang="css" scoped>
</style>
