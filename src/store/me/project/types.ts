import { Project } from '@/store/current-project/types';

export interface MeProjectState {
  project: Project | undefined;
  fetching: boolean;
}
