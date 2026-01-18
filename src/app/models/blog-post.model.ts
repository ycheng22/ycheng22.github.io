export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  pinned: boolean;
  author: string;
  numberOfLike?: number;
  readingTime?: number;
  background?: string;
  showBackground?: boolean;
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  pinned: boolean;
  author: string;
  numberOfLike?: number;
  background?: string;
  showBackground?: boolean;
}
