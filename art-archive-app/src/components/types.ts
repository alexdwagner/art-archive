export interface MyFile {
  id: number;
  name: string;
  description: string;
  tags: string[];
  url: string;
  size: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  lastModified: number; 
  webkitRelativePath: string;
}


// If you're using tags, you'll need a type for them as well:
export interface Tag {
  name: string;
  id: number;
  // other fields based on your Tag model
};
