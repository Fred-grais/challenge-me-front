import { Moment } from 'moment';

export interface Podcast {
  title: string;
  description: string;
  categories: string[];
  duration: string;
  publishingDate: Moment;
  thumbnailUrl: string;
  contentUrl: string;
  originalLink: string;
}

export interface NewsFeedState {
    mainPodcast?: Podcast;
    fetching: boolean;
}
