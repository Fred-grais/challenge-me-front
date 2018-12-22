import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { MeInboxState } from './types';
import { RootState } from '../../types';

export const state: MeInboxState = {
    conversationPreviews: [],
    currentConversation: undefined,
    fetching: false,
};

const namespaced: boolean = true;

export const meInboxState: Module<MeInboxState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
