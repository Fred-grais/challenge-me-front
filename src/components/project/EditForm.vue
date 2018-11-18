<template>
  <div class="edit-form">

    <section class="header3 cid-r3anIOoz7O mbr-parallax-background" id="header3-v">
      <pulse-loader :loading="isFetching"></pulse-loader>
      <div class="container" v-if="!isFetching">
          <div class="media-container-row">
              <div class="mbr-figure" style="width: 90%;">
                  <img src="assets/images/01.jpg" alt="Mobirise">
              </div>

              <div class="media-content">
                  <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1">
                    {{ project.name }}
                  </h1>

                  <div class="mbr-section-text mbr-white pb-3 ">
                      <p class="mbr-text mbr-fonts-style display-5">
                        {{ project.description }}
                      </p>
                  </div>

              </div>
          </div>
      </div>

  </section>

    <div class="errors">
      <div class="error" v-for="error in errors" :key="error">
        {{ error }}
      </div>
    </div>

    <div class="result">
      {{ result }}
    </div>

    <section class="cid-r3ansR389K mbr" id="header15-u" v-if="project">
    <b-tabs v-on:input='onTabActivation'>
      <b-tab title="Project Infos" active>
        <pulse-loader :loading="isFetching"></pulse-loader>

            <div class="container" v-if="!isFetching" >
              <div class="row">
                <div class="mbr-white col-lg-4 col-md-3 content-container"></div>
                <div class="col-lg-4 col-md-5">
                  <div class="form-container">
                      <div class="media-container-column" data-form-type="formoid">

                          <form class="mbr-form">

                            <div>
                              <b-badge href="#" variant="primary" :active='true'>Primary</b-badge>
                              <b-badge href="#" variant="secondary">Secondary</b-badge>
                              <b-badge href="#" variant="success">Success</b-badge>
                              <b-badge href="#" variant="danger">Danger</b-badge>
                              <b-badge href="#" variant="warning">Warning</b-badge>
                              <b-badge href="#" variant="info">Info</b-badge>
                              <b-badge href="#" variant="light">Light</b-badge>
                              <b-badge href="#" variant="dark">Dark</b-badge>
                            </div>

                            <div>
                                <vue-tags-input
                                  ref='activitySectorsInput'
                                  v-model="tag"
                                  :tags="tagsForTagsInput"
                                  :autocomplete-items="filteredItems"
                                  @tags-changed="newTags => projectActivitySectorList(newTags)"
                                />
                              </div>

                              <div data-for="name">
                                  <div class="form-group">
                                      <input type="text" class="form-control px-3 name-input" v-model="project.name" placeholder="name" name="name" data-form-field="name" required="" id="name-header15-u">
                                  </div>
                              </div>
                              <div data-for="description">
                                  <div class="form-group">
                                      <input type="text" class="form-control px-3 description-input" v-model="project.description" placeholder="description" name="description" data-form-field="description" required="" id="description-header15-u">
                                  </div>
                              </div>

                              <span class="input-group-btn">
                                  <button type="button" class="btn btn-secondary btn-form display-4 submit-button submit-infos-button" @click="submit()">Update Project</button>
                                  <!-- <button href="" type="submit" class="btn btn-secondary btn-form display-4">SEND FORM</button> -->
                                  <router-link :to="{ name: 'my_projects' }">My Projects</router-link>
                              </span>
                          </form>
                      </div>
                  </div>
                </div>
              </div>
            </div>
      </b-tab>
      <b-tab title="Timeline" >
        <pulse-loader :loading="isFetching"></pulse-loader>

        <div class="container" v-if="!isFetching" >
          <timeline-editor ref="timelineEditor" :timeline="project.timeline" v-on:updated-timeline-returned="updateTimeline"></timeline-editor>
          <button type="button" class="btn btn-secondary btn-form display-4 submit-button submit-timeline-button" @click="submitTimeline()">Update Timeline</button>
        </div>
      </b-tab>
    </b-tabs>
</section>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { Project } from '@/store/current-project/types';
import {ITimeline} from '@/store/common/types';
import TimelineEditor from '@/components/widgets/TimelineEditor.vue';
import TimelineViewer from '@/components/widgets/TimelineViewer.vue';
import VueTagsInput from '@johmun/vue-tags-input';
import ApiInterface from '@/services/api-interface.ts';
import * as _ from 'lodash';

import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';

import globalEventBus from '@/services/global-event-bus';

const meProjectNamespace: string = 'meProjectState';


@Component({
  components: {
    TimelineEditor,
    TimelineViewer,
    PulseLoader,
    VueTagsInput,
  }
})
export default class EditForm extends Vue {

  errors: string[] = [];
  result: string = '';

  tag: string = '';
  tags = [];
  autocompleteItems = [{text: 'France'}];
  apiInterface: ApiInterface = new ApiInterface();
  debouncedSearchTags: () => any = function() {};

  @Getter('getProject', { namespace: meProjectNamespace }) project!: Project;
  @Getter('isFetching', { namespace: meProjectNamespace }) isFetching!: boolean;

  @Action('update', { namespace: meProjectNamespace }) updateProject!: (p: Partial<Project>) => Promise<any>;

  created() {
    this.debouncedSearchTags = _.debounce(() => {
      this.searchTags();
    }, 350);
  }

  updateTimeline(updatedTimeline: ITimeline) {
    this.project.timeline = updatedTimeline;
  }

  private submitTimeline() {
    this.errors = [];
    this.result = '';

    (this.$refs.timelineEditor as TimelineEditor).returnUpdatedTimeline();
    const timeline = this.project.timeline;
    const id = this.project.id;

    this.updateProject({timeline, id})
      .then( (response: any) => {
        if (response.status == 200) {
          this.result = 'Timeline Updated!';
        } else {
          this.errors.push('Unexpected Error');
        }
      }).catch( (error: any) => {
        if (error.response) {
          this.errors = (error.response.data);
        } else {
          this.errors.push('An error occurred, please try again later.')
        }
      });
  }

  private submit() {
    this.errors = [];
    this.result = '';

    const description = this.project.description;
    const name = this.project.name;
    const id = this.project.id;
    const activitySectorList = this.project.activitySectorList;

    this.updateProject({id, name, description, activitySectorList})
      .then( (response: any) => {
        if (response.status == 200) {
          this.result = 'Updated!';
        } else {
          this.errors.push('Unexpected Error');
        }
      }).catch( (error: any) => {
        if (error.response) {
          this.errors = (error.response.data);
        } else {
          this.errors.push('An error occurred, please try again later.')
        }
      });
  }

  get tagsForTagsInput() {
    return _.map(this.project.activitySectorList, (tag) => { return {text: tag }});
  }

  get filteredItems() {
    return this.autocompleteItems.filter(i => new RegExp(this.tag, 'i').test(i.text));
  }

  projectActivitySectorList(tags: {text: string, tiClasses: string[]}[]) {
    this.project.activitySectorList = _.map(tags, (tag) => { return tag.text });
  }

  onTabActivation(tabIndex: number) {
    if (tabIndex === 1) {
      globalEventBus.$emit('timeline-tab-activated');
    }
  }

  searchTags(): void {
    this.apiInterface.searchTags(this.tag).then((response: any) => {
      this.autocompleteItems = response.data.result;
    })
  }

  @Watch('tag')
  onTagChanged(val: string, oldVal: string) {
    this.debouncedSearchTags();
  }
}
</script>

<style lang="scss" scoped>
  .badge {
    opacity: 0.4;

    &.active {
      opacity: 1;
    }

  }
</style>
