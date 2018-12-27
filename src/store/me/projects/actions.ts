import { ActionTree } from 'vuex';
import { MeProjectsState } from './types';
import { RootState } from '../../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeProjectsState, RootState> = {

  fetchData({ commit }): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.listMyProjects()
      .then((response) => {
        commit('setProjects', response.data);
        commit('setFetching', false);
        return response;
      });
  },
};
