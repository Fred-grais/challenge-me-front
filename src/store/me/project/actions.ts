import { ActionTree } from 'vuex';
import { MeProjectState } from './types';
import { Project } from '@/store/current-project/types';
import { RootState } from '../../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeProjectState, RootState> = {

  fetchData({ commit }, projectId: number): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface.getMyProject(projectId)
      .then( (response) => {
        commit('setProject', response.data);
        return response;
      });
  },
  create({ commit }, project: Project): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface.createProject(project)
      .then( (response) => {
        commit('setProject', response.data);
        commit('meProjectsState/addProject', response.data, {root: true});
        return response;
      });
  },
  update({ commit }, project: Project): Promise<any> {
    console.log(project);
    const apiInterface = new ApiInterface();

    return apiInterface.updateProject(project)
      .then( (response) => {
        commit('setProject', response.data);
        return response;
      });
  },
};
