<template>
  <v-timeline-item
    :color="`${color} lighten-1`"
    :class="[right ? 'v-timeline-item--right' : 'v-timeline-item--left']"
    fill-dot
  >
    <v-card v-if="right">
      <v-card-title :class="`${color} lighten-1`">
        <v-icon class="mr-3" dark size="42">mdi-email-outline</v-icon>
        <h2 class="display-1 white--text font-weight-light">
          <div v-if="editMode">
            <v-text-field
              v-model="item.title"
              v-validate="validations.title"
              :error-messages="veeErrors.collect('title')"
              label="Title"
              data-vv-name="title"
              required
            ></v-text-field>
          </div>
          <div v-else>{{ item.title }}</div>
        </h2>
      </v-card-title>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <div v-if="editMode">
              <v-textarea
                v-model="item.description"
                v-validate="validations.description"
                :error-messages="veeErrors.collect('description')"
                data-vv-name="description"
                box
                name="input-7-4"
                label="Content"
                required
              ></v-textarea>
            </div>
            <div v-else>{{ item.description }}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card v-else>
      <v-card-title :class="`${color} lighten-1 justify-end`">
        <h2 class="display-1 mr-3 white--text font-weight-light">
          <div v-if="editMode">
            <v-text-field
              v-model="item.title"
              v-validate="validations.title"
              :error-messages="veeErrors.collect('title')"
              label="Title"
              data-vv-name="title"
              required
            ></v-text-field>
          </div>
          <div v-else>{{ item.title }}</div>
        </h2>
        <v-icon dark size="42">mdi-account-multiple-outline</v-icon>
      </v-card-title>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <div v-if="editMode">
              <v-textarea
                v-model="item.description"
                v-validate="validations.description"
                :error-messages="veeErrors.collect('description')"
                data-vv-name="description"
                box
                name="input-7-4"
                label="Content"
                required
              ></v-textarea>
            </div>
            <div v-else>{{ item.description }}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

import { ITimelineItem } from '@/store/common/types';
import moment from 'moment';
import uuid from 'uuid';

@Component
export default class Item extends Vue {
  @Prop(Object) public item!: ITimelineItem;
  @Prop(Boolean) public right!: string;
  @Prop(String) public color!: string;

  @Prop({ type: Boolean, default: false }) public editMode!: boolean;

  @Prop(Number) public itemIndex!: number;

  public validations = {
    title: {
      required: true,
    },
    description: {
      required: true,
    },
  };

  get formattedDate() {
    return this.item.date.format('DD MMMM YYYY');
  }

  public emitUpdatedItem() {
    // this.updatedItem({
    //   internalId: uuid.v4(),
    //   title: this.updatedTitle,
    //   description: this.updatedDescription,
    //   date: moment(this.updatedDate),
    //   imageUrl: this.updatedImageUrl,
    // });
  }

  public deleteItem() {
    this.deletedItem(this.itemIndex);
  }

  @Emit()
  // tslint:disable-next-line:no-empty
  public updatedItem(returnedTimelineItem: ITimelineItem) {}

  @Emit()
  // tslint:disable-next-line:no-empty
  public deletedItem(itemIndex: number) {}
}
</script>

<style lang="scss" scoped>
</style>
