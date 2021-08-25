<template>
  <div class="main">
    <div class="shell">
      <div class="main__inner">
        <div class="main__left">
          <FormSignUp />
        </div><!-- /.main__left -->

        <div class="main__right">
          <Banner>
            <template #image>
              <img src="@/assets/images/form-img-1@2x.png" alt="">
            </template>

            <h4>DataSeer is better together!</h4>

            <p>Collaboration is essential for researchers and DataSeer is no different. Invite co-authors and other stakeholders to contribute to the data citation process.</p>
          </Banner>
        </div><!-- /.main__right -->
      </div><!-- /.main__inner -->
    </div><!-- /.shell -->
  </div><!-- /.main -->
</template>

<script>
import Banner from '@/components/banner/banner';
import FormSignUp from '@/blocks/form-sign-up/form-sign-up';

export default {
  name: 'SignUp',

  components: {
    Banner,
    FormSignUp
  }
}
</script>
