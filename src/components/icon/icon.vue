<template>
  <i class="ico ico--add" v-if="name === 'add'">
    <Add />
  </i>
  
  <i class="ico ico--arrow-down" v-else-if="name === 'arrow_down'">
    <ArrowDown />
  </i>
  
  <i class="ico ico--arrow-up" v-else-if="name === 'arrow_up'">
    <ArrowUp />
  </i>
  
  <i class="ico ico--chain" v-else-if="name === 'chain'">
    <Chain />
  </i>

  <i class="ico ico--check" v-else-if="name === 'check'">
    <Check />
  </i>
  
  <i class="ico ico--comment" v-else-if="name === 'comment'">
    <Comment />
  </i>
  
  <i class="ico ico--connect" v-else-if="name === 'connect'">
    <Connect />
  </i>
  
  <i class="ico ico--document" v-else-if="name === 'document'">
    <Document />
  </i>

  <i class="ico ico--document-new" v-else-if="name === 'document_new'">
    <DocumentNew />
  </i>
  
  <i class="ico ico--documents" v-else-if="name === 'documents'">
    <Documents />
  </i>
  
  <i class="ico ico--email" v-else-if="name === 'email'">
    <IconEmail />
  </i>
  
  <i class="ico ico--grid" v-else-if="name === 'grid'">
    <Grid />
  </i>
  
  <i class="ico ico--invite" v-else-if="name === 'invite'">
    <Invite />
  </i>
  
  <i class="ico ico--list" v-else-if="name === 'list'">
    <List />
  </i>
  
  <i class="ico ico--merge" v-else-if="name === 'merge'">
    <Merge />
  </i>
  
  <i class="ico ico--organization" v-else-if="name === 'organization'">
    <Organization />
  </i>
  
  <i class="ico ico--password" v-else-if="name === 'password'">
    <Password />
  </i>
  
  <i class="ico ico--search" v-else-if="name === 'search'">
    <Search />
  </i>
  
  <i class="ico ico--share" v-else-if="name === 'share'">
    <Share />
  </i>
  
  <i class="ico ico--signout" v-else-if="name === 'signout'">
    <Signout />
  </i>
  
  <i class="ico ico--trash" v-else-if="name === 'trash'">
    <Trash />
  </i>
  
  <i class="ico ico--user" v-else-if="name === 'user'">
    <IconUser />
  </i>
  
  <i class="ico ico--view" v-else-if="name === 'view'">
    <DocumentView />
  </i>
  
  <i class="ico ico--view-grid" v-else-if="name === 'view_grid'">
    <ViewGrid />
  </i>
  
  <i class="ico ico--view-list" v-else-if="name === 'view_list'">
    <ViewList />
  </i>
</template>

<script>
import Add from './icon-add'
import ArrowDown from './icon-arrow-down'
import ArrowUp from './icon-arrow-up'
import Chain from './icon-chain'
import Check from './icon-check'
import Comment from './icon-comment'
import Connect from './icon-connect'
import Document from './icon-document'
import Documents from './icon-documents'
import DocumentNew from './icon-document-new'
import DocumentView from './icon-document-view'
import IconEmail from './icon-email'
import Grid from './icon-grid'
import Invite from './icon-invite'
import List from './icon-list'
import Merge from './icon-merge'
import Organization from './icon-organization'
import Password from './icon-password'
import Search from './icon-search'
import Share from './icon-share'
import Signout from './icon-signout'
import Trash from './icon-trash'
import IconUser from './icon-user'
import ViewGrid from './icon-view-grid'
import ViewList from './icon-view-list'


export default {
  name: "Icon",

  components: {
    Add,
    ArrowDown,
    ArrowUp,
    Chain,
    Check,
    Comment,
    Connect,
    Document,
    Documents,
    DocumentNew,
    DocumentView,
    IconEmail,
    Grid,
    Invite,
    List,
    Merge,
    Organization,
    Password,
    Search,
    Share,
    Signout,
    Trash,
    IconUser,
    ViewGrid,
    ViewList
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

