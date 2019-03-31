import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { MeProjectsState } from './types';
import { RootState } from '../../types';

export const state: MeProjectsState = {
  projects: [],
  fetching: false,
};

const namespaced: boolean = true;

export const meProjectsState: Module<MeProjectsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
