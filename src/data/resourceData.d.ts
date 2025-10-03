export interface Resource {
  id: number;
  title: string;
  type: string;
  category: string;
  description: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  downloads: number;
  fileSize: string;
  fileType: string;
  duration?: string;
  image: string;
  downloadUrl: string;
  featured: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface ResourceType {
  id: string;
  name: string;
  count: number;
}

export declare const resourceData: Resource[];
export declare function getResourceById(id: string | number): Resource | undefined;
export declare function getFeaturedResources(): Resource[];
export declare function getResourcesByCategory(category: string): Resource[];
export declare function getResourcesByType(type: string): Resource[];
export declare function getResourceCategories(): Category[];
export declare function getResourceTypes(): ResourceType[];
