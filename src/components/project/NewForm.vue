<template>
  <v-card pa-5>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 pa-5>
          <v-alert
            :value="true"
            type="success"
            v-if="formSubmissionSuccessfull"
            dismissible
          >Project created!</v-alert>
          <v-alert
            :value="true"
            type="error"
            v-if="formErrors.length > 0"
          >Some errors occurred while saving this project:
            <ul>
              <li v-for="(error, i) in formErrors" :key="i">{{ error }}</li>
            </ul>
          </v-alert>
          <form>
            <v-text-field
              v-model="name"
              v-validate="validations.name"
              :error-messages="veeErrors.collect('name')"
              label="Name"
              data-vv-name="name"
              required
            ></v-text-field>

            <v-text-field
              v-model="description"
              v-validate="validations.description"
              :error-messages="veeErrors.collect('description')"
              label="Description"
              data-vv-name="description"
              required
            ></v-text-field>

            <v-btn @click="submit" color="primary">Create Project</v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>

  <!-- <div class="form">
    <div class="formErrors">
      <div class="error" v-for="error in formErrors" :key="error">{{ error }}</div>
    </div>

    <div class="result">{{ result }}</div>

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
                      <input
                        type="text"
                        class="form-control px-3 name-input"
                        v-model="name"
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
                        class="form-control px-3"
                        v-model="description"
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
                      class="btn btn-secondary btn-form display-4 submit-button"
                      @click="submit()"
                    >Create Project</button>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { Project } from '@/store/current-project/types';

const meProjectNamespace: string = 'meProjectState';

@Component
export default class NewForm extends Vue {
  public name: string = '';
  public description: string = '';

  public formSubmissionSuccessfull = false;

  public formErrors: string[] = [];

  public validations = {
    name: {
      required: true,
    },
    description: {
      required: true,
    },
  };

  @Action('create', { namespace: meProjectNamespace }) public createProject!: (
    p: Partial<Project>,
  ) => Promise<any>;

  public submit() {
    this.formErrors = [];
    this.formSubmissionSuccessfull = false;
    this.$validator.validateAll().then((valid) => {
      if (valid) {
        this.createProject({
          name: this.name,
          description: this.description,
        })
          .then((response: any) => {
            if (response.status === 201) {
              this.formSubmissionSuccessfull = true;
              this.name = '';
              this.description = '';
            } else {
              this.formErrors.push('Unexpected Error');
            }
          })
          .catch((error: any) => {
            // tslint:disable-next-line:no-console
            console.error(error);
            if (error.response) {
              this.formErrors = error.response.data;
            } else {
              this.formErrors.push(
                'An error occurred, please try again later.',
              );
            }
          });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
