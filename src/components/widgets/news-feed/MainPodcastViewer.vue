<template>
  <div class="main-podcast-viewer">
    <h2>Podcast of the day</h2>
    <PodcastViewer class="main-podcast" :podcast="mainPodcast"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import PodcastViewer from '@/components/widgets/news-feed/PodcastViewer.vue';
import { Podcast } from '@/store/news-feed/types';

const newsFeedNamespace = 'newsFeedState';

@Component({
  components: {
    PodcastViewer,
  },
})
export default class MainPodcastViewer extends Vue {
  @Action('fetchMainPodcast', { namespace: newsFeedNamespace })
  public fetchMainPodcast!: () => Promise<any>;
  @Getter('getMainPodcast', { namespace: newsFeedNamespace })
  public mainPodcast!: Podcast;

  public created() {
    this.fetchMainPodcast();
  }
}
</script>

<style lang="scss" scoped>
.main-podcast {
  margin: auto;
  max-width: 30% !important;
}
</style>
