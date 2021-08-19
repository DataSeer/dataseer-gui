<template>
  <div class="subheader__inner">
    <div class="subheader__left">
      <h3>My Documents</h3>
    </div><!-- /.subheader__left -->
    
    <div class="subheader__right">
      <Search />
    
      <div class="btn-layout">
        <span>View</span>
    
        <a class="btn__icon btn__icon--table is-active" href="#"></a>  
    
        <a class="btn__icon btn__icon--grid" href="#"></a>  
      </div><!-- /.btn-layout -->
      
      <Button>Upload new Document</Button>
    </div><!-- /.subheader__right -->
  </div><!-- /.subheader__inner -->
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
