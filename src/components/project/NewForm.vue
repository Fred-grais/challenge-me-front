<template>
  <div class="form">
    <div class="errors">
      <div class="error" v-for="error in errors" :key="error">
        {{ error }}
      </div>
    </div>

    <div class="result">
      {{ result }}
    </div>

    <section class="cid-r3ansR389K mbr" id="header15-u">

        <div class="container align-right">
          <div class="row">
            <div class="mbr-white col-lg-4 col-md-3 content-container"></div>
            <div class="col-lg-4 col-md-5">
              <div class="form-container">
                  <div class="media-container-column" data-form-type="formoid">

                      <form class="mbr-form">

                          <div data-for="name">
                              <div class="form-group">
                                  <input type="text" class="form-control px-3 name-input" v-model="name" placeholder="name" name="name" data-form-field="name" required="" id="name-header15-u">
                              </div>
                          </div>
                          <div data-for="description">
                              <div class="form-group">
                                  <input type="text" class="form-control px-3" v-model="description" placeholder="description" name="description" data-form-field="description" required="" id="description-header15-u">
                              </div>
                          </div>

                          <span class="input-group-btn">
                              <button type="button" class="btn btn-secondary btn-form display-4 submit-button" @click="submit()">Create Project</button>
                              <!-- <button href="" type="submit" class="btn btn-secondary btn-form display-4">SEND FORM</button> -->
                          </span>
                      </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </section>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { Project } from '@/store/current-project/types';

const meProjectNamespace: string = 'meProjectState';

@Component
export default class NewForm extends Vue {
  name: string = '';
  description: string = '';

  errors: string[] = [];
  result: string = '';

  @Action('create', { namespace: meProjectNamespace }) createProject!: (p: Partial<Project>) => Promise<any>;

  submit() {
    this.errors = [];
    this.result = '';

    this.createProject({
      name: this.name,
      description: this.description
    }).then( (response: any) => {
      if (response.status == 201) {
        this.result = 'Created!';
      } else {
        this.errors.push('Unexpected Error');
      }
    }).catch( (error: any) => {
      if (error.response) {
        this.errors = error.response.data;
      } else {
        this.errors.push('An error occurred, please try again later.');
      }
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
