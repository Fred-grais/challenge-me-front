import { RocketChatProfile } from '@/store/current-user/types';
import { User } from '@/store/current-user/types';
import { ITimeline } from '@/store/common/types';

export interface Project {
  id: number;
  name: string;
  description: string;
  activitySectorList: string[];
  challengesNeededList: string[];
  timeline: ITimeline;
  ownerFull: User;
  rocketChatProfile: RocketChatProfile;
  logoUrl: string;
  picturesUrls: string[];
}

export interface CurrentProjectState {
  currentProject: Project | undefined;
  fetching: boolean;
}
