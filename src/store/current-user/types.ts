import { ITimeline } from '@/store/common/types';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  mobile: string;
  status: 'pending_activation' | 'active' | 'inactive';
  twitterId: string;
  timeline: ITimeline;
  rocketChatProfile: RocketChatProfile;
  avatarUrl: string;
}

export interface CurrentUserState {
  currentUser: User | undefined;
  fetching: boolean;
}

export interface RocketChatProfile {
  name: string;
}
