<template>
  <div class="form form--search">
    <form action="">
      <div class="form__row">
        <input type="text" v-model="search" class="field" placeholder="Search" />  
        
        <button type="submit">go</button>
      </div><!-- /.form__row -->
    </form>
  </div><!-- /.form -->
</template>

<script>
export default {
  name: "Search",

  data: function() {
    return {
      search: ''
    }
  }
}
</script>
