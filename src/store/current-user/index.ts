import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CurrentUserState } from './types';
import { RootState } from '../types';

export const state: CurrentUserState = {
  currentUser: undefined,
  fetching: false,
};

const namespaced: boolean = true;

export const currentUserState: Module<CurrentUserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
