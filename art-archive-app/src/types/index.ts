// src/types/index.ts

export type MyFile = {
    id: number;
    name: string;
    description: string | null;
    url: string;
    size: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    lastModified: string;
    webkitRelativePath: string;
    user: number | null;
    tags: Tag[];
  };
  
  
  export type Tag = {
    id: number;
    name: string;
  };
  