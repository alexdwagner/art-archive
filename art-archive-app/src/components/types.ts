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
  lastModified: number; // add missing properties
  webkitRelativePath: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
  slice: (start?: number, end?: number, contentType?: string) => Blob;
  stream?: () => ReadableStream; // if your files have a stream method, add the correct type
  text?: () => Promise<string>; // if your files have a text method, add the correct type
}


// If you're using tags, you'll need a type for them as well:
export interface Tag {
  name: string;
  id: number;
  // other fields based on your Tag model
};
