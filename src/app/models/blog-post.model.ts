export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  pinned: boolean;
  author: string;
  readingTime?: number;
  background?: string;
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  pinned: boolean;
  author: string;
  background?: string;
}
