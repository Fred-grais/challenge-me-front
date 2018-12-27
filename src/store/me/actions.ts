import { ActionTree } from 'vuex';
import { MeState, Me } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeState, RootState> = {

  updateMe({ commit }, me: Me): Promise<any> {
    const apiInterface = new ApiInterface();
    commit('setFetching', true);

    return apiInterface.updateMe(me)
      .then((response) => {
        commit('setMe', me);
        commit('setFetching', false);

        return response;
      });
  },
};
