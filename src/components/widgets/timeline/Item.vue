<template>
  <div class="timeline-item">
    <div class="timeline-img"></div>

    <div v-bind:class="classObject">
      <button type="button" v-on:click="deleteItem" v-if="editMode">Delete</button>
      <div class="timeline-img-header" v-if="containsImage || editMode" v-bind:style="{ 'background-image': 'url(' + headerImageUrl + ')' }">
        <h2 v-if="!editMode">{{title}}</h2>
        <div v-if="editMode" class="header-container">
          <input type="url" placeholder="Enter image url" v-model="updatedImageUrl"/>
          <h2>
            <input type="text" v-model="updatedTitle"/>
          </h2>
        </div>
      </div>
      <div v-else>
        <h2 v-if="!editMode">{{title}}</h2>
        <h2 v-if="editMode"><input type="text" v-model="updatedTitle"/></h2>
      </div>


      <div class="date">
        <div v-if="!editMode">{{ formattedDate }}</div>
        <div v-if="editMode"><datepicker v-model="updatedDate"></datepicker></div>
      </div>
      <p>
        <div v-if="!editMode">
          {{description}}
        </div>
        <div v-if="editMode">
          <textarea v-model="updatedDescription"></textarea>
        </div>
      </p>
      <a class="bnt-more" href="javascript:void(0)">More</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

import Datepicker from 'vuejs-datepicker';

import {ITimelineItem} from '@/store/common/types';
import moment from 'moment';

@Component({
  components: {
    Datepicker,
  }
})
export default class Item extends Vue {
  @Prop(String) title!: string;
  @Prop(Object) date!: moment.Moment;
  @Prop(String) description!: string;

  @Prop({type: Boolean, default: false}) fadeInLeft!: boolean;
  @Prop(String) imageUrl: string | undefined;

  @Prop({type: Boolean, default: false}) editMode!: boolean;

  @Prop(Number) itemIndex!: number;

  containsImage: boolean = false;

  updatedTitle: string = '';
  updatedDescription: string = '';
  // Must use the Date type here instead of Moment because the datePicker does not support Moment input
  updatedDate: Date = new Date();
  updatedImageUrl: string | undefined = '';

  showImgUrlPicker: boolean = false;

  created() {
    this.containsImage = !!this.imageUrl;

    this.updatedTitle = this.title;
    this.updatedDescription = this.description;
    this.updatedDate = this.date.toDate();
    this.updatedImageUrl = this.imageUrl;
  }

  get classObject() {
    return {
      'timeline-content': true,
      'js--fadeInLeft': this.fadeInLeft,
      'js--fadeInRight': !this.fadeInLeft,
      'timeline-card': this.containsImage || this.editMode,
    }
  }

  get headerImageUrl() {
    return this.editMode ? this.updatedImageUrl : this.imageUrl;
  }

  get formattedDate() {
    return this.date.format('DD MMMM YYYY');
  }

  emitUpdatedItem() {
    this.updatedItem({
      title: this.updatedTitle,
      description: this.updatedDescription,
      date: moment(this.updatedDate),
      imageUrl: this.updatedImageUrl
    })
  }

  openImgUrlPicker() {
    this.showImgUrlPicker = true;
  }

  deleteItem() {
    this.deletedItem(this.itemIndex);
  }

  @Emit()
  updatedItem(returnedTimelineItem: ITimelineItem) {}

  @Emit()
  deletedItem(itemIndex: number) {}

}
</script>

<style lang="scss" scoped>

.header-container {
  text-align: left;
}

.timeline-item {
  .timeline-img-header {
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .4)) center center no-repeat;
    background-size: cover;
  }
}
</style>
