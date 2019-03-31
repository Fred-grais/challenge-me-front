<template>
  <v-card>
    <v-img :src="post.feature_image" height="200px">
      <v-container fill-height fluid pa-2>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline white--text" v-text="post.title"></span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :href="post.url" target="_blank" icon>
        <v-icon>open_in_new</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>bookmark</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>share</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Post } from '@/store/news-feed/types';
@Component
export default class GhostPost extends Vue {
  @Prop({ required: true, type: Object })
  public post!: Post;
}
</script>

<style lang="scss" scoped>
</style>