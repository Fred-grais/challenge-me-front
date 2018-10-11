import { ActionTree } from 'vuex';
import { MeProjectsState } from './types';
import { Project } from '@/store/current-project/types';
import { RootState } from '../../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeProjectsState, RootState> = {

  fetchData({ commit }): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface.listMyProjects()
      .then( (response) => {
        console.log(response);
        commit('setProjects', response.data);

        return response;
      });
  },
};
