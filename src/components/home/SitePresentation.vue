<template>
  <section class="header10 cid-r2IYmZWcfb mbr-fullscreen mbr-parallax-background" id="header10-0">
      <div class="container">
          <div class="media-container-column mbr-white col-lg-8 col-md-10 ml-auto">
              <h1 class="mbr-section-title align-right mbr-bold pb-3 mbr-fonts-style display-1">
                  Challenge Me</h1>
              <h3 class="mbr-section-subtitle align-right mbr-light pb-3 mbr-fonts-style display-2">
                  Confront your ideas to better them</h3>
              <p class="mbr-text align-right pb-3 mbr-fonts-style display-5">
                 Challenge Me allows you to confront your ideas with other entrepeneurs to better them</p>
              <div class="mbr-section-btn align-right">
                <router-link class="btn btn-md btn-primary display-4" to="/projects">Browse Projects</router-link>
                  <router-link class="btn btn-md btn-white-outline display-4" to="/users">Browse Users</router-link>
              </div>
          </div>
      </div>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class SitePresentation extends Vue {

  }
</script>

<style lang="scss" scoped>
</style>
