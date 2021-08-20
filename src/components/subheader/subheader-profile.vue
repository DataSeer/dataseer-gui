<template>
  <div class="subheader__inner">
    <div class="subheader__left">
      <h3>User Profile</h3>
    </div><!-- /.subheader__left -->
    
    <div class="subheader__right">
      <Button alt>Exit Profile</Button>
    </div><!-- /.subheader__right -->
  </div><!-- /.subheader__inner -->
</template>

<script>
import Button from '@/components/button/button.vue'

export default {
  name: "SubheaderProfile",

  components: { 
    Button,
  },
}
</script>
