import { MutationTree } from 'vuex';
import { CurrentUserState, User } from './types';

export const mutations: MutationTree<CurrentUserState> = {
  setCurrentUser(state, user: User) {
    state.currentUser = user;
  },
  setFetching(state, fetching: boolean) {
    state.fetching = fetching;
  },
};
