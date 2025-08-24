// Mock data simulating AEM Content Fragments for blog posts
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

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Experiences with AEM and React",
    slug: "building-modern-web-experiences-aem-react",
    excerpt: "Discover how to create seamless, dynamic web experiences by combining Adobe Experience Manager's powerful content management capabilities with React's component-based architecture.",
    content: `# Building Modern Web Experiences with AEM and React

In today's digital landscape, creating compelling web experiences requires the perfect balance of powerful content management and flexible frontend development. Adobe Experience Manager (AEM) paired with React provides exactly this combination.

## Why AEM + React?

The combination of AEM's robust content management capabilities with React's component-based architecture creates a powerful foundation for modern web applications. This approach allows content creators to work independently while developers maintain full control over the user experience.

### Key Benefits

- **Headless Architecture**: Decouple content creation from presentation
- **Developer Experience**: Leverage React's ecosystem and tooling
- **Content Author Experience**: Use AEM's intuitive authoring interface
- **Performance**: Build fast, optimized single-page applications
- **Scalability**: Handle enterprise-level content management needs

## Getting Started

To begin building with AEM and React, you'll need to establish a clear separation between your content layer and presentation layer. AEM serves as your headless CMS, exposing content through GraphQL endpoints, while React handles the user interface and interactions.

The architecture typically follows this pattern:
1. Content authors create and manage content in AEM
2. AEM exposes content via GraphQL APIs
3. React applications consume these APIs
4. Components render dynamic, data-driven experiences

This approach provides the flexibility to create multiple touchpoints from a single content source, whether that's a website, mobile app, or any other digital channel.`,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=100&h=100&fit=crop&crop=face",
      bio: "Senior Frontend Architect with 8+ years building enterprise web applications"
    },
    publishedDate: "2024-01-15",
    readTime: 8,
    tags: ["AEM", "React", "Frontend", "Architecture"],
    category: "Development",
    featuredImage: "/src/assets/blog-post-1.jpg",
    featured: true
  },
  {
    id: "2", 
    title: "Mastering AEM Content Fragments for Headless Development",
    slug: "mastering-aem-content-fragments-headless",
    excerpt: "Learn how to structure, create, and optimize AEM Content Fragments for seamless headless content delivery across multiple channels and applications.",
    content: `# Mastering AEM Content Fragments for Headless Development

Content Fragments are the cornerstone of AEM's headless capabilities, enabling structured content creation that can be consumed across multiple channels and applications.

## Understanding Content Fragments

Content Fragments in AEM provide a way to create structured, reusable content that exists independently of any specific page or layout. This approach is fundamental to headless content management.

### Key Concepts

- **Content Fragment Models**: Define the structure and fields for your content
- **Content Fragments**: Instances of content based on your models
- **Variations**: Different versions of content for different contexts
- **GraphQL Integration**: Query your content using modern APIs

## Best Practices

When working with Content Fragments, consider these best practices:

1. **Plan Your Models**: Think carefully about the structure before creating fragments
2. **Use References**: Link related content pieces together
3. **Leverage Variations**: Create content variations for different channels
4. **Optimize for GraphQL**: Structure your models with API consumption in mind

Content Fragments excel at creating consistent, structured content that can be delivered to any frontend application, making them perfect for modern headless architectures.`,
    author: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "AEM Solutions Architect helping enterprises modernize their content strategy"
    },
    publishedDate: "2024-01-12",
    readTime: 6,
    tags: ["AEM", "Content Fragments", "Headless", "CMS"],
    category: "Content Management",
    featuredImage: "/src/assets/blog-post-2.jpg",
    featured: false
  },
  {
    id: "3",
    title: "Performance Optimization Strategies for React Applications",
    slug: "performance-optimization-react-applications",
    excerpt: "Explore proven techniques and strategies to optimize React application performance, from code splitting to state management and beyond.",
    content: `# Performance Optimization Strategies for React Applications

Building fast, responsive React applications requires a deep understanding of performance optimization techniques and when to apply them effectively.

## Core Optimization Techniques

### 1. Code Splitting and Lazy Loading

React's built-in lazy loading and Suspense components provide powerful tools for splitting your application code:

\`\`\`javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 2. Memoization Strategies

Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders:

- **React.memo**: Prevent component re-renders when props haven't changed
- **useMemo**: Cache expensive calculations
- **useCallback**: Stabilize function references

### 3. State Management Optimization

Consider your state management approach carefully. Local state, Context API, and external libraries like Zustand each have their place in a well-architected application.

## Advanced Techniques

- **Virtual Scrolling**: Handle large lists efficiently
- **Image Optimization**: Implement lazy loading and responsive images
- **Bundle Analysis**: Use tools like Webpack Bundle Analyzer
- **Service Workers**: Cache resources for offline functionality

Performance optimization is an ongoing process that requires measurement, analysis, and iterative improvement.`,
    author: {
      name: "Emily Watson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      bio: "Performance Engineer focused on frontend optimization and user experience"
    },
    publishedDate: "2024-01-10",
    readTime: 10,
    tags: ["React", "Performance", "Optimization", "Frontend"],
    category: "Development",
    featuredImage: "/src/assets/blog-post-3.jpg",
    featured: false
  },
  {
    id: "4",
    title: "Creating Responsive Design Systems with Tailwind CSS",
    slug: "responsive-design-systems-tailwind-css",
    excerpt: "Build scalable, maintainable design systems using Tailwind CSS utilities and custom components for consistent user experiences across all devices.",
    content: `# Creating Responsive Design Systems with Tailwind CSS

A well-designed system is the foundation of any successful web application. Tailwind CSS provides the perfect toolkit for building scalable, maintainable design systems.

## Design System Fundamentals

### Color Palette Strategy

Start with a carefully curated color palette that supports both light and dark themes:

\`\`\`css
:root {
  --primary: 220 98% 61%;
  --secondary: 260 60% 65%;
  --surface: 0 0% 98%;
}
\`\`\`

### Typography Scale

Establish a consistent typographic hierarchy using Tailwind's font utilities and custom CSS properties.

### Spacing and Layout

Use Tailwind's spacing scale consistently throughout your application to maintain visual rhythm and alignment.

## Component-First Approach

When building with Tailwind, think in terms of reusable components:

1. **Base Components**: Buttons, inputs, cards
2. **Composite Components**: Navigation, headers, footers  
3. **Layout Components**: Grids, containers, sections
4. **Page Components**: Complete page layouts

## Responsive Design Patterns

Tailwind's responsive utilities make it easy to create adaptive interfaces:

- **Mobile-first**: Start with mobile styles, enhance for larger screens
- **Breakpoint Strategy**: Use consistent breakpoints across components
- **Flexible Layouts**: Leverage CSS Grid and Flexbox utilities
- **Progressive Enhancement**: Add features for capable devices

The key to successful design systems is consistency, maintainability, and clear documentation for your team.`,
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "Design Systems Engineer with expertise in scalable CSS architectures"
    },
    publishedDate: "2024-01-08",
    readTime: 7,
    tags: ["Design Systems", "Tailwind CSS", "CSS", "Frontend"],
    category: "Design",
    featuredImage: "/src/assets/blog-post-4.jpg",
    featured: true
  },
  {
    id: "5",
    title: "GraphQL Best Practices for Frontend Developers",
    slug: "graphql-best-practices-frontend-developers",
    excerpt: "Master GraphQL from a frontend perspective with practical tips for efficient queries, state management, and optimal developer experience.",
    content: `# GraphQL Best Practices for Frontend Developers

GraphQL has revolutionized how frontend developers think about data fetching, offering unprecedented flexibility and efficiency in API consumption.

## Query Optimization Strategies

### 1. Field Selection

Only request the data you need:

\`\`\`graphql
query BlogPosts {
  posts {
    id
    title
    excerpt
    publishedDate
    author {
      name
      avatar
    }
  }
}
\`\`\`

### 2. Fragment Usage

Use fragments to share common field selections:

\`\`\`graphql
fragment PostPreview on Post {
  id
  title
  excerpt
  publishedDate
}

query HomePage {
  featuredPosts {
    ...PostPreview
  }
  recentPosts {
    ...PostPreview
  }
}
\`\`\`

## State Management Integration

GraphQL works excellently with modern state management approaches:

- **Apollo Client**: Full-featured GraphQL client with caching
- **Relay**: Facebook's opinionated GraphQL client
- **urql**: Lightweight alternative with great DX
- **Custom Hooks**: Build your own abstractions

## Error Handling Patterns

Implement robust error handling:

1. **Network Errors**: Handle connectivity issues gracefully
2. **GraphQL Errors**: Parse and display field-level errors
3. **Loading States**: Provide clear feedback during operations
4. **Optimistic Updates**: Update UI before server confirmation

## Performance Considerations

- **Query Batching**: Combine multiple queries when possible
- **Persisted Queries**: Reduce payload size in production
- **Schema Stitching**: Combine multiple GraphQL services
- **Dataloader Pattern**: Solve N+1 query problems

GraphQL's power lies in its flexibility, but with great power comes the responsibility to use it wisely.`,
    author: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      bio: "Full-stack developer specializing in GraphQL and modern web architectures"
    },
    publishedDate: "2024-01-05",
    readTime: 9,
    tags: ["GraphQL", "Frontend", "APIs", "Performance"],
    category: "Development",
    featuredImage: "/src/assets/blog-post-5.jpg",
    featured: false
  }
];

export const categories = ["All", "Development", "Content Management", "Design"];

export const tags = [
  "AEM", "React", "Frontend", "Architecture", "Content Fragments", 
  "Headless", "CMS", "Performance", "Optimization", "Design Systems", 
  "Tailwind CSS", "CSS", "GraphQL", "APIs"
];