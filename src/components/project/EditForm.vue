<template>
  <!-- <div class="edit-form">
    <section class="header3 cid-r3anIOoz7O mbr-parallax-background" id="header3-v">
      <pulse-loader :loading="isFetching"></pulse-loader>
      <div class="container" v-if="!isFetching">
        <div class="media-container-row">
          <div class="mbr-figure" style="width: 90%;">
            <img src="assets/images/01.jpg" alt="Mobirise">
          </div>

          <div class="media-content">
            <h1
              class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1"
            >{{ project.name }}</h1>

            <div class="mbr-section-text mbr-white pb-3">
              <p class="mbr-text mbr-fonts-style display-5">{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="formErrors">
      <div class="error" v-for="error in formErrors" :key="error">{{ error }}</div>
    </div>

    <div class="result">{{ result }}</div>

    <section class="cid-r3ansR389K mbr" id="header15-u" v-if="project">
      <b-tabs v-on:input="onTabActivation">
        <b-tab title="Project Infos" active>
          <pulse-loader :loading="isFetching"></pulse-loader>

          <div class="container" v-if="!isFetching">
            <div class="row">
              <div class="mbr-white col-lg-4 col-md-3 content-container"></div>
              <div class="col-lg-4 col-md-5">
                <div class="form-container">
                  <div class="media-container-column" data-form-type="formoid">
                    <form class="mbr-form">
                      <div>
                        <b-badge href="#" variant="primary" :active="true">Primary</b-badge>
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
                          ref="activitySectorsInput"
                          v-model="tag"
                          :tags="tagsForTagsInput"
                          :autocomplete-items="filteredItems"
                          @tags-changed="newTags => projectActivitySectorList(newTags)"
                        />
                      </div>

                      <div data-for="name">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control px-3 name-input"
                            v-model="project.name"
                            placeholder="name"
                            name="name"
                            data-form-field="name"
                            required
                            id="name-header15-u"
                          >
                        </div>
                      </div>
                      <div data-for="description">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control px-3 description-input"
                            v-model="project.description"
                            placeholder="description"
                            name="description"
                            data-form-field="description"
                            required
                            id="description-header15-u"
                          >
                        </div>
                      </div>

                      <span class="input-group-btn">
                        <button
                          type="button"
                          class="btn btn-secondary btn-form display-4 submit-button submit-infos-button"
                          @click="submit()"
                        >Update Project</button>
                        <router-link :to="{ name: 'my_projects' }">My Projects</router-link>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Timeline">
          <pulse-loader :loading="isFetching"></pulse-loader>

          <div class="container" v-if="!isFetching">
            <timeline-editor
              ref="timelineEditor"
              :timeline="project.timeline"
              v-on:updated-timeline-returned="updateTimeline"
            ></timeline-editor>
            <button
              type="button"
              class="btn btn-secondary btn-form display-4 submit-button submit-timeline-button"
              @click="submitTimeline()"
            >Update Timeline</button>
          </div>
        </b-tab>
      </b-tabs>
    </section>
  </div>-->
  <v-container v-if="project">
    <v-layout row fill-height justify-center align-center>
      <v-flex xs5>
        <v-alert
          :value="true"
          type="success"
          v-if="formSubmissionSuccessfull"
          dismissible
        >Profile Updated</v-alert>
        <v-alert
          :value="true"
          type="error"
          v-if="formErrors.length > 0"
        >Some errors occurred while saving your informations:
          <ul>
            <li v-for="(error, i) in formErrors" :key="i">{{ error }}</li>
          </ul>
        </v-alert>
        <v-card pa-5>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12 pa-5>
                <v-avatar :size="256" color="grey lighten-4">
                  <v-img
                    :src="project.logoUrl || 'https://api.adorable.io/avatars/230/ott@adorable.png'"
                    alt="logo"
                  >
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="cyan lighten-5"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-avatar>
                <v-flex>
                  <v-progress-linear
                    v-model="currentLogoUploadProgress"
                    v-if="currentLogoUploadProgress > 0"
                  ></v-progress-linear>
                  <input
                    ref="logoFileInput"
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/png, image/jpeg"
                    @change="logoChanged"
                  >

                  <v-snackbar
                    v-model="logoUploadComplete"
                    color="success"
                    :timeout="3000"
                  >Logo Uploaded!
                    <v-btn dark flat @click="logoUploadComplete = false">Close</v-btn>
                  </v-snackbar>
                </v-flex>
                <v-form>
                  <v-autocomplete
                    v-initAutocomplete="autocompleteItemsInit()"
                    v-model="project.activitySectorList"
                    :items="autocompleteItems"
                    :loading="isLoadingTags"
                    :search-input.sync="tag"
                    box
                    chips
                    color="blue-grey lighten-2"
                    label="Tags"
                    item-text="text"
                    item-value="text"
                    multiple
                    cache-items
                  >
                    <template slot="selection" slot-scope="data">
                      <v-chip
                        :selected="data.selected"
                        close
                        class="chip--select-multi"
                        @input="remove(data.item)"
                      >
                        <v-avatar>
                          <img src="https://api.adorable.io/avatars/200/att@adorable.png">
                        </v-avatar>
                        {{ data.item.text }}
                      </v-chip>
                    </template>
                    <template slot="item" slot-scope="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-avatar>
                          <img src="https://api.adorable.io/avatars/200/abott@adorable.png">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.text"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="data.item.text"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                  </v-autocomplete>

                  <v-text-field
                    v-model="project.name"
                    v-validate="validations.name"
                    :error-messages="veeErrors.collect('name')"
                    label="Name"
                    data-vv-name="name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="project.description"
                    v-validate="validations.description"
                    :error-messages="veeErrors.collect('description')"
                    label="Description"
                    data-vv-name="description"
                    required
                  ></v-text-field>

                  <v-btn color="primary" @click="submit">Update</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row fill-height justify-center align-center>
      <v-flex xs12>
        <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
          <v-carousel-item
            v-for="(pictureUrl, index) in project.picturesUrls"
            :key="index"
            :src="pictureUrl"
          ></v-carousel-item>
        </v-carousel>
        <!-- <v-layout fill-height justify-center align-center>
          <v-flex xs4 v-for="(pictureUrl, index) in project.picturesUrls" :key="pictureUrl">
            <v-img
              :src="pictureUrl || 'https://api.adorable.io/avatars/230/ott@adorable.png'"
              alt="picture"
            >
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="cyan lighten-5"></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
          </v-flex>
        </v-layout>-->
        <v-progress-linear
          v-model="currentPicturesUploadProgress"
          v-if="currentPicturesUploadProgress > 0"
        ></v-progress-linear>
        <input
          ref="picturesFileInput"
          type="file"
          id="pictures"
          name="pictures"
          multiple
          accept="image/png, image/jpeg"
          @change="picturesChanged"
        >
      </v-flex>
    </v-layout>

    <v-layout row fill-height justify-center align-center>
      <v-flex xs12>
        <TimelineEditor :timeline="project.timeline"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

v-component
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { Project } from '@/store/current-project/types';
import { ITimeline } from '@/store/common/types';
import TimelineEditor from '@/components/widgets/TimelineEditor.vue';
import TimelineViewer from '@/components/widgets/TimelineViewer.vue';
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
  },
  directives: {
    initAutocomplete: {
      inserted: (el, binding, vnode) => {
        (vnode.context as any).autocompleteItems = binding.value;
      },
    },
  },
})
export default class EditForm extends Vue {
  @Getter('getProject', { namespace: meProjectNamespace })
  public project!: Project;
  @Getter('isFetching', { namespace: meProjectNamespace })
  public isFetching!: boolean;

