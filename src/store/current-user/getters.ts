import { GetterTree } from 'vuex';
import { CurrentUserState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<CurrentUserState, RootState> = {
  getCurrentUser(state) {
    const { currentUser } = state;
    return currentUser;
  },
  getFetchingState(state) {
    const { fetching } = state;
    return fetching;
  },
};
