<template>
  
  <v-container fluid grid-list-md pa-0>
    <v-layout row wrap justify-center>
      <v-flex v-for="user in users" :key="user.id" v-bind="{ ['xs4']: true }">
        <PreviewCard :userPreview="user"/>
      </v-flex>
    </v-layout>
  </v-container>

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
  public formErrors: string[] = [];

  public color = '#3AB982';
  public margin = '10px';
  public radius = '10px';
  public size = '15px';

  @Getter('getUsers', { namespace: usersNamespace })
  public users!: UserPreview[];
  @Getter('isFetching', { namespace: usersNamespace })
  public isFetching!: boolean;
  @Action('fetchData', { namespace: usersNamespace })
  public fetchData!: () => Promise<any>;

  public created() {
    this.fetchData().catch((error: any) => {
      this.formErrors.push(
        error.message || 'An error occured, please try again later.',
      );
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
