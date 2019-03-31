import { ActionTree } from 'vuex';
import { MeState, Me } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeState, RootState> = {
  updateMe({ commit }, me: Me): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface
      .updateMe(me)
      .then((response) => {
        commit('setMe', me);
        commit('setFetching', false);

        return response;
      })
      .catch((error) => {
        commit('setFetching', false);
        throw error;
      });
  },
  uploadMeAvatar(
    { commit },
    params: {
      file: File;
      onUploadProgress: (progressEvent: any) => void;
    },
  ): Promise<any> {
    const apiInterface = new ApiInterface();
    return apiInterface
      .uploadMeAvatar(params.file, params.onUploadProgress)
      .then((response: any) => {
        commit('setMeAvatar', response.data.avatarUrl);

        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
};
