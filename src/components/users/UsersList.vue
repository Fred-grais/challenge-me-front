<template>
  <div class="users-list">
    Users List
    <div class="errors">
      <div class="error" v-for="error in errors" :key="error">
        {{ error }}
      </div>
    </div>

    <section class="features16 cid-r2OLVt8pPE" id="features16-q">



        <div class="container align-center">
            <!-- <h2 class="pb-3 mbr-fonts-style mbr-section-title display-2">
                OUR AWESOME TEAM
            </h2> -->
            <h3 class="pb-5 mbr-section-subtitle mbr-fonts-style mbr-light display-1">
                Users</h3>
            <div v-for="(users, index) in chunkedUsers" :key="index" class="row media-row">
              <PreviewCard v-for="user in users" :key="user.id" :userPreview="user" />
            </div>
        </div>
    </section>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { UserPreview } from '@/store/users/types';
import PreviewCard from '@/components/user/PreviewCard.vue';

const usersNamespace: string = 'usersState';

@Component({
  components: {
    PreviewCard,
  }
})
export default class UsersList extends Vue {
  errors: string[] = [];

  @Getter('getChunkedUsers', { namespace: usersNamespace }) chunkedUsers!: UserPreview[][];
  @Action('fetchData', { namespace: usersNamespace }) fetchData!: () => Promise<any>;

  created() {
    this.fetchData().catch( (error: any) => {
      this.errors.push(error.message || 'An error occured, please try again later.');
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
