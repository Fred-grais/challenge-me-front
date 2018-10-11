import { GetterTree } from 'vuex';
import { ProjectsState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProjectsState, RootState> = {
  getProjects(state) {
    const {projects} = state;

    return projects;
  },
};
