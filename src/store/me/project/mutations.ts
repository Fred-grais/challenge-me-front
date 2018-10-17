import { MutationTree } from 'vuex';
import { MeProjectState } from './types';
import { Project } from '@/store/current-project/types';

export const mutations: MutationTree<MeProjectState> = {
  setProject(state, project: Project) {
    state.project = project;
  },
  setFetching(state, isFetching: boolean) {
    state.fetching = isFetching;
  }
};
