import { Moment } from 'moment';
import { url } from 'inspector';

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

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  feature_image: string;
  url: string;
  tags: GhostTag[];
  author: Author;
}

export interface GhostTag {
  name: string;
  url: string;
}

export interface Author {
  name: string;
  imageUrl: string;
  url: string;
}

export interface NewsFeedState {
  mainPodcast?: Podcast;
  ghostPosts: Post[];
  fetching: boolean;
  fetchingGhostPosts: boolean;
}
