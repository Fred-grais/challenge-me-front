import { MutationTree } from 'vuex';
import { MeState, Me } from './types';

export const mutations: MutationTree<MeState> = {
  setMe(state, me: Me) {
    state.me = me;
  },
  setFetching(state, isFetching: boolean) {
    console.log('fetching', isFetching);
    state.fetching = isFetching;
  }
};
