import { GetterTree } from 'vuex';
import { UsersState } from './types';
import { RootState } from '../types';

import * as _ from 'lodash';

export const getters: GetterTree<UsersState, RootState> = {
  getUsers(state) {
    const { users } = state;
    return users;
  },
  getChunkedUsers(state, mGetters) {
    const users = mGetters.getUsers;
    return _.chunk(users, 4);
  },
  isFetching(state) {
    const { fetching } = state;
    return fetching;
  },
};
