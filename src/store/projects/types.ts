import { UserPreview } from '@/store/users/types';

export interface ProjectPreview {
  id: number;
  name: string;
  ownerPreview: UserPreview;
}

export interface ProjectsState {
    projects: ProjectPreview[];
}
