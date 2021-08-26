<template> 
  <div class="header" :class="{'is-menu-expanded': showMobileMenu}">
    <div class="shell">
      <div class="header__bar"> 
        <Logo></Logo>

        <navTrigger
          @onClick='toggleMenu'
        ></navTrigger>

        <nav class="nav">
          <ul>
            <li>
              <a href="#">Need Help?</a>
            </li>

            <li>
              <navAccount></navAccount>
            </li>
          </ul>
        </nav><!-- /.nav -->
      </div><!-- /.header__bar -->
      <Subheader />
    </div><!-- /.shell -->
  </div><!-- /.header --> 
</template>

<script>
import Logo from '@/components/logo/logo';
import Subheader from '@/components/subheader/subheader';
import navAccount from '@/components/nav-account/nav-account';
import navTrigger from '@/components/nav-trigger/nav-trigger';

export default {
  name: 'Header',

  data: function() {
    return {
      showMobileMenu: false
    }
  },

  components: {
    Logo,
    navTrigger,
    Subheader,
    navAccount
  },
  
  methods: {
    toggleMenu() {
      this.showMobileMenu = !this.showMobileMenu
    }
  }
}
</script>
