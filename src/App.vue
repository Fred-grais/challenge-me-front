<template>
  <div id="app">
    <Header/>
    <div v-if="$auth.ready()">
      <router-view/>
    </div>
    <div v-if="!$auth.ready()" class="global-loader-container">
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
import GridLoader from 'vue-spinner/src/GridLoader.vue'

@Component({
  components: {
    Header,
    Footer,
    GridLoader,
  }
})
export default class App extends Vue {
  color = '#fff';
  size = '25px';
}

</script>

<style lang="scss">
html, body {
  height: 100%;
}

body {
      background-color: #232323;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.global-loader-container {
  text-align: center;
  display: table;
  height: 100%;
  width: 100%;

  .global-loader-inner-container {
    display: table-cell;
    vertical-align: middle;

    .inline-wrapper {
      display: inline-block;
    }
  }
}
</style>
