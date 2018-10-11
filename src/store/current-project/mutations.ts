import { MutationTree } from 'vuex';
import { CurrentProjectState, Project } from './types';

export const mutations: MutationTree<CurrentProjectState> = {
  setCurrentProject(state, project: Project) {
    state.currentProject = project;
  },
  setFetching(state, fetching: boolean) {
    state.fetching = fetching;
  },
};
