import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/mock/blogs";
import { categories } from "@/mock/constants";

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-blog-surface">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <img 
            src="/blog.jpg"
            alt="Blog Hero" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blog-primary-foreground" />
              <span className="text-blog-primary-foreground/80 font-medium">Latest Insights</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-blog-primary-foreground mb-6 leading-tight">
              kalal.dev
              <span className="block text-blog-secondary-foreground">Tech Insights</span>
            </h1>
            
            <p className="text-xl text-blog-primary-foreground/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Explore cutting-edge web development insights, React best practices, and modern frontend technologies from a passionate developer's perspective.
            </p>
            
            <Button 
              asChild
              size="lg" 
              variant="secondary"
              className="bg-blog-surface-elevation text-blog-text-primary hover:bg-blog-surface-elevation/90 font-medium"
            >
              <Link to="#featured" className="flex items-center gap-2">
                Explore Articles <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-12">
          <div className="flex-1">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search articles, topics, or technologies..."
            />
          </div>
          
          <div className="flex-shrink-0">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-blog-text-secondary">
            {filteredPosts.length === 0 ? (
              "No articles found matching your criteria."
            ) : (
              `Showing ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}`
            )}
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-blog-primary" />
            <h2 className="text-3xl font-heading font-bold text-blog-text-primary">Featured Articles</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-3xl font-heading font-bold text-blog-text-primary mb-8">
            {featuredPosts.length > 0 ? "Latest Articles" : "All Articles"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center py-16">
            <h3 className="text-2xl font-heading font-bold text-blog-text-primary mb-4">
              No articles found
            </h3>
            <p className="text-blog-text-secondary mb-8">
              Try adjusting your search terms or browse all categories.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              variant="outline"
              className="border-blog-primary text-blog-primary hover:bg-blog-primary-muted"
            >
              Clear Filters
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogList;