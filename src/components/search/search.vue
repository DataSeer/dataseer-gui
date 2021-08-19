<template>
  <div class="form">
    <form action="">
      <div class="form-row">
        <input type="text" v-model="search" class="field" />  
        <button type="submit">go</button>
      </div><!-- /.form-row -->
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
