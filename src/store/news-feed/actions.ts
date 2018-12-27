import { ActionTree } from 'vuex';
import { NewsFeedState } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<NewsFeedState, RootState> = {
  fetchMainPodcast({ commit }): void {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    apiInterface.getMainPodcast().then((response) => {
      commit('setMainPodcast', response.data);
      commit('setFetching', false);
    }).catch((error) => {
      commit('setMainPodcast', null);
      commit('setFetching', false);
    });
  },
};
