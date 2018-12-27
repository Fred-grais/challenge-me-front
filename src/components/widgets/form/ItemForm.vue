<template>
  <div class="container item-form">
    <div class="row">
      <div class="mbr-white col-lg-4 col-md-3 content-container"></div>
      <div class="col-lg-4 col-md-5">
        <div class="form-container">
          <div class="media-container-column" data-form-type="formoid">
            <form class="mbr-form">
              <div
                v-for="(itemField) in item.itemFields"
                :key="itemField.name"
                :data-for="itemField.name"
              >
                <div class="form-group">
                  <input
                    :type="itemField.type"
                    class="form-control px-3"
                    v-model="itemField.value"
                    :placeholder="itemField.name"
                    :name="itemField.name"
                    data-form-field="name"
                    required
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

import { IItemStateForm } from '@/store/common/types';

@Component
export default class ItemForm extends Vue {
  @Prop({ type: Object }) public item!: IItemStateForm;

  public returnUpdatedItem() {
    this.returnItem(this.item);
  }

  @Emit()
  // tslint:disable-next-line:no-empty
  public returnItem(item: IItemStateForm) {}
}
</script>

<style lang="scss" scoped>
</style>
