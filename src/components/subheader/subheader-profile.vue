<template>
  <div class="subheader__inner">
    <div class="subheader__left">
      <h3>
        <Icon name="user" />
        User Profile
      </h3>
    </div><!-- /.subheader__left -->
    
    <div class="subheader__right">
      <Button className="tertiary" @onClick='exitProfile'>Exit Profile</Button>
    </div><!-- /.subheader__right -->
  </div><!-- /.subheader__inner -->
</template>

<script>
import { mapActions } from 'vuex'
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button.vue'

export default {
  name: "SubheaderProfile",

  components: { 
    Button,
    Icon
  },

  methods: {
    ...mapActions([
      'login'
    ]),
    exitProfile(event) {
      event.preventDefault();
      this.login(false);

      this.$router.push({
        name: 'SignIn',
      })
    }
  }
}
</script>
