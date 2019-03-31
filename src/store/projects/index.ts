import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ProjectsState } from './types';
import { RootState } from '../types';

export const state: ProjectsState = {
  projects: [],
  fetching: false,
};

const namespaced: boolean = true;

export const projectsState: Module<ProjectsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
