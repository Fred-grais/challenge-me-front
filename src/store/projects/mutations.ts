import { MutationTree } from 'vuex';
import { ProjectsState, ProjectPreview } from './types';

export const mutations: MutationTree<ProjectsState> = {
  setProjects(state, projects: ProjectPreview[]) {
    state.projects = projects;
  },
};
