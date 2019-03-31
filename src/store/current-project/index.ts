import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CurrentProjectState } from './types';
import { RootState } from '../types';

export const state: CurrentProjectState = {
  currentProject: undefined,
  fetching: false,
};

const namespaced: boolean = true;

export const currentProjectState: Module<CurrentProjectState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