  @Action('update', { namespace: meProjectNamespace }) public updateProject!: (
    p: Partial<Project>,
  ) => Promise<any>;

  @Action('uploadProjectLogo', { namespace: meProjectNamespace })
  public uploadProjectLogo!: (params: {
    projectId: number;
    file: File;
    onUploadProgress: (progressEvent: any) => void;
  }) => Promise<any>;

  @Action('uploadProjectPictures', { namespace: meProjectNamespace })
  public uploadProjectPictures!: (params: {
    projectId: number;
    files: File[];
    onUploadProgress: (progressEvent: any) => void;
  }) => Promise<any>;

  public formErrors: string[] = [];
  public formSubmissionSuccessfull = false;
  public isLoadingTags = false;
  public currentLogoUploadProgress = 0;
  public currentPicturesUploadProgress = 0;
  public logoUploadComplete = false;
  public picturesUploadComplete = false;

  public validations = {
    name: {
      required: true,
    },
    description: {
      required: true,
    },
  };

  public tag: string = '';
  public tags = [];
  public autocompleteItems: Array<{ text: string }> = [];
  public apiInterface: ApiInterface = new ApiInterface();
  // tslint:disable-next-line:no-empty
  public debouncedSearchTags: () => any = () => {};

  @Watch('tag')
  public onTagChanged(val: string, oldVal: string) {
    this.debouncedSearchTags();
  }

