<template>
  <div class="my-project">
    <Form/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { Project } from '@/store/current-project/types';

import Form from '@/components/project/EditForm.vue';

const meProjectNamespace: string = 'meProjectState';

@Component({
  components: {
    Form,
  },
})
export default class ProjectProfile extends Vue {
  @Action('fetchData', { namespace: meProjectNamespace }) public fetchData!: (
    projectId: number,
  ) => void;

  public created() {
    this.fetchProjectDetails();
  }

  public fetchProjectDetails() {
    this.fetchData(+this.$route.params.id);
  }

  @Watch('$route')
  public onRouteChanged(val: string, oldVal: string) {
    this.fetchProjectDetails();
  }
}
</script>

<style lang="scss" scoped>
</style>
