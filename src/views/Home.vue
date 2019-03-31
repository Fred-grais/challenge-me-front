<template>
  <v-layout column justify-center fill-height pa-5 class="home-container">
    <SitePresentation/>

    <v-bottom-sheet full-width>
      <v-btn slot="activator" color="cyan" dark>Podcast of the day</v-btn>
      <v-list>
        <MainPodcastViewer/>
      </v-list>
    </v-bottom-sheet>

    <v-bottom-sheet>
      <v-btn slot="activator" color="cyan" dark>Latest Stories</v-btn>
      <GhostPostsList/>
    </v-bottom-sheet>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SitePresentation from '@/components/home/SitePresentation.vue'; // @ is an alias to /src
import MainPodcastViewer from '@/components/widgets/news-feed/MainPodcastViewer.vue';
import GhostPostsList from '@/components/widgets/news-feed/GhostPostsList.vue';

@Component({
  components: {
    SitePresentation,
    MainPodcastViewer,
    GhostPostsList,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home-container {
  background: url('~@/assets/images/background_home.jpg') center / cover;
}
.el-container {
  justify-content: center;
}
</style>
