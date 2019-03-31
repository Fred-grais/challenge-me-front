import { ActionTree } from 'vuex';
import { MeInboxState, Message } from './types';
import { RootState } from '../../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeInboxState, RootState> = {
  createChatSession(): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface.createChatSession().then((response: any) => {
      const authToken = response.data.rocketChatAuthToken;
      if (authToken) {
        return authToken.data;
      } else {
        throw new Error(response.data.error);
      }
    });
  },

  fetchConversationPreviews({ commit }): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.getConversationPreviews().then((response: any) => {
      commit('setPreviewConversations', response.data);
      commit('setFetching', false);

      return response;
    });
  },
  fetchConversation({ commit }, conversationId: number): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface
      .getConversation(conversationId)
      .then((response: any) => {
        commit('setCurrentConversation', response.data);

        return response;
      });
  },

  createConversation(
    { commit },
    params: { recipients: string[]; message: string },
  ): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface
      .createConversation(params.recipients, params.message)
      .then((response: any) => {
        commit('addPreviewConversation', response.data.preview);
        commit('setCurrentConversation', response.data.full);

        return response;
      });
  },

  createMessage(
    { commit },
    params: { conversationId: number; message: string },
  ): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface
      .createMessage(params.conversationId, params.message)
      .then((response: any) => {
        const data = response.data;
        // We are adding the message in the websocket channel receive method (ChatBody.vue)
        // if (data.success) {
        //   commit('addMessageToConversation', data.message);
        // }
        return data;
      });
  },

  addMessageToConversation({ commit }, message: Message) {
    commit('addMessageToConversation', message);
  },
};
