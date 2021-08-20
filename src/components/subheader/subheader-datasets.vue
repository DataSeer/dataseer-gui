<template>
  <div class="subheader__inner">
    <div class="subheader__left">
      <h3>
        <Icon name="document" />
        My Documents
      </h3>
    </div><!-- /.subheader__left -->
    
    <div class="subheader__right">
      <Button alt>Complete Document</Button>
    </div><!-- /.subheader__right -->
  </div><!-- /.subheader__inner -->
</template>

<script>
import Button from '@/components/button/button.vue'
import Icon from '@/components/icon/icon';

export default {
  name: "SubheaderDatasets",

  components: { 
    Button,
    Icon
  },
}
</script>
