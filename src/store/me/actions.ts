import { ActionTree } from 'vuex';
import { MeState, Me } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<MeState, RootState> = {

  updateMe({ commit }, me: Me): Promise<any> {
    const apiInterface = new ApiInterface();

    return apiInterface.updateMe(me)
      .then( (response) => {
        commit('setMe', me);

        return response;
      })
  },
};
