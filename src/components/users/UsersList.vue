<template>
  <div class="users-list">
    <section class="features16 cid-r2OLVt8pPE" id="features16-q">
      <pulse-loader :loading="isFetching"></pulse-loader>
      <div class="container align-center" v-if="!isFetching">
        <div class="errors">
          <div class="error" v-for="error in errors" :key="error">{{ error }}</div>
        </div>

        <h3 class="pb-5 mbr-section-subtitle mbr-fonts-style mbr-light display-1">Users</h3>

        <div v-for="(users, index) in chunkedUsers" :key="index" class="row media-row">
          <PreviewCard v-for="user in users" :key="user.id" :userPreview="user"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { UserPreview } from '@/store/users/types';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';
import PreviewCard from '@/components/user/PreviewCard.vue';

const usersNamespace: string = 'usersState';

@Component({
  components: {
    PreviewCard,
    PulseLoader,
  },
})
export default class UsersList extends Vue {
  public errors: string[] = [];

  public color = '#3AB982';
  public margin = '10px';
  public radius = '10px';
  public size = '15px';

  @Getter('getChunkedUsers', { namespace: usersNamespace })
  public chunkedUsers!: UserPreview[][];
  @Getter('isFetching', { namespace: usersNamespace }) public isFetching!: boolean;
  @Action('fetchData', { namespace: usersNamespace }) public fetchData!: () => Promise<
    any
  >;

  public created() {
    this.fetchData().catch((error: any) => {
      this.errors.push(
        error.message || 'An error occured, please try again later.',
      );
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
