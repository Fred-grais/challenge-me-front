import { GetterTree } from 'vuex';
import { MeInboxState } from './types';
import { RootState } from '../../types';

export const getters: GetterTree<MeInboxState, RootState> = {
  getConversationPreviews(state) {
    const { conversationPreviews } = state;
    return conversationPreviews;
  },
  getCurrentConversation(state) {
    const { currentConversation } = state;
    return currentConversation;
  }
};
