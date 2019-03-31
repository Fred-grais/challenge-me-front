import { ActionTree } from 'vuex';
import { MeProjectState } from './types';
import { Project } from '@/store/current-project/types';
import { RootState } from '../../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeProjectState, RootState> = {
  fetchData({ commit }, projectId: number): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.getMyProject(projectId).then((response) => {
      commit('setProject', response.data);
      commit('setFetching', false);

      return response;
    });
  },
  create({ commit }, project: Project): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.createProject(project).then((response) => {
      // commit('setProject', response.data);
      commit('meProjectsState/addProject', response.data, { root: true });
      commit('setFetching', false);

      return response;
    });
  },
  update({ commit }, project: Partial<Project>): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.updateProject(project).then((response) => {
      commit('setProject', response.data);
      commit('setFetching', false);

      return response;
    });
  },

  uploadProjectLogo(
    { commit },
    params: {
      projectId: number;
      file: File;
      onUploadProgress: (progressEvent: any) => void;
    },
  ): Promise<any> {
    const apiInterface = new ApiInterface();
    return apiInterface
      .uploadProjectLogo(params.projectId, params.file, params.onUploadProgress)
      .then((response: any) => {
        commit('setProjectLogo', response.data.logoUrl);

        return response;
      })
      .catch((error: any) => {
        throw error;
      });
  },

  uploadProjectPictures(
    { commit },
    params: {
      projectId: number;
      files: File[];
      onUploadProgress: (progressEvent: any) => void;
    },
  ): Promise<any> {
    const apiInterface = new ApiInterface();
    return apiInterface
      .uploadProjectPictures(
        params.projectId,
        params.files,
        params.onUploadProgress,
      )
      .then((response: any) => {
        commit('setProjectPictures', response.data.picturesUrls);

        return response;
      })
      .catch((error: any) => {
        throw error;
      });
  },
};
