import { User } from '@/store/current-user/types';
import { ITimeline } from '@/store/common/types';

export interface Project {
  id: number;
  name: string;
  description: string;
  timeline: ITimeline;
  ownerFull: User;
}

export interface CurrentProjectState {
    currentProject: Project | undefined;
    fetching: boolean;
}
