import type { ContentfulAsset } from './index';

export interface ContentfulSys {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentfulFields {
  [key: string]: unknown;
}

export interface ContentfulEntry {
  sys: ContentfulSys;
  fields: ContentfulFields;
}

export interface ContentfulResponse {
  items: ContentfulEntry[];
  includes?: {
    Entry?: ContentfulEntry[];
    Asset?: ContentfulAsset[];
  };
}