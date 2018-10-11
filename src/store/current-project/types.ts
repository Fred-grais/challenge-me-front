import { User } from '@/store/current-user/types';

export interface Project {
  id: number;
  name: string;
  description: string;
  ownerFull: User;
}

export interface CurrentProjectState {
    currentProject: Project | undefined;
    fetching: boolean;
}
