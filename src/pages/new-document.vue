<template>
  <div class="main">
    <div class="shell">
      <div class="main__inner">
        <div class="main__left">
          <FormNewDocument />
        </div><!-- /.main__left -->

        <div class="main__right">
          <Banner>
            <template #image>
              <img src="@/assets/images/form-img-3@2x.png" alt="Example Image Title">
            </template>

            <h4>DataSeer is powered by Machine Learning, which means it’s always improving.</h4>

            <p>By uploading your article and telling it about the things it gets right and gets wrong about your datasets, you’re training DataSeer to improve.</p>
          </Banner>
        </div><!-- /.main__right -->
      </div><!-- /.main__inner -->
    </div><!-- /.shell -->
  </div><!-- /.main -->
</template>

<script>
import FormNewDocument from '@/blocks/form-new-document/form-new-document'
import Banner from '@/components/banner/banner'

export default {
  name: 'NewDocument',
  
  components: {
    FormNewDocument,
    Banner
  }
}
</script>


