import { MutationTree } from 'vuex';
import { UsersState, UserPreview } from './types';

export const mutations: MutationTree<UsersState> = {
  setUsers(state, users: UserPreview[]) {
    state.users = users;
  },
  setFetching(state, isFetching: boolean) {
    state.fetching = isFetching;
  },
};
