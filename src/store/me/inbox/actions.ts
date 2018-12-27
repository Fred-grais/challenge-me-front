import { ActionTree } from 'vuex';
import { MeInboxState } from './types';
import { RootState } from '../../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeInboxState, RootState> = {

  fetchConversationPreviews({ commit }): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.getConversationPreviews()
      .then((response: any) => {
        commit('setPreviewConversations', response.data);
        commit('setFetching', false);

        return response;
      });
  },
  fetchConversation({ commit }, conversationId: number): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface.getConversation(conversationId)
      .then((response: any) => {
        commit('setCurrentConversation', response.data);

        return response;
      });
  },

  createConversation({ commit }, params: { recipients: string[], message: string }): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface.createConversation(params.recipients, params.message)
      .then((response: any) => {
        commit('addPreviewConversation', response.data.preview);
        commit('setCurrentConversation', response.data.full);

        return response;
      });
  },

  createMessage({ commit }, params: { conversationId: number, message: string }): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface.createMessage(params.conversationId, params.message)
      .then((response: any) => {
        const data = response.data;
        if (data.success) {
          commit('addMessageToConversation', data.message);
        }
        return data;
      });
  },
};
