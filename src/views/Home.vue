<template>
  <div class="home">
    <SitePresentation/>
    <MainPodcastViewer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SitePresentation from '@/components/home/SitePresentation.vue'; // @ is an alias to /src
import MainPodcastViewer from '@/components/widgets/news-feed/MainPodcastViewer.vue';

@Component({
  components: {
    SitePresentation,
    MainPodcastViewer
  },
})
export default class Home extends Vue {}
</script>
