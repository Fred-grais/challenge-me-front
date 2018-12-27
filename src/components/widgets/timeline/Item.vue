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
      <div>
        <div v-if="!editMode">
          {{description}}
        </div>
        <div v-if="editMode">
          <textarea v-model="updatedDescription"></textarea>
        </div>
      </div>
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
  },
})
export default class Item extends Vue {
  @Prop(String) public title!: string;
  @Prop(Object) public date!: moment.Moment;
  @Prop(String) public description!: string;

  @Prop({type: Boolean, default: false}) public fadeInLeft!: boolean;
  @Prop(String) public imageUrl: string | undefined;

  @Prop({type: Boolean, default: false}) public editMode!: boolean;

  @Prop(Number) public itemIndex!: number;

  public containsImage: boolean = false;

  public updatedTitle: string = '';
  public updatedDescription: string = '';
  // Must use the Date type here instead of Moment because the datePicker does not support Moment input
  public updatedDate: Date = new Date();
  public updatedImageUrl: string | undefined = '';

  public showImgUrlPicker: boolean = false;

  public created() {
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
    };
  }

  get headerImageUrl() {
    return this.editMode ? this.updatedImageUrl : this.imageUrl;
  }

  get formattedDate() {
    return this.date.format('DD MMMM YYYY');
  }

  public emitUpdatedItem() {
    this.updatedItem({
      title: this.updatedTitle,
      description: this.updatedDescription,
      date: moment(this.updatedDate),
      imageUrl: this.updatedImageUrl,
    });
  }

  public openImgUrlPicker() {
    this.showImgUrlPicker = true;
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
