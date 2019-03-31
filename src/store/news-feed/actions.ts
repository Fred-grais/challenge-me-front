import { ActionTree } from 'vuex';
import { NewsFeedState } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';
import GhostApiInterface from '@/services/ghost-api-interface';

export const actions: ActionTree<NewsFeedState, RootState> = {
  fetchMainPodcast({ commit }): void {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    apiInterface
      .getMainPodcast()
      .then((response) => {
        commit('setMainPodcast', response.data);
        commit('setFetching', false);
      })
      .catch((error) => {
        commit('setMainPodcast', null);
        commit('setFetching', false);
      });
  },
  fetchGhostPosts({ commit }): void {
    commit('setFetchingGhostPosts', true);

    GhostApiInterface.Instance.fetchPosts()
      .then((posts: any) => {
        commit('setGhostPosts', posts);
        commit('setFetchingGhostPosts', false);
      })
      .catch((error: any) => {
        commit('setGhostPosts', []);
        commit('setFetchingGhostPosts', false);
      });
  },
};
