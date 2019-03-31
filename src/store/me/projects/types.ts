import { ProjectPreview } from '@/store/projects/types';

export interface MeProjectsState {
  projects: ProjectPreview[];
  fetching: boolean;
}
