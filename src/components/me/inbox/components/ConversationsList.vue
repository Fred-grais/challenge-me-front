<template>
  <div class="chat-users">
    <h6>Conversations</h6>
    <b-button v-b-modal="'createConversationModal'" :block="true">Create Conversation</b-button>
    <conversation-card
      v-for="(conversationPreview, index) in conversationPreviews"
      :key="index"
      :conversationPreview="conversationPreview"
      v-on:conversation-selected="conversationSelected"
    ></conversation-card>

    <create-conversation-modal></create-conversation-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import ConversationCard from '@/components/me/inbox/components/conversations-list/ConversationCard.vue';
import CreateConversationModal from '@/components/me/inbox/components/conversations-list/CreateConversationModal.vue';
import { ConversationPreview } from '@/store/me/inbox/types';

const meInboxNamespace: string = 'meInboxState';

@Component({
  components: {
    ConversationCard,
    CreateConversationModal,
  },
})
export default class InboxConversationsList extends Vue {
  @Getter('getConversationPreviews', { namespace: meInboxNamespace })
  public conversationPreviews!: ConversationPreview[];

  public conversationSelected(conversationId: number) {
    this.fetchConversationDetails(conversationId);
  }

  @Emit()
  // tslint:disable-next-line:no-empty
  public fetchConversationDetails(conversationId: number) {}
}
</script>

<style lang="scss" scoped>
</style>
