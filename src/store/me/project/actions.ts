import { ActionTree } from 'vuex';
import { MeProjectState } from './types';
import { Project } from '@/store/current-project/types';
import { RootState } from '../../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeProjectState, RootState> = {

  fetchData({ commit }, projectId: number): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.getMyProject(projectId)
      .then( (response) => {
        commit('setProject', response.data);
        commit('setFetching', false);

        return response;
      });
  },
  create({ commit }, project: Project): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.createProject(project)
      .then( (response) => {
        //commit('setProject', response.data);
        commit('meProjectsState/addProject', response.data, {root: true});
        commit('setFetching', false);

        return response;
      });
  },
  update({ commit }, project: Partial<Project>): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.updateProject(project)
      .then( (response) => {
        commit('setProject', response.data);
        commit('setFetching', false);

        return response;
      });
  },
};
