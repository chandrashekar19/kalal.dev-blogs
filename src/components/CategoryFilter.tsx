import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={`cursor-pointer transition-all duration-200 ${
            selectedCategory === category
              ? "bg-blog-primary text-blog-primary-foreground hover:bg-blog-primary/90"
              : "border-blog-primary/20 text-blog-text-secondary hover:bg-blog-primary-muted hover:text-blog-primary"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};