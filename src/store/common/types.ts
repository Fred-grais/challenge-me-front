import { Moment } from 'moment';

export interface ITimelineItem {
  title: string;
  date: Moment;
  description: string;
  imageUrl?: string;
}

export interface ITimeline {
  items: ITimelineItem[];
}

export interface IItemFieldForm {
  type: string;
  value: any;
  name: string;
}

export interface IItemStateForm {
  itemFields: IItemFieldForm[];
}
