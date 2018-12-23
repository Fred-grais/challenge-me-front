<template>
  <div class="chat-body">
    <h6>Mini Chat</h6>

    <div v-if='conversation'>
      <inbox-message
        v-for="(message, index) in messages" :key="index"
        :user="message.user"
        :date="message.date"
        :message="message.message"
        :displaySide="message.displaySide"
      ></inbox-message>

      <div class="answer-add">
        <input placeholder="Write a message" v-model="currentMessage">
        <span class="answer-btn answer-btn-1 mbri-paper-plane mbr-iconfont mbr-iconfont-btn" @click="sendMessage"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import InboxMessage from '@/components/me/inbox/components/chat-body/Message.vue';

import { Conversation } from '@/store/me/inbox/types';
import { Me } from '@/store/me/types';
import * as _ from 'lodash';

const meInboxNamespace: string = 'meInboxState';
const meNamespace: string = 'meState';

@Component({
  components: {
    InboxMessage,
  }
})
export default class InboxChatBody extends Vue {

  currentMessage: string = '';

  @Action('createMessage', { namespace: meInboxNamespace }) createMessage!: (params: {conversationId: number, message: string}) => Promise<any>

  @Getter('getCurrentConversation', { namespace: meInboxNamespace }) conversation!: Conversation;
  @Getter('getMe', { namespace: meNamespace }) me!: Me;

  get messages() {
    return _.map(this.conversation.displayedMessages, (message) => {
      const currentRecipient = this.conversation.getRecipient(message.senderId);

      return {
        user: {
          avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          name: currentRecipient!.firstName,
        },
        date: message.createdAt.format(),
        message: message.message,
        displaySide: currentRecipient!.id === this.me.id ? 'right' : 'left',
      }
    });
  }

  sendMessage() {
    this.createMessage({conversationId: this.conversation.id, message: this.currentMessage}).then((data: any) => {
      if (data.success) {
        this.currentMessage = '';
      }
    });

  }
}
</script>

<style lang="scss" scoped>

.answer-btn {
  font-size: 1.5em;
  line-height: 1.5em;
}
</style>
