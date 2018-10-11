import { ActionTree } from 'vuex';
import { UsersState } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<UsersState, RootState> = {
    fetchData({ commit }): Promise<any> {
        const apiInterface = new ApiInterface();
        return apiInterface.getAllUsers().then( (response) => {
            commit('setUsers', response.data);
            return response;
          });
    },
};
