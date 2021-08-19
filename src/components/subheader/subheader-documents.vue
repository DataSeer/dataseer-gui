<template>
  <div class="subheader__row">
    <div class="subheader__row-col">
      <h3>My Documents</h3>
    </div><!-- /.subheader__row-col -->
    <div class="subheader__row-col">
      <Search />
      <div class="border-box">
        View
        <a href="#">list</a>  
        <a href="#">grid</a>  
      </div><!-- /.border-box -->
      <Button>Upload new Document</Button>
    </div><!-- /.subheader__row-col -->
  </div><!-- /.subheader__row -->
</template>

<script>
import Button from '@/components/button/button.vue'
import Search from '../search/search.vue'
export default {
  name: "SubheaderDocuments",

  components: { 
    Button,
    Search
  },
}
</script>
