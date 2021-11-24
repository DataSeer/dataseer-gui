<template>
	<i class="ico" :class="{ [`ico--${name}`]: name }">
		<component :is="name" :color="color"></component>
	</i>
</template>

<script>
import add from './icon-add';
import arrow_down from './icon-arrow-down';
import arrow_up from './icon-arrow-up';
import back from './icon-back';
import chain from './icon-chain';
import check from './icon-check';
import comment from './icon-comment';
import connect from './icon-connect';
import document from './icon-document';
import documents from './icon-documents';
import document_new from './icon-document-new';
import document_view from './icon-document-view';
import document_modify from './icon-document-modify';
import document_upload from './icon-document-upload';

import book from './icon-book';
import email from './icon-email';
import grid from './icon-grid';
import invite from './icon-invite';
import merge from './icon-merge';
import organization from './icon-organization';
import password from './icon-password';
import search from './icon-search';
import share from './icon-share';
import texts from './icon-text';
import signout from './icon-signout';
import trash from './icon-trash';
import user from './icon-user';
import view_grid from './icon-view-grid';
import view_list from './icon-view-list';
import list_alt from './icon-list-alt';
import pen from './icon-pen';
import focus from './icon-focus';
import protocols from './icon-protocols';
import flask from './icon-flask';
import brackets from './icon-brackets';
import datasets from './icon-datasets';
import lock from './icon-lock';
import cube from './icon-cube';
import windows from './icon-windows';
import key from './icon-key';
import database from './icon-database';
import refresh from './icon-refresh';
import settings from './icon-settings';
import angle_down from './icon-angle-down';
import angle_left from './icon-angle-left';
import angle_right from './icon-angle-right';
import calendar from './icon-calendar';
import ico_plus_circle from './icon-plus-circle';

export default {
	name: 'Icon',

	props: {
		name: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: '#444'
		}
	},

	components: {
		book,
		add,
		arrow_down,
		arrow_up,
		chain,
		check,
		back,
		comment,
		connect,
		document,
		documents,
		document_new,
		document_view,
		document_modify,
		document_upload,
		email,
		grid,
		invite,
		merge,
		organization,
		password,
		search,
		share,
		signout,
		texts,
		trash,
		user,
		view_grid,
		view_list,
		pen,
		focus,
		protocols,
		flask,
		brackets,
		datasets,
		lock,
		cube,
		windows,
		key,
		database,
		list_alt,
		refresh,
		settings,
		angle_down,
		angle_left,
		angle_right,
		calendar,
		ico_plus_circle
	}
};
</script>
