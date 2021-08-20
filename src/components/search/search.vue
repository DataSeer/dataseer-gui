<template>
  <div class="form form--search">
    <form action="">
      <div class="form__row">
        <input type="text" v-model="search" class="field" placeholder="Search" />  
        
        <button type="submit">
          <Icon name="search" />
        </button>
      </div><!-- /.form__row -->
    </form>
  </div><!-- /.form -->
</template>

<script>
import Icon from '@/components/icon/icon';

export default {
  name: "Search",

  components: {
    Icon
  },

  data: function() {
    return {
      search: ''
    }
  }
}
</script>
