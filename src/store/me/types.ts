import { User } from '@/store/current-user/types';

export interface Me extends User {
  email: string;
}

export interface MeState {
  me: Me | undefined;
  fetching: boolean;
}
