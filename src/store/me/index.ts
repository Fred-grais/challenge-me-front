import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { MeState } from './types';
import { RootState } from '../types';

export const state: MeState = {
  me: undefined,
  fetching: false,
};

const namespaced: boolean = true;

export const meState: Module<MeState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
