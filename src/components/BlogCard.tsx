import { Link } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/types/blog-post";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const cardClass = featured 
    ? "group relative overflow-hidden rounded-xl bg-blog-surface-elevation shadow-blog-card hover:shadow-blog-card-hover transition-all duration-300 transform hover:-translate-y-1" 
    : "group relative overflow-hidden rounded-lg bg-blog-surface-elevation shadow-blog-card hover:shadow-blog-card-hover transition-all duration-300 transform hover:-translate-y-1";

  const imageClass = featured 
    ? "aspect-[16/9] w-full object-cover group-hover:scale-105 transition-transform duration-500" 
    : "aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-500";

  return (
    <Card className={cardClass}>
      <Link to={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className={imageClass}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardContent className={featured ? "p-8" : "p-6"}>
          <div className="flex items-center gap-4 mb-4">
            <Badge 
              variant="secondary" 
              className="bg-blog-primary-muted text-blog-primary border-0"
            >
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-blog-text-muted text-sm">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
            </div>
          </div>

          <h3 className={`font-heading font-bold text-blog-text-primary mb-3 group-hover:text-blog-primary transition-colors duration-200 ${
            featured ? "text-2xl leading-tight" : "text-xl leading-tight"
          }`}>
            {post.title}
          </h3>

          <p className="text-blog-text-secondary leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex items-center gap-2 text-sm text-blog-text-muted">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-blog-text-muted">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs border-blog-primary/20 text-blog-text-muted hover:bg-blog-primary-muted transition-colors duration-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};