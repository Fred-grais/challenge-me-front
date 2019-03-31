import { ActionTree } from 'vuex';
import { CurrentUserState } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<CurrentUserState, RootState> = {
  fetchData({ commit }, userId: number): Promise<any> {
    commit('setFetching', true);

    const apiInterface = new ApiInterface();

    return apiInterface
      .getUser(userId)
      .then((response: any) => {
        commit('setCurrentUser', response.data);
        commit('setFetching', false);
      })
      .catch((error: any) => {
        commit('setCurrentUser', undefined);
        commit('setFetching', false);

        return error;
      });
  },
};
