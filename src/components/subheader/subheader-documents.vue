<template>
  <div class="subheader__inner">
    <div class="subheader__left">
      <h3>
        <Icon name="documents" />
        My Documents
      </h3>
    </div><!-- /.subheader__left -->
    
    <div class="subheader__right">
      <Search />
    
      <div class="btn-layout">
        <span>View</span>
    
        <a class="btn__icon is-active" href="#">
          <Icon name="view_list" :active="true" />
        </a>  
    
        <a class="btn__icon " href="#">
          <Icon name="view_grid" />  
        </a>  
      </div><!-- /.btn-layout -->
      
      <Button>Upload new Document</Button>
    </div><!-- /.subheader__right -->
  </div><!-- /.subheader__inner -->
</template>

<script>
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button.vue'
import Search from '../search/search.vue'

export default {
  name: "SubheaderDocuments",

  components: { 
    Button,
    Search,
    Icon
  },
}
</script>
