import { ActionTree } from 'vuex';
import { ProjectsState } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<ProjectsState, RootState> = {
  fetchData({ commit }): void {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    apiInterface.getAllProjects().then((response) => {
      commit('setProjects', response.data);
      commit('setFetching', false);
    }).catch((error) => {
      commit('setProjects', []);
      commit('setFetching', false);
    });
  },
};
