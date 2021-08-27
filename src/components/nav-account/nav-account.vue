<template>
  <nav class="nav-account" :class="{'is-logged-in': getLogin}">
    <ul v-if="getLogin">
      <li>
        <router-link to="/documents">my documents</router-link>
      </li>
      
      <li>
        <DropDown>
          <template #header>
            <div class="dropdown__account">
              Laura L.

              <span>L</span>
            </div><!-- /.dropdown__account -->
          </template>
          
          <ul class="dropdown__nav">
            <li>
              <router-link to="/profile">
                <Icon name="user"></Icon>

                User Profile
              </router-link>
            </li>

            <li>
              <a href="#" @click.prevent="login(false)">
                <Icon name="signout" />

                Sign Out
              </a>
            </li>
          </ul>
        </DropDown>
      </li>
    </ul>
    
    <ul v-else>
      <li>
        <router-link class="btn btn--tertiary" to="/sign-in">
          Sign In
        </router-link>
      </li>

      <li>
        <router-link class="btn btn--secondary" to="/sign-up">
          Sign Up
        </router-link>
      </li>
    </ul>
  </nav><!-- /.nav -->
</template>

<script>
import DropDown from '@/components/dropdown/dropdown';
import Icon from '@/components/icon/icon';
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'navAccount',
  computed: {
    ...mapGetters([
      'getLogin'
      ])
  },

  methods: {
    ...mapActions([
      'login'
    ])
  },
  
  components: {
    Icon,
    DropDown
  }
}
</script>
