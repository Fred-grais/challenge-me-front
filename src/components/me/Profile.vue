<template>
  <div class="profile">
    <div class="errors">
      <div class="error" v-for="error in errors" :key="error">
          {{ error }}
      </div>
    </div>

    <section class="cid-r3ansR389K mbr-fullscreen" id="header15-u">

        <div class="container align-right">
          <div class="row">
            <div class="mbr-white col-lg-4 col-md-3 content-container"></div>
            <div class="col-lg-4 col-md-5">
              <div class="form-container">
                  <div class="media-container-column" data-form-type="formoid">

                      <form class="mbr-form">

                          <div data-for="email">
                              <div class="form-group">
                                  <input type="text" disabled="true" :value="me.email" class="form-control px-3" name="email" data-form-field="email" placeholder="Email" required="" id="email-header15-u">
                              </div>
                          </div>
                          <div data-for="firstName">
                              <div class="form-group">
                                  <input type="text" v-model="me.firstName" class="form-control px-3" name="firstName" data-form-field="firstName" placeholder="First Name" required="" id="firstName-header15-u">
                              </div>
                          </div>
                          <div data-for="lastName">
                              <div class="form-group">
                                  <input type="text" v-model="me.lastName" class="form-control px-3" name="lastName" data-form-field="lastName" placeholder="Last Name" required="" id="lastName-header15-u">
                              </div>
                          </div>
                          <div data-for="position">
                              <div class="form-group">
                                  <input type="text" v-model="me.position" class="form-control px-3" name="position" data-form-field="position" placeholder="Position" id="position-header15-u">
                              </div>
                          </div>

                          <span class="input-group-btn">
                              <button type="button" id="save_btn" class="btn btn-secondary btn-form display-4" @click="save()">Save</button>
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

import { Me } from '@/store/me/types';

const meNamespace: string = 'meState';

@Component
export default class Profile extends Vue {
  errors: string[] = [];

  @Getter('getMe', { namespace: meNamespace }) me!: Me;

  @Action('updateMe', { namespace: meNamespace }) updateMe!: (me: Me) => Promise<any>;

  private save() {
    this.errors = [];

    this.updateMe(this.me)
      .then( (response: any) => {
        console.log(response);
      })
      .catch( (error: any) => {
        this.errors.push(error.message);
        console.log(error.message);
      });
  }
}
</script>

<style lang="scss" scoped>
</style>
