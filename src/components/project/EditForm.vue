<template>
  <div class="edit-form">

    <section class="header3 cid-r3anIOoz7O mbr-parallax-background" id="header3-v">
      <div class="container">
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
  <br/>
  <br/>

    <div class="errors">
      <div class="error" v-for="error in errors" :key="error">
        {{ error }}
      </div>
    </div>

    <div class="result">
      {{ result }}
    </div>

    <section class="cid-r3ansR389K mbr" id="header15-u" v-if="project">

        <div class="container align-right">
          <div class="row">
            <div class="mbr-white col-lg-4 col-md-3 content-container"></div>
            <div class="col-lg-4 col-md-5">
              <div class="form-container">
                  <div class="media-container-column" data-form-type="formoid">

                      <form class="mbr-form">

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
                              <button type="button" class="btn btn-secondary btn-form display-4 submit-button submit-button" @click="submit()">Update Project</button>
                              <!-- <button href="" type="submit" class="btn btn-secondary btn-form display-4">SEND FORM</button> -->
                              <router-link :to="{ name: 'my_projects' }">My Projects</router-link>
                          </span>
                      </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    <br/>
    <br/>
    <!-- <form v-if="project">
      <div>
        <input class="name-input" type="text" v-model="project.name" placeholder="name" />
      </div>

      <div>
        <input class="description-input" type="text" v-model="project.description" placeholder="description" />
      </div>

      <button class="submit-button" type="button" @click="submit()">Update Project</button>
      <router-link :to="{ name: 'my_projects' }">My Projects</router-link>
    </form> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { Project } from '@/store/current-project/types';

const meProjectNamespace: string = 'meProjectState';

@Component
export default class EditForm extends Vue {

  errors: string[] = [];
  result: string = '';

  @Getter('getProject', { namespace: meProjectNamespace }) project!: Project;
  @Action('update', { namespace: meProjectNamespace }) updateProject!: (p: Partial<Project>) => Promise<any>;

  private submit() {
    this.errors = [];
    this.result = '';

    this.updateProject(this.project)
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
}
</script>

<style lang="scss" scoped>
</style>
