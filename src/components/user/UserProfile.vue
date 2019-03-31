<template>
  <v-layout column fill-height>
    <v-flex xs12>
      <v-card tile>
        <v-card-title primary-title>
          <v-flex xs3>
            <v-avatar :tile="false" :size="256" color="grey lighten-4">
              <v-img
                :src="currentUser.avatarUrl || 'https://api.adorable.io/avatars/285/abott@adorable.png'"
                alt="avatar"
              >
                <template v-slot:placeholder>
                  <v-layout fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="cyan"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-avatar>
          </v-flex>
          <v-flex xs6>
            <div class="text-xs-center">
              <div class="headline">{{ currentUser.firstName }} {{ currentUser.lastName }}</div>
              <span class="grey--text">{{ currentUser.position }}</span>
            </div>
            <div>
              <v-btn @click="sendMessage" color="primary">Send message</v-btn>
            </div>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-tabs centered color="cyan" dark icons-and-text grow>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab href="#tab-1">Recents
          <v-icon>phone</v-icon>
        </v-tab>

        <v-tab href="#tab-2">Timeline
          <v-icon>mdi-timeline-text</v-icon>
        </v-tab>

        <v-tab href="#tab-3">Twitter
          <v-icon>mdi-twitter</v-icon>
        </v-tab>

        <v-tab-item value="tab-1">
          <v-card flat>
            <v-responsive :aspect-ratio="4/1">
              <v-card-text>
                htyhtyhtyhtyhh
                htyhtyh
                hythtyh
                htyhtyht
              </v-card-text>
            </v-responsive>
          </v-card>
        </v-tab-item>

        <v-tab-item value="tab-2">
          <timeline :timeline="currentUser.timeline"></timeline>
        </v-tab-item>

        <v-tab-item value="tab-3">
          <div class="twitter-widget-container" v-if="currentUser.twitterId">
            <twitter>
              <div slot="loading">loading .....</div>
              <a
                class="twitter-timeline"
                :href="`https://twitter.com/${currentUser.twitterId}?ref_src=twsrc%5Etfw`"
              >Tweets by Asmongold</a>
            </twitter>
          </div>
          <div v-else>No twitter feed to display</div>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
  <!-- <div class="user-profile">
    <pulse-loader :loading="isFetching"></pulse-loader>

    <div>
      <div class="formErrors">
        <div class="error" v-for="error in formErrors" :key="error">{{ error }}</div>
      </div>
    </div>

    <div v-if="currentUser">
      <section class="mbr-section content5 cid-r2OL62NLQI mbr-parallax-background" id="content5-n">
        <div class="container">
          <div class="media-container-row">
            <div class="title col-12 col-md-8">
              <h2
                class="align-center mbr-bold mbr-white pb-3 mbr-fonts-style display-1"
              >{{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
              <h3
                class="mbr-section-subtitle align-center mbr-light mbr-white pb-3 mbr-fonts-style display-5"
              >{{ currentUser.position }}&nbsp;</h3>
              <h4>
                <button @click="sendMessage">Send message</button>
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section class="timeline1 cid-r2OLxVwgAo" id="timeline1-o">
        <div class="container align-center">
          <h2 class="mbr-section-title pb-3 mbr-fonts-style display-2">Timeline</h2>
          <h3
            class="mbr-section-subtitle pb-5 mbr-fonts-style display-5"
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit</h3>

          <div class="container timelines-container" mbri-timelines>
            <item
              v-for="(item, index) in currentUser.timeline.items"
              :key="item.internalId"
              :item="item"
              :position="index % 2 === 0 ? 'left' : 'right'"
            ></item>
          </div>
        </div>
      </section>

      <div class="twitter-widget-container" v-if="currentUser.twitterId">
        <twitter>
          <div slot="loading">loading .....</div>
          <a
            class="twitter-timeline"
            :href="`https://twitter.com/${currentUser.twitterId}?ref_src=twsrc%5Etfw`"
          >Tweets by Asmongold</a>
        </twitter>
      </div>
      <div v-else>No twitter feed to display</div>
    </div>
  </div>-->
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { User } from '@/store/current-user/types';
import { twitter } from 'vue-twitter';

import RocketChatIframeCommander from '@/services/rocketchat-iframe-commander';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';
import EventBus, { OPENCHATTABEVENT } from '@/services/global-event-bus';
import Timeline from '@/components/user/Timeline.vue';

const currentUserNamespace: string = 'currentUserState';

@Component({
  components: {
    PulseLoader,
    twitter,
    Timeline,
  },
})
export default class UserProfile extends Vue {
  public formErrors: string[] = [];
  public years = [
    {
      color: 'cyan',
      year: '1960',
    },
    {
      color: 'green',
      year: '1970',
    },
    {
      color: 'pink',
      year: '1980',
    },
    {
      color: 'amber',
      year: '1990',
    },
    {
      color: 'orange',
      year: '2000',
    },
  ];

  @Getter('getCurrentUser', { namespace: currentUserNamespace })
  public currentUser!: User;
  @Getter('getFetchingState', { namespace: currentUserNamespace })
  public isFetching!: boolean;

  @Action('fetchData', { namespace: currentUserNamespace }) public fetchData!: (
    userId: number,
  ) => Promise<any>;

  public created() {
    this.fetchUserDetails();
  }

  public fetchUserDetails() {
    this.fetchData(+this.$route.params.id).catch((error: any) => {
      // tslint:disable-next-line:no-console
      this.formErrors.push(
        error.message || 'An error occured, please try again later.',
      );
    });
  }

  public sendMessage() {
    RocketChatIframeCommander.Instance.openDirectMessageTo(
      this.currentUser.rocketChatProfile.name,
    );
    EventBus.$emit(OPENCHATTABEVENT);
  }

  @Watch('$route')
  public onRouteChanged(val: string, oldVal: string) {
    this.fetchUserDetails();
  }
}
</script>

<style lang="scss" scoped>
.twitter-widget-container {
  width: 25%;
  display: inline-block;
  height: 700px;
  overflow: auto;
}
</style>
