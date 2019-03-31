<template>
  <v-card>
    <v-img :src="podcast.thumbnailUrl" aspect-ratio="2.75"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ podcast.title }}</h3>
        <p class="publishing-date-wrapper">{{formattedPublishingDate}}</p>
        <div v-html="podcast.description">{{ podcast.description }}</div>
      </div>
    </v-card-title>

    <v-card-actions text-xs-center>
      <audio controls>
        <source :src="podcast.contentUrl" type="audio/mp3">Your browser does not support the audio tag.
      </audio>
    </v-card-actions>
  </v-card>

  <!-- <b-card
    v-if="podcast"
    :title="podcast.title"
    :img-src="podcast.thumbnailUrl"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <p class="publishing-date-wrapper">{{formattedPublishingDate}}</p>
    <p class="card-text" v-html="podcast.description"></p>
    <audio controls>
      <source :src="podcast.contentUrl" type="audio/mp3">Your browser does not support the audio tag.
    </audio>
  </b-card>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Podcast } from '@/store/news-feed/types';

@Component
export default class PodcastViewer extends Vue {
  @Prop({ required: true }) private podcast!: Podcast;

  get formattedPublishingDate(): string {
    return this.podcast.publishingDate.format('LLLL');
  }
}
</script>

<style lang="scss" scoped>
audio {
  margin: auto;
}
</style>
