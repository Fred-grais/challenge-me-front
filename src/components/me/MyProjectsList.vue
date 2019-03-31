<template>
  <!-- <div class="my-projects">
    <section class="mbr-section content5 cid-r3amUe0ElS mbr-parallax-background" id="content5-t">
      <div class="container">
        <div class="media-container-row">
          <div class="title col-12 col-md-8">
            <h2 class="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-1">My Projects</h2>
          </div>
        </div>
      </div>
    </section>
    <br>
    <br>

    <Form/>

    <section class="features3 cid-r3ao134aCf" id="features3-z">
      <pulse-loader :loading="isFetching"></pulse-loader>

      <div class="container" v-if="!isFetching">
        <div v-for="(chunk, index) in projectsPreviews" :key="index" class="media-container-row">
          <PreviewCard
            v-for="projectPreview in chunk"
            :key="projectPreview.id"
            :projectPreview="projectPreview"
          />
        </div>
      </div>
    </section>
  </div>-->
  <v-container fluid grid-list-md pa-0>
    <v-layout row wrap justify-center>
      <v-flex xs5>
        <Form/>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-center>
      <v-flex
        v-for="projectPreview in projectsPreviews"
        :key="projectPreview.id"
        v-bind="{ ['xs4']: true }"
      >
        <PreviewCard :projectPreview="projectPreview"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { State, Action, Getter } from 'vuex-class';

import { ProjectPreview } from '@/store/projects/types';
import PreviewCard from '@/components/me/project/PreviewCard.vue';
import Form from '@/components/project/NewForm.vue';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';

import * as _ from 'lodash';

const meProjectsNamespace: string = 'meProjectsState';

@Component({
  components: {
    PreviewCard,
    Form,
    PulseLoader,
  },
})
export default class MyProjectsList extends Vue {
  @Getter('getProjects', { namespace: meProjectsNamespace })
  public projectsPreviews!: ProjectPreview[][];
  @Getter('isFetching', { namespace: meProjectsNamespace })
  public isFetching!: boolean;

  @Action('fetchData', { namespace: meProjectsNamespace })
  public fetchData!: () => Promise<any>;

  public created() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
</style>
