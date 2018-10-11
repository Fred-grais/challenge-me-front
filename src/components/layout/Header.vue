<template>

  <section class="menu cid-r2IZsvdheb" once="menu" id="menu1-2">
    <nav class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm bg-color transparent">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                  <router-link class="navbar-caption text-white display-4" to="/">
                    Challenge me
                  </router-link>
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
                <a class="nav-link link text-white display-4" v-on:click="$auth.logout()">
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
  </section>
  <!-- <div class="header">
    Header


    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/projects">Projects</router-link>|
      <router-link to="/users">Users</router-link> |
      <router-link v-if="$auth.check()" to="/me">Profile |</router-link>
      <a v-if="$auth.check()" v-on:click="$auth.logout()">Logout |</a>
      <router-link v-if="!$auth.check()" to="/login">Login |</router-link>
      <router-link v-if="!$auth.check()" to="/register">Register</router-link>
    </div>
  </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Header extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
