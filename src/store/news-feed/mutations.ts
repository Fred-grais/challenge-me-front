import { MutationTree } from 'vuex';
import { NewsFeedState, Podcast } from './types';
import moment from 'moment';

export const mutations: MutationTree<NewsFeedState> = {
  setMainPodcast(state, podcast: Podcast) {
    podcast.publishingDate = moment(podcast.publishingDate);
    state.mainPodcast = podcast;
  },
  setFetching(state, isFetching: boolean) {
    state.fetching = isFetching;
  }
};
