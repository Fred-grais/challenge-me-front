import { ActionTree } from 'vuex';
import { ProjectsState } from './types';
import { RootState } from '../types';

import ApiInterface from '@/services/api-interface.ts';

export const actions: ActionTree<ProjectsState, RootState> = {
    fetchData({ commit }): void {
       const apiInterface = new ApiInterface();

        apiInterface.getAllProjects().then( (response) => {
          commit('setProjects', response.data);
        }).catch( (error) => {
          commit('setProjects', []);
        });
    },
};
