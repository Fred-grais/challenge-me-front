export interface Me {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  position: string;
}

export interface MeState {
  me: Me | undefined;
  fetching: boolean;
}
