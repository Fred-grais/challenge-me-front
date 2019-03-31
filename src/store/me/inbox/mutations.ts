import { MutationTree } from 'vuex';
import {
  MeInboxState,
  ConversationPreview,
  Conversation,
  Message,
} from './types';
import each from 'lodash/each';
import moment from 'moment';

export const mutations: MutationTree<MeInboxState> = {
  setPreviewConversations(state, conversationPreviews: ConversationPreview[]) {
    state.conversationPreviews = conversationPreviews;
  },
  addPreviewConversation(state, conversationPreview: ConversationPreview) {
    state.conversationPreviews.push(conversationPreview);
  },
  setFetching(state, isFetching: boolean) {
    state.fetching = isFetching;
  },
  setCurrentConversation(state, conversation: Conversation) {
    each(conversation.displayedMessages, (message) => {
      message.createdAt = moment(message.createdAt);
    });

    state.currentConversation = new Conversation(conversation);
  },

  addMessageToConversation(state, message: Message) {
    message.createdAt = moment(message.createdAt);
    state.currentConversation!.displayedMessages.push(message);
  },
};
