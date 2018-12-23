import { MutationTree } from 'vuex';
import { MeInboxState, ConversationPreview, Conversation, Message } from './types';
import * as _ from 'lodash';
import moment from 'moment';

export const mutations: MutationTree<MeInboxState> = {

  setPreviewConversations(state, conversationPreviews: ConversationPreview[]) {
    state.conversationPreviews = conversationPreviews;
  },
  setFetching(state, isFetching: boolean) {
    state.fetching = isFetching;
  },
  setCurrentConversation(state, conversation: Conversation) {
    _.each(conversation.displayedMessages, (message) => {
      message.createdAt = moment(message.createdAt);
    });

    state.currentConversation = new Conversation(conversation);
  },

  addMessageToConversation(state, message: Message) {
    message.createdAt = moment(message.createdAt);
    state.currentConversation!.displayedMessages.push(message);
  }
};
