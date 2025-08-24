import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/data/mockBlogData";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-blog-surface">
      {/* Navigation */}
      <div className="bg-blog-surface-elevation border-b border-blog-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            asChild
            variant="ghost" 
            className="text-blog-text-secondary hover:text-blog-primary hover:bg-blog-primary-muted"
          >
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Badge 
              variant="secondary" 
              className="bg-blog-primary-muted text-blog-primary border-0"
            >
              {post.category}
            </Badge>
            <div className="flex items-center gap-4 text-blog-text-muted text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-blog-text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-blog-text-secondary leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between bg-blog-surface-elevation rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-blog-text-muted" />
                  <span className="font-medium text-blog-text-primary">{post.author.name}</span>
                </div>
                <p className="text-sm text-blog-text-secondary">{post.author.bio}</p>
              </div>
            </div>
            
            <Button 
              variant="outline"
              size="sm"
              className="border-blog-primary/20 text-blog-text-secondary hover:bg-blog-primary-muted hover:text-blog-primary"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Featured Image */}
          <div className="relative overflow-hidden rounded-xl mb-12">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div 
            className="text-blog-text-primary leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: post.content
                .replace(/^# /gm, '<h1 class="text-3xl font-heading font-bold text-blog-text-primary mb-6 mt-8">')
                .replace(/^## /gm, '<h2 class="text-2xl font-heading font-bold text-blog-text-primary mb-4 mt-8">')
                .replace(/^### /gm, '<h3 class="text-xl font-heading font-semibold text-blog-text-primary mb-3 mt-6">')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-blog-text-primary">$1</strong>')
                .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
                .replace(/^(.+)$/gm, '<p class="mb-4 leading-relaxed">$1</p>')
                .replace(/```javascript\n([\s\S]*?)\n```/g, '<pre class="bg-blog-surface-elevation rounded-lg p-4 mb-6 overflow-x-auto"><code class="text-sm text-blog-text-primary">$1</code></pre>')
                .replace(/```css\n([\s\S]*?)\n```/g, '<pre class="bg-blog-surface-elevation rounded-lg p-4 mb-6 overflow-x-auto"><code class="text-sm text-blog-text-primary">$1</code></pre>')
                .replace(/```graphql\n([\s\S]*?)\n```/g, '<pre class="bg-blog-surface-elevation rounded-lg p-4 mb-6 overflow-x-auto"><code class="text-sm text-blog-text-primary">$1</code></pre>')
                .replace(/`([^`]+)`/g, '<code class="bg-blog-surface-elevation px-2 py-1 rounded text-sm text-blog-primary">$1</code>')
            }}
          />
        </div>

        {/* Tags */}
        <div className="border-t border-blog-primary/10 pt-8 mb-12">
          <h3 className="text-lg font-heading font-semibold text-blog-text-primary mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="border-blog-primary/20 text-blog-text-muted hover:bg-blog-primary-muted hover:text-blog-primary transition-colors duration-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-blog-surface-elevation border-t border-blog-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-6 h-6 text-blog-primary" />
              <h2 className="text-3xl font-heading font-bold text-blog-text-primary">Related Articles</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card 
                  key={relatedPost.id}
                  className="group overflow-hidden bg-blog-surface shadow-blog-card hover:shadow-blog-card-hover transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <CardContent className="p-6">
                      <Badge 
                        variant="secondary" 
                        className="bg-blog-primary-muted text-blog-primary border-0 mb-3"
                      >
                        {relatedPost.category}
                      </Badge>
                      
                      <h3 className="font-heading font-bold text-blog-text-primary mb-3 group-hover:text-blog-primary transition-colors duration-200 leading-tight">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-blog-text-secondary text-sm leading-relaxed line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;