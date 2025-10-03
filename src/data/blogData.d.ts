export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  publishedDate: string;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  category: string;
  featured: boolean;
  image: string;
  sources: { name: string; url: string; }[];
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export declare const blogData: BlogPost[];
export declare function getBlogPostById(id: string | number): BlogPost | undefined;
export declare function getFeaturedBlogPosts(): BlogPost[];
export declare function getBlogPostsByCategory(category: string): BlogPost[];
export declare function getBlogPostsByTag(tag: string): BlogPost[];
export declare function getRelatedPosts(currentPostId: number, limit?: number): BlogPost[];
