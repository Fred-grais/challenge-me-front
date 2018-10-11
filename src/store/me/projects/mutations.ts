import { MutationTree } from 'vuex';
import { MeProjectsState } from './types';
import { ProjectPreview } from '@/store/projects/types';

export const mutations: MutationTree<MeProjectsState> = {
  setProjects(state, projects: ProjectPreview[]) {
    state.projects = projects;
  },
  addProject(state, project: ProjectPreview) {
    state.projects.push(project);
  }
};
