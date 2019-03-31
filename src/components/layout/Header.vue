<template>
  <!-- <section class="menu cid-r2IZsvdheb" once="menu" id="menu1-2">
    <nav
      class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm bg-color transparent"
    >
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <div class="menu-logo">
        <div class="navbar-brand">
          <span class="navbar-logo">
            <router-link to="/">
              <img src="assets/images/logo2.png" alt="Mobirise" style="height: 3.8rem;">
            </router-link>
          </span>
          <span class="navbar-caption-wrap">
            <router-link class="navbar-caption text-white display-4" to="/">Challenge me</router-link>
          </span>
        </div>
      </div>
      <div v-if="$auth.check()" class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
          <li class="nav-item">
            <router-link class="nav-link link text-white display-4" to="/me/projects">
              <span class="mbri-search mbr-iconfont mbr-iconfont-btn"></span>
              My Projects
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link link text-white display-4" to="/me">
              <span class="mbri-home mbr-iconfont mbr-iconfont-btn"></span>
              Profile
            </router-link>
          </li>
          <li class="nav-item">
            <a
              href="/api/v1"
              @click.prevent="goToStoryCenter()"
              class="nav-link link text-white display-4"
            >
              <span class="mbri-home mbr-iconfont mbr-iconfont-btn"></span>
              Stories Center
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link link text-white display-4" v-on:click="logout()">
              <span class="mbri-search mbr-iconfont mbr-iconfont-btn"></span>
              Logout
            </a>
          </li>
        </ul>
      </div>
      <div v-if="!$auth.check()" class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
          <li class="nav-item">
            <router-link class="nav-link link text-white display-4" to="/login">
              <span class="mbri-home mbr-iconfont mbr-iconfont-btn"></span>
              Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link link text-white display-4" to="/register">
              <span class="mbri-search mbr-iconfont mbr-iconfont-btn"></span>
              Register
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </section>-->
  <div>
    <v-navigation-drawer fixed v-model="drawer" right app>
      <v-list dense>
        <div v-if="$auth.check()">
          <v-list-tile to="/me" :exact="true">
            <v-list-tile-action>
              <v-icon>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My account</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/me/projects" exact>
            <v-list-tile-action>
              <v-icon>mdi-clipboard-text-outline</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Projects</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout()">
            <v-list-tile-action>
              <v-icon>settings_power</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <v-list-tile v-else to="/login">
          <v-list-tile-action>
            <v-icon>perm_identity</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile to="/projects">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Browse Projects</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/users">
          <v-list-tile-action>
            <v-icon>contacts</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Browse Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile :href="ghostServerUrl" target="_blank">
          <v-list-tile-action>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Stories Center</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan" dark prominent fixed app>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-toolbar-title>Challenge Me</v-toolbar-title>
      </router-link>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiInterface from '@/services/api-interface';
import axios from 'axios';
import RocketChatIframeCommander from '@/services/rocketchat-iframe-commander';

@Component
export default class Header extends Vue {
  public ghostServerUrl = process.env.VUE_APP_GHOST_SERVER_URL;
  public activeIndex = '1';
  public drawer = null;

  public goToStoryCenter() {
    const apiInterface = new ApiInterface();
    apiInterface.createGhostSession().then((response: any) => {
      window.location.href = process.env.VUE_APP_GHOST_SERVER_URL + '/ghost';
    });
  }

  public logout() {
    RocketChatIframeCommander.Instance.logoutFromChat();
    this.$auth.logout();
  }

  public handleSelect(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
}
</script>

<style lang="scss" scoped>
</style>
