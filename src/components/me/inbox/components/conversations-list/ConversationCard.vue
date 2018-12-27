<template>
  <div class="user" @click="selectedConversation">
    <div class="avatar">
      <img :src="'https://bootdey.com/img/Content/avatar/avatar1.png'" alt="User name">
      <div class="status off"></div>
    </div>
    <div class="name">{{ firstRecipientWithoutCurrentUser.firstName }}</div>
    <div class="mood">{{ conversationPreview.lastMessagePreview }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { ConversationPreview, User } from '@/store/me/inbox/types';
import { Me } from '@/store/me/types';

import * as _ from 'lodash';

const meNamespace: string = 'meState';

@Component
export default class ConversationCard extends Vue {
  @Prop({ required: true, type: Object })
  public conversationPreview!: ConversationPreview;

  @Getter('getMe', { namespace: meNamespace }) public me!: Me;

  get recipientsWithoutCurrentUser(): User[] {
    return _.reject(
      this.conversationPreview.expandedRecipients,
      (recipient: User) => {
        return recipient.id === this.me.id;
      },
    );
  }

  get firstRecipientWithoutCurrentUser(): User {
    return this.recipientsWithoutCurrentUser[0];
  }

  public selectedConversation() {
    this.conversationSelected(this.conversationPreview.id);
  }

  @Emit()
  // tslint:disable-next-line:no-empty
  public conversationSelected(conversationId: number) {}
}
</script>

<style lang="scss" scoped>
</style>
