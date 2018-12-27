<template>
  <div class="item-editor">
    <item-form ref="itemForm" :item="itemState" v-on:return-item="reconstructItem"></item-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

import { ITimelineItem, IItemStateForm } from '@/store/common/types';
import ItemForm from '@/components/widgets/form/ItemForm.vue';

import * as _ from 'lodash';

@Component({
  components: {
    ItemForm,
  },
})
export default class ItemEditor extends Vue {
  @Prop({ type: Object }) public item!: ITimelineItem;

  public itemState: IItemStateForm = {
    itemFields: [],
  };

  public created() {
    this.itemState.itemFields = [
      {
        type: 'text',
        value: this.item.date,
        name: 'date',
      },
      {
        type: 'text',
        value: this.item.title,
        name: 'title',
      },
      {
        type: 'text',
        value: this.item.description,
        name: 'description',
      },
    ];
  }

  public getUpdatedItem() {
    (this.$refs.itemForm as ItemForm).returnUpdatedItem();
  }

  public reconstructItem(updatedItem: IItemStateForm) {
    this.returnItem({
      date: _.find(updatedItem.itemFields, (itemField) => {
        return itemField.name === 'date';
      })!.value,
      title: _.find(updatedItem.itemFields, (itemField) => {
        return itemField.name === 'title';
      })!.value,
      description: _.find(updatedItem.itemFields, (itemField) => {
        return itemField.name === 'description';
      })!.value,
    });
  }

  @Emit()
  // tslint:disable-next-line:no-empty
  public returnItem(item: ITimelineItem) {}
}
</script>
<style lang="scss" scoped>
</style>
