import { ActionTree } from 'vuex';
import { CurrentProjectState, Project } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<CurrentProjectState, RootState> = {
    fetchData({ commit }, projectId: number): void {
      commit('setFetching', true);

      const apiInterface = new ApiInterface();

      apiInterface.getProject(projectId).then( (response: any) => {
        commit('setCurrentProject', response.data);
        commit('setFetching', false);
      }).catch( (error: any) => {
        commit('setCurrentProject', undefined);
        commit('setFetching', false);
      })
    },
};
