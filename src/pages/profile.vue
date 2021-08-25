<template>
  <div class="main main--profile">
    <div class="shell">
      <div class="main__inner">
        <div class="main__left">
          <ProfileCols />
        </div><!-- /.main__left -->

        <div class="main__right">
          <Banner>
            <template #image>
              <img src="@/assets/images/form-img-4@2x.png" alt="">
            </template>

            <h4>Data standards can be confusing</h4>

            <p>DataSeer simplifies the process by providing a structured library of current data types and best practices for each so you’ll know just what to do with your data.</p>
          </Banner>
        </div><!-- /.main__right -->
      </div><!-- /.main__inner -->
    </div><!-- /.shell -->
  </div><!-- /.main -->
</template>

<script>
  import ProfileCols from '@/components/profile-cols/profile-cols';
  import Banner from '@/components/banner/banner'

  export default {
    name: 'Profile',
    components: {
      ProfileCols,
      Banner
    }
  }
</script>