  public created() {
    this.debouncedSearchTags = _.debounce(() => {
      this.searchTags();
    }, 350);
  }

  public autocompleteItemsInit() {
    return _.map(this.project.activitySectorList, (sector) => {
      return { text: sector };
    });
  }

  public updateTimeline(updatedTimeline: ITimeline) {
    this.project.timeline = updatedTimeline;
  }

  public projectActivitySectorList(
    tags: Array<{ text: string; tiClasses: string[] }>,
  ) {
    this.project.activitySectorList = _.map(tags, (tag) => tag.text);
  }

  public onTabActivation(tabIndex: number) {
    if (tabIndex === 1) {
      globalEventBus.$emit('timeline-tab-activated');
    }
  }

  public searchTags(): void {
    this.isLoadingTags = true;
    this.apiInterface.searchTags(this.tag).then((response: any) => {
      this.isLoadingTags = false;
      this.autocompleteItems = response.data.result;
    });
  }

  private submitTimeline() {
    this.formErrors = [];
    (this.$refs.timelineEditor as TimelineEditor).returnUpdatedTimeline();
    const timeline = this.project.timeline;
    const id = this.project.id;
    this.formSubmissionSuccessfull = false;

    this.updateProject({ timeline, id })
      .then((response: any) => {
        if (response.status === 200) {
          this.formSubmissionSuccessfull = true;
        } else {
          this.formErrors.push('Unexpected Error');
        }
      })
      .catch((error: any) => {
        if (error.response) {
          this.formErrors = error.response.data;
        } else {
          this.formErrors.push('An error occurred, please try again later.');
        }
      });
  }

  private picturesChanged(event: any) {
    const input: any = this.$refs.picturesFileInput;
    this.uploadProjectPictures({
      projectId: this.project.id,
      files: input.files,
      onUploadProgress: this.onPicturesUploadProgress,
    }).then((response: any) => {
      this.currentPicturesUploadProgress = 0;
      this.picturesUploadComplete = true;
    });

    input.value = null;
  }

  private onPicturesUploadProgress(progressEvent: any) {
    this.currentPicturesUploadProgress =
      (progressEvent.loaded / progressEvent.total) * 100;
  }

  private logoChanged(event: any) {
    const input: any = this.$refs.logoFileInput;

    this.uploadProjectLogo({
      projectId: this.project.id,
      file: input.files[0],
      onUploadProgress: this.onLogoUploadProgress,
    }).then((response: any) => {
      this.currentLogoUploadProgress = 0;
      this.logoUploadComplete = true;
    });

    input.value = null;
  }

  private onLogoUploadProgress(progressEvent: any) {
    this.currentLogoUploadProgress =
      (progressEvent.loaded / progressEvent.total) * 100;
  }

  private submit() {
    this.formErrors = [];

    const description = this.project.description;
    const name = this.project.name;
    const id = this.project.id;
    const activitySectorList = this.project.activitySectorList;
    const timeline = this.project.timeline;

    this.formSubmissionSuccessfull = false;

    this.updateProject({ id, name, description, activitySectorList, timeline })
      .then((response: any) => {
        if (response.status === 200) {
          this.formSubmissionSuccessfull = true;
        } else {
          this.formErrors.push('Unexpected Error');
        }
      })
      .catch((error: any) => {
        if (error.response) {
          this.formErrors = error.response.data;
        } else {
          this.formErrors.push('An error occurred, please try again later.');
        }
      });
  }

  get tagsForTagsInput() {
    return _.map(this.project.activitySectorList, (tag) => ({ text: tag }));
  }

  get filteredItems() {
    return this.autocompleteItems.filter((i: { text: string }) =>
      new RegExp(this.tag, 'i').test(i.text),
    );
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
