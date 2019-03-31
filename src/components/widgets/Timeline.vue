<template>
  <!-- <div class="timeline-container" v-if="displayTImeline()">
    <header>
      <div class="container text-center">
        <h1>Timeline</h1>
        <p>Project life</p>
      </div>
    </header>

    <section class="timeline">
      <div class="container">
        <item
          v-for="(item, index) in timeline.items"
          :key="item.title + item.date.format()"
          ref="items"
          :imageUrl="item.imageUrl"
          :fadeInLeft="index % 2 == 0"
          :title="item.title"
          :date="item.date"
          :description="item.description"
          :editMode="editMode"
          :itemIndex="index"
          v-on:updated-item="gatherItems"
          v-on:deleted-item="deleteItem"
        ></item>
      </div>
    </section>
  </div>-->
  <v-timeline>
    <Item
      v-for="(item, i) in timeline.items"
      :key="item.internalId"
      :item="item"
      :right="i%2===0"
      :itemindex="i"
      :color="colors[i%5]"
      :editMode="editMode"
    />
    <!-- <v-timeline-item color="amber lighten-1" fill-dot left small>
      <v-card>
        <v-card-title class="amber lighten-1 justify-end">
          <h2 class="display-1 mr-3 white--text font-weight-light">Title 2</h2>
          <v-icon dark size="42">mdi-home-outline</v-icon>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex
              xs8
            >Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.</v-flex>
            <v-flex xs4>Lorem ipsum dolor sit amet, no nam oblique veritus.</v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>-->
    <!-- <v-timeline-item color="cyan lighten-1" fill-dot right>
      <v-card>
        <v-card-title class="cyan lighten-1">
          <v-icon class="mr-3" dark size="42">mdi-email-outline</v-icon>
          <h2 class="display-1 white--text font-weight-light">Title 3</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex
              v-for="n in 3"
              :key="n"
              xs4
            >Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.</v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item color="red lighten-1" fill-dot left small>
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h2 class="display-1 mr-3 white--text font-weight-light">Title 4</h2>
          <v-icon dark size="42">mdi-account-multiple-outline</v-icon>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs2>
              <v-icon size="64">mdi-server-network</v-icon>
            </v-flex>
            <v-flex
              xs10
            >Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus.</v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>-->
    <!-- <v-timeline-item color="green lighten-1" fill-dot right>
      <v-card>
        <v-card-title class="green lighten-1">
          <v-icon class="mr-3" dark size="42">mdi-phone-in-talk</v-icon>
          <h2 class="display-1 white--text font-weight-light">Title 5</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>-->
  </v-timeline>
</template>


<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import Item from '@/components/widgets/timeline/Item.vue';
import { ITimeline, ITimelineItem } from '@/store/common/types';

import globalEventBus from '@/services/global-event-bus';

import * as _ from 'lodash';

@Component({
  components: {
    Item,
  },
})
export default class Timeline extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return { items: [] };
    },
  })
  public timeline!: ITimeline;
  @Prop({ type: Boolean, default: false }) public editMode!: boolean;

  public scrollViewInitialized = false;

  public colors = ['red', 'cyan', 'green', 'blue', 'purple'];

   public displayTImeline() {
    return this.timeline.items.length > 0;
  }

  public getUpdatedItems() {
    _.each(this.$refs.items, (component) => {
      (component as Item).emitUpdatedItem();
    });
  }

  public gatherItems(item: ITimelineItem) {
    this.updatedItem(item);
  }

  public deleteItem(itemIndex: number) {
    this.timeline.items.splice(itemIndex, 1);
  }

  @Emit()
  // tslint:disable-next-line:no-empty
  public updatedItem(returnedTimelineItem: ITimelineItem) {}
}
</script>


<style lang="scss">
$primary: #3f51b5;
$dark-primary: #303f9f;
$light-primary: #c5cae9;
$text: #ffffff;
$primary-text: #212121;
$secondary-text: #757575;
$accent: #ff4081;

.timeline-container {
  font-family: 'Roboto';
  font-size: 17px;
  font-weight: 400;
  background-color: #eee;

  section {
    padding: 100px 0;
  }

  h1 {
    font-size: 200%;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 400;
  }

  header {
    background: $primary;
    color: $text;
    padding: 150px 0;

    p {
      font-family: 'Allura';
      color: rgba(255, 255, 255, 0.2);
      margin-bottom: 0;
      font-size: 60px;
      margin-top: -30px;
    }
  }

  .timeline {
    position: relative;

    &::before {
      content: '';
      background: $light-primary;
      width: 5px;
      height: 95%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .timeline-item {
    width: 100%;
    margin-bottom: 70px;

    &:nth-child(even) {
      .timeline-content {
        float: right;
        padding: 40px 30px 10px 30px;

        .date {
          right: auto;
          left: 0;
        }

        &::after {
          content: '';
          position: absolute;
          border-style: solid;
          width: 0;
          height: 0;
          top: 30px;
          left: -15px;
          border-width: 10px 15px 10px 0;
          border-color: transparent #f5f5f5 transparent transparent;
        }
      }
    }

    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .timeline-content {
    position: relative;
    width: 45%;
    padding: 10px 30px;
    border-radius: 4px;
    background: #f5f5f5;
    box-shadow: 0 20px 25px -15px rgba(0, 0, 0, 0.3);

    &::after {
      content: '';
      position: absolute;
      border-style: solid;
      width: 0;
      height: 0;
      top: 30px;
      right: -15px;
      border-width: 10px 0 10px 15px;
      border-color: transparent transparent transparent #f5f5f5;
    }
  }

  .timeline-img {
    width: 30px;
    height: 30px;
    background: $primary;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    margin-top: 25px;
    margin-left: -15px;
  }

  a {
    background: $primary;
    color: $text;
    padding: 8px 20px;
    text-transform: uppercase;
    font-size: 14px;
    margin-bottom: 20px;
    margin-top: 10px;
    display: inline-block;
    border-radius: 2px;
    box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.6);

    &:hover,
    &:active,
    &:focus {
      background: darken($primary, 10%);
      color: $text;
      text-decoration: none;
    }
  }

  .timeline-card {
    padding: 0 !important;

    p {
      padding: 0 20px;
    }

    a {
      margin-left: 20px;
    }
  }

  .timeline-img-header {
    height: 200px;
    position: relative;
    margin-bottom: 20px;

    h2 {
      color: $text;
      position: absolute;
      bottom: 5px;
      left: 20px;
    }
  }

  blockquote {
    margin-top: 30px;
    color: $secondary-text;
    border-left-color: $primary;
    padding: 0 20px;
  }

  .date {
    background: $accent;
    display: inline-block;
    color: $text;
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
  }

  @media screen and (max-width: 768px) {
    .timeline {
      &::before {
        left: 50px;
      }

      .timeline-img {
        left: 50px;
      }

      .timeline-content {
        max-width: 100%;
        width: auto;
        margin-left: 70px;
      }

      .timeline-item {
        &:nth-child(even) {
          .timeline-content {
            float: none;
          }
        }

        &:nth-child(odd) {
          .timeline-content {
            &::after {
              content: '';
              position: absolute;
              border-style: solid;
              width: 0;
              height: 0;
              top: 30px;
              left: -15px;
              border-width: 10px 15px 10px 0;
              border-color: transparent #f5f5f5 transparent transparent;
            }
          }
        }
      }
    }
  }
}
</style>
