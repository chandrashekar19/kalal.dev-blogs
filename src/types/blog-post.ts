export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedDate: string;
  readTime: number;
  tags: string[];
  category: string;
  featuredImage: string;
  featured: boolean;
}
