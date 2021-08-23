<template>
  <div class="header">
    <div class="shell">
      <div class="header__bar"> 
        <Logo></Logo>

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

export default {
  name: 'Header',

  components: {
    Logo,
    Subheader,
    navAccount
  }
}
</script>
