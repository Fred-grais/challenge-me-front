import { GetterTree } from 'vuex';
import { NewsFeedState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<NewsFeedState, RootState> = {
  getMainPodcast(state) {
    const {mainPodcast} = state;

    return mainPodcast;
  },
  isFetching(state) {
      const { fetching } = state;
      return fetching;
  }
};
