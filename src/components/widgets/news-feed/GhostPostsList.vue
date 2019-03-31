<template>
  <v-card>
    <v-container fluid grid-list-md>
      <v-layout row wrap justify-center>
        <v-flex v-for="post in ghostPosts" :key="post.id" v-bind="{ ['xs4']: true }">
          <GhostPost :post="post"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter, namespace } from 'vuex-class';
import { Post } from '@/store/news-feed/types';

import GhostPost from '@/components/widgets/news-feed/GhostPost.vue';

const NewsFeedAction = namespace('newsFeedState', Action);
const NewsFeedGetter = namespace('newsFeedState', Getter);

@Component({
  components: {
    GhostPost,
  },
})
export default class GhostPostsList extends Vue {
  @NewsFeedAction('fetchGhostPosts')
  public fetchGhostPosts!: () => void;

  @NewsFeedGetter('fetchingGhostPosts')
  public fetchingGhostPosts!: boolean;

  @NewsFeedGetter('getGhostPosts')
  public ghostPosts!: Post[];

  public mounted() {
    this.fetchGhostPosts();
  }
}
</script>

<style lang="scss" scoped>
</style>