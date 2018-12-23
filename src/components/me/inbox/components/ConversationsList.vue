<template>
  <div class="chat-users">
    <h6>Conversations</h6>
    <conversation-card v-for="(conversationPreview, index) in conversationPreviews" :key="index" :conversationPreview="conversationPreview" v-on:conversation-selected='conversationSelected'></conversation-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import ConversationCard from '@/components/me/inbox/components/conversations-list/ConversationCard.vue';
import { ConversationPreview } from '@/store/me/inbox/types';

const meInboxNamespace: string = 'meInboxState';

@Component({
  components: {
    ConversationCard,
  }
})
export default class InboxConversationsList extends Vue {

  @Getter('getConversationPreviews', { namespace: meInboxNamespace }) conversationPreviews!: ConversationPreview[];

  conversationSelected(conversationId: number) {
    this.fetchConversationDetails(conversationId);
  }

  @Emit()
  fetchConversationDetails(conversationId: number) {}
}
</script>

<style lang="scss" scoped>
</style>
