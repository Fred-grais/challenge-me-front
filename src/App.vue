<template>
  <div id="app" class="box">

    <div class="row header">
      <Header/>
    </div>

    <div class="row content">
      <div class="wrapper">
        <div class="inner-content-wrapper" v-if="authReady">
          <router-view/>
        </div>
        <div v-if="!authReady" class="global-loader">
          
          <grid-loader :color="color" :size="size"></grid-loader>
          
        </div>
      </div>
    </div>
    
    <div class="footer">
      <div class="wrapper">
        <Footer/>
      </div>
    </div>
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
.inner-content-wrapper {
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
}
.box {
  display: flex;
  flex-flow: column;
}

.box .row {
  border: 1px dotted grey;
}

.box .row.header {
  flex: 0 1 auto;
}

.box .row.content {
  flex: 1 1 auto;

  .wrapper {
    display: flex;
    flex-flow: column;
    flex: 1 1 auto;
  }
}

.box .row.footer {
  flex: 1 1 40px;
}

.wrapper {
  width: 100%;
}

.global-loader {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
