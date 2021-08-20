<template>
  <i class="icon">
    <img 
      v-if="!active"
      :src="src" 
      :alt="name"
    >
    <img 
      v-else
      :src="srcActive" 
      :alt="name"
    >
  </i><!-- /.icon -->
</template>

<script>
export default {
  name: "Icon",

  props: {
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false
    }
  },

  data: function() {
    return {
      add: require('@icon/ico-add.svg'),
      arrow_down: require('@icon/ico-arrow-down.svg'),
      arrow_up: require('@icon/ico-arrow-up.svg'),
      chain: require('@icon/ico-chain.svg'),
      comment: require('@icon/ico-comment.svg'),
      connect: require('@icon/ico-connect.svg'),
      document: require('@icon/ico-document.svg'),
      documents: require('@icon/ico-documents.svg'),
      email: require('@icon/ico-email.svg'),
      error: require('@icon/ico-error.svg'),
      grid: require('@icon/ico-grid.svg'),
      invite: require('@icon/ico-invite.svg'),
      list: require('@icon/ico-list.svg'),
      merge: require('@icon/ico-merge.svg'),
      organization: require('@icon/ico-organization.svg'),
      password: require('@icon/ico-password.svg'),
      search: require('@icon/ico-search.svg'),
      share: require('@icon/ico-share.svg'),
      signout: require('@icon/ico-signout.svg'),
      success: require('@icon/ico-success.svg'),
      trash: require('@icon/ico-trash.svg'),
      user: require('@icon/ico-user.svg'),
      view: require('@icon/ico-view.svg'),
      view_grid: require('@icon/ico-view-grid.svg'),
      view_grid_active: require('@icon/ico-view-grid-active.svg'),
      view_list: require('@icon/ico-view-list.svg'),
      view_list_active: require('@icon/ico-view-list-active.svg'),
      warning: require('@icon/ico-warning.svg'),
    }
  },

  computed: {
    src() {
      return this[this.name];
    },
    srcActive() {
      return this[this.name + '_active']
    }
  }
}
</script>

