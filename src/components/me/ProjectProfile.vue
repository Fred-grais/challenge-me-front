<template>
  <div class="my-project">
    <pulse-loader :loading="isFetching"></pulse-loader>

    <Form v-if="!isFetching" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { Project } from '@/store/current-project/types';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';

import Form from '@/components/project/EditForm.vue';

const meProjectNamespace: string = 'meProjectState';

@Component({
  components: {
    Form,
    PulseLoader,
  }
})
export default class ProjectProfile extends Vue {

  @Getter('isFetching', { namespace: meProjectNamespace }) isFetching!: boolean;

  @Action('fetchData', { namespace: meProjectNamespace }) fetchData!: (projectId: number) => void;

  created() {
    this.fetchProjectDetails();
  }

  fetchProjectDetails() {
    this.fetchData(+this.$route.params.id);
  }

  @Watch('$route')
  onRouteChanged(val: string, oldVal: string) { this.fetchProjectDetails(); }
}
</script>

<style lang="scss" scoped>
</style>
