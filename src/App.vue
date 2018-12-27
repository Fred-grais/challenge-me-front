<template>
  <div id="app">
    <Header/>
    <div v-if="authReady">
      <router-view/>
    </div>
    <div v-if="!authReady" class="global-loader-container">
      <div class="global-loader-inner-container">
        <div class="inline-wrapper">
          <grid-loader :color="color" :size="size"></grid-loader>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';

@Component({
  components: {
    Header,
    Footer,
    GridLoader,
  },
})
export default class App extends Vue {
  public color = '#fff';
  public size = '25px';

  get authReady(): boolean {
    return this.$auth.ready();
  }
}
</script>

<style lang="scss">
</style>
