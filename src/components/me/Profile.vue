<template>
  <v-container>
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
                    :src="me.avatarUrl || 'https://api.adorable.io/avatars/285/abott@adorable.png'"
                    alt="avatar"
                  >
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="cyan"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-avatar>
                <v-flex>
                  <v-progress-linear
                    v-model="currentAvatarUploadProgress"
                    v-if="currentAvatarUploadProgress > 0"
                  ></v-progress-linear>
                  <input
                    ref="avatarFileInput"
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    @change="avatarChanged"
                  >

                  <v-snackbar
                    v-model="avatarUploadComplete"
                    color="success"
                    :timeout="3000"
                  >Avatar Uploaded!
                    <v-btn dark flat @click="avatarUploadComplete = false">Close</v-btn>
                  </v-snackbar>
                </v-flex>
                <v-divider></v-divider>
                <v-form>
                  <v-text-field v-model="me.email" label="Email" disabled></v-text-field>
                  <v-text-field
                    v-model="me.firstName"
                    v-validate="validations.firstName"
                    :error-messages="veeErrors.collect('firstName')"
                    label="First Name"
                    data-vv-name="firstName"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="me.lastName"
                    v-validate="validations.lastName"
                    :error-messages="veeErrors.collect('lastName')"
                    label="Last Name"
                    data-vv-name="lastName"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="me.position"
                    v-validate="validations.position"
                    :error-messages="veeErrors.collect('position')"
                    label="Position"
                    data-vv-name="position"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="me.twitterId"
                    v-validate="validations.twitterId"
                    :error-messages="veeErrors.collect('twitterId')"
                    label="Twitter Id"
                    data-vv-name="twitterId"
                    required
                  ></v-text-field>

                  <v-btn @click="save" color="primary">Save</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row fill-height justify-center>
      <v-flex xs5>
        <timeline :timeline="me.timeline" ref="timeline" :editMode="true"></timeline>
        <v-btn color="primary" @click="addItemToTimelineAction()">Add item</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter, Mutation, namespace } from 'vuex-class';

import { Me } from '@/store/me/types';
import PulseLoader from '@/components/loaders/PulseLoaderWrapper.vue';
import ItemEditor from '@/components/me/timeline/ItemEditor.vue';
import Timeline from '@/components/user/Timeline.vue';

import moment from 'moment';
import uuid from 'uuid';

import { ITimelineItem } from '@/store/common/types';

import each from 'lodash/each';

const meNamespace: string = 'meState';

const MeMutation = namespace(meNamespace, Mutation);

@Component({
  components: {
    PulseLoader,
    Timeline,
  },
})
export default class Profile extends Vue {
  public formErrors: string[] = [];
  public formSubmissionSuccessfull = false;
  public currentAvatarUploadProgress = 0;
  public avatarUploadComplete = false;

  @MeMutation('addItemToTimeline') public addItemToTimeline!: (
    item: ITimelineItem,
  ) => void;
  @Getter('getMe', { namespace: meNamespace }) public me!: Me;
  @Getter('isFetching', { namespace: meNamespace }) public isFetching!: boolean;

  @Action('updateMe', { namespace: meNamespace }) public updateMe!: (
    me: Me,
  ) => Promise<any>;

  @Action('uploadMeAvatar', { namespace: meNamespace })
  public uploadMeAvatar!: (params: {
    file: File;
    onUploadProgress: (progressEvent: any) => void;
  }) => Promise<any>;

  public validations = {
    firstName: {
      required: true,
      alpha: true,
    },
    lastName: {
      required: true,
      alpha: true,
    },
    position: {
      required: true,
      alpha: true,
    },
  };

  get currentDate() {
    return moment();
  }

  public addItemToTimelineAction() {
    this.addItemToTimeline({
      internalId: uuid.v4(),
      title: 'New Title',
      date: moment(),
      description: 'New description',
    });
  }

  private avatarChanged(event: any) {
    const input: any = this.$refs.avatarFileInput;

    this.uploadMeAvatar({
      file: input.files[0],
      onUploadProgress: this.onAvatarUploadProgress,
    }).then((response) => {
      this.currentAvatarUploadProgress = 0;
      this.avatarUploadComplete = true;
    });

    (this.$refs.avatarFileInput as any).value = null;
  }

  private onAvatarUploadProgress(progressEvent: any) {
    this.currentAvatarUploadProgress =
      (progressEvent.loaded / progressEvent.total) * 100;
  }

  private save() {
    this.$validator.validateAll();
    this.formSubmissionSuccessfull = false;
    if (this.veeErrors.all().length === 0) {
      this.updateMe(this.me)
        .then((response: any) => {
          // tslint:disable-next-line:no-console
          console.log(response);
          if (response.status === 200) {
            this.formSubmissionSuccessfull = true;
          }
        })
        .catch((error: any) => {
          this.formErrors.push(error.message);
          // tslint:disable-next-line:no-console
          console.log(error.message);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
