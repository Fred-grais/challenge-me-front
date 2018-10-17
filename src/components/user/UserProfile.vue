<template>
  <div class="user-profile">

    <pulse-loader :loading="isFetching"></pulse-loader>

    <div>
      <div class="errors">
        <div class="error" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </div>
    </div>

    <div v-if="currentUser">
      <section class="mbr-section content5 cid-r2OL62NLQI mbr-parallax-background" id="content5-n">
        <div class="container">
            <div class="media-container-row">
                <div class="title col-12 col-md-8">
                    <h2 class="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-1">
                        {{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
                    <h3 class="mbr-section-subtitle align-center mbr-light mbr-white pb-3 mbr-fonts-style display-5">
                        {{ currentUser.position }}&nbsp;</h3>
                </div>
            </div>
        </div>
      </section>

      <section class="timeline1 cid-r2OLxVwgAo" id="timeline1-o">
          <div class="container align-center">
              <h2 class="mbr-section-title pb-3 mbr-fonts-style display-2">
                  Timeline
              </h2>
              <h3 class="mbr-section-subtitle pb-5 mbr-fonts-style display-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </h3>

              <div class="container timelines-container" mbri-timelines="">
                  <div class="row timeline-element reverse separline">
                       <div class="timeline-date-panel col-xs-12 col-md-6  align-left">
                          <div class="time-line-date-content">
                              <p class="mbr-timeline-date mbr-fonts-style display-5">
                                  1 january 2018
                              </p>
                          </div>
                      </div>
                 <span class="iconBackground"></span>
                  <div class="col-xs-12 col-md-6 align-right">
                      <div class="timeline-text-content">
                          <h4 class="mbr-timeline-title pb-3 mbr-fonts-style display-5">
                              Multi Homepages
                          </h4>
                          <p class="mbr-timeline-text mbr-fonts-style display-7">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat libero, bibendum in libero tempor, luctus volutpat ligula. Integer fringilla porttitor pretium. Nam erat felis, iaculis id justo ut, ullamcorper feugiat elit. Proin vel lectus auctor, porttitor ligula vitae, convallis leo. In eget massa elit.
                          </p>
                       </div>
                  </div>
                  </div>

                  <div class="row timeline-element  separline">
                      <div class="timeline-date-panel col-xs-12 col-md-6 align-right">
                          <div class="time-line-date-content">
                              <p class="mbr-timeline-date mbr-fonts-style display-5">
                                  2 february 2019
                              </p>
                          </div>
                      </div>
                      <span class="iconBackground"></span>
                      <div class="col-xs-12 col-md-6 align-left ">
                          <div class="timeline-text-content">
                              <h4 class="mbr-timeline-title pb-3 mbr-fonts-style display-5">
                                  Responsive Design
                              </h4>
                              <p class="mbr-timeline-text mbr-fonts-style display-7">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat libero, bibendum in libero tempor, luctus volutpat ligula. Integer fringilla porttitor pretium. Nam erat felis, iaculis id justo ut, ullamcorper feugiat elit. Proin vel lectus auctor, porttitor ligula vitae, convallis leo. In eget massa elit.
                              </p>
                          </div>
                      </div>
                  </div>


                  <div class="row timeline-element reverse">
                      <div class="timeline-date-panel col-xs-12 col-md-6  align-left">
                          <div class="time-line-date-content">
                              <p class="mbr-timeline-date mbr-fonts-style display-5">
                                  3 march 2020
                              </p>
                          </div>
                      </div>
                      <span class="iconBackground"></span>
                      <div class="col-xs-12 col-md-6 align-right">
                          <div class="timeline-text-content">
                              <h4 class="mbr-timeline-title pb-3 mbr-fonts-style display-5">
                                  Smart Watch
                              </h4>
                              <p class="mbr-timeline-text mbr-fonts-style display-7">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat libero, bibendum in libero tempor, luctus volutpat ligula. Integer fringilla porttitor pretium. Nam erat felis, iaculis id justo ut, ullamcorper feugiat elit. Proin vel lectus auctor, porttitor ligula vitae, convallis leo. In eget massa elit.
                              </p>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { User } from '@/store/current-user/types';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';
const currentUserNamespace: string = 'currentUserState';

@Component({
  components: {
    PulseLoader,
  }
})
export default class UserProfile extends Vue {

  errors: string[] = [];

  @Getter('getCurrentUser', { namespace: currentUserNamespace }) currentUser!: User;
  @Getter('getFetchingState', { namespace: currentUserNamespace }) isFetching!: boolean;

  @Action('fetchData', { namespace: currentUserNamespace }) fetchData!: (userId: number) => Promise<any>;

  created() {
    this.fetchUserDetails();
  }

 fetchUserDetails() {
    this.fetchData(+this.$route.params.id).catch( (error: any) => {
      console.log('ghere');
      this.errors.push(error.message || 'An error occured, please try again later.');
    });
  }

  @Watch('$route')
  onRouteChanged(val: string, oldVal: string) { this.fetchUserDetails(); }
}
</script>

<style lang="scss" scoped>
</style>
