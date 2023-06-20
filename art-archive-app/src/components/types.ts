export type MyFile = {
  id: number;
  description: string;
  tags: string[];
  url: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  lastModified: number;
  webkitRelativePath: string;
};

// If you're using tags, you'll need a type for them as well:
export interface Tag {
  name: string;
  id: number;
  // other fields based on your Tag model
};
