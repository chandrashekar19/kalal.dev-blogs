
import blogPost1 from '@/assets/blog-post-1.jpg';
import blogPost2 from '@/assets/blog-post-2.jpg';
import blogPost3 from '@/assets/blog-post-3.jpg';
import blogPost4 from '@/assets/blog-post-4.jpg';
import blogPost5 from '@/assets/blog-post-5.jpg';
import blogHeroImage from '@/assets/blog-hero.jpg';

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
    title: "React Server Components: The Future of Full-Stack Development",
    slug: "react-server-components-future-fullstack-development",
    excerpt: "Dive deep into React Server Components and how they're revolutionizing the way we build modern web applications. Learn the patterns, performance benefits, and implementation strategies.",
    content: `# React Server Components: The Future of Full-Stack Development

React Server Components (RSC) represent a paradigm shift in how we think about React applications. As a developer who's been working with React for 3 years, I've witnessed the evolution from class components to hooks, and now to this revolutionary approach.

## What Are React Server Components?

Server Components allow us to write components that render on the server, reducing the JavaScript bundle size and improving performance. Unlike traditional SSR, these components never hydrate on the client.

### Key Benefits

- **Zero Bundle Impact**: Server Components don't add to your client-side JavaScript bundle
- **Direct Database Access**: Fetch data directly without API endpoints
- **Automatic Code Splitting**: Components are naturally split at the server/client boundary
- **Better SEO**: Content is rendered on the server by default

## Implementation Patterns

Here's how I structure Server Components in modern applications:

\`\`\`javascript
// app/posts/page.tsx - Server Component
import { getPosts } from '@/lib/database';
import PostCard from './PostCard';

export default async function PostsPage() {
  const posts = await getPosts(); // Direct database query

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

### Client Component Integration

When you need interactivity, use the 'use client' directive:

\`\`\`javascript
'use client';
import { useState } from 'react';

export default function LikeButton({ postId }: { postId: string }) {
  const [likes, setLikes] = useState(0);
  
  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  );
}
\`\`\`

## Best Practices from My Experience

1. **Keep the Server/Client Boundary Clear**: Be intentional about what runs where
2. **Minimize Client Components**: Use them only when necessary for interactivity
3. **Leverage Streaming**: Use React 18's streaming features for better UX
4. **Optimize Data Fetching**: Colocate data fetching with components

The future of React development is here, and Server Components are leading the way to more performant, scalable applications.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-20",
    readTime: 12,
    tags: ["React", "Server Components", "Next.js", "Performance", "Full-Stack"],
    category: "Development",
    featuredImage: blogPost1,
    featured: true
  },
  {
    id: "2",
    title: "Mastering React Query v5: Advanced Patterns for Modern Apps",
    slug: "mastering-react-query-v5-advanced-patterns",
    excerpt: "Explore the latest React Query v5 features including infinite queries, optimistic updates, and advanced caching strategies that every React developer should know.",
    content: `# Mastering React Query v5: Advanced Patterns for Modern Apps

React Query (now TanStack Query) has become the gold standard for server state management in React applications. With v5's recent release, there are some game-changing features that have transformed how I handle data fetching.

## Why React Query v5 Matters

After working with various state management solutions, React Query stands out for its:

- **Intelligent Caching**: Automatic background refetching and stale-while-revalidate patterns
- **Optimistic Updates**: Update UI immediately while syncing with server
- **Infinite Queries**: Perfect for pagination and infinite scrolling
- **DevTools**: Incredible debugging experience

## Advanced Query Patterns

### 1. Dependent Queries with Enabled Option

\`\`\`javascript
function UserProfile({ userId }: { userId?: string }) {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId, // Only run when userId exists
  });

  const { data: posts } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId!),
    enabled: !!user, // Run only after user is loaded
  });

  return (
    <div>
      <h1>{user?.name}</h1>
      {posts?.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
\`\`\`

### 2. Infinite Queries for Pagination

\`\`\`javascript
function InfinitePostsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  return (
    <div>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
      
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}
\`\`\`

### 3. Optimistic Updates

\`\`\`javascript
function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot previous value
      const previousPosts = queryClient.getQueryData(['posts']);

      // Optimistically update
      queryClient.setQueryData(['posts'], (old: any) => [
        { ...newPost, id: Date.now(), pending: true },
        ...old
      ]);

      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      // Rollback on error
      queryClient.setQueryData(['posts'], context?.previousPosts);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
\`\`\`

## Performance Tips I've Learned

1. **Use Stale Time Wisely**: Set appropriate stale times to reduce unnecessary requests
2. **Query Key Structure**: Design hierarchical query keys for efficient invalidation
3. **Select Option**: Use the select option to transform data and prevent unnecessary rerenders
4. **Prefetching**: Prefetch data on hover or route changes for instant UX

React Query v5 has made my applications faster, more reliable, and significantly easier to debug. It's an essential tool for any serious React developer.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-18",
    readTime: 10,
    tags: ["React Query", "TanStack", "Data Fetching", "Performance", "State Management"],
    category: "Development",
    featuredImage: blogPost2,
    featured: true
  },
  {
    id: "3",
    title: "Building Type-Safe React Apps with TypeScript 5.0",
    slug: "building-type-safe-react-apps-typescript-5",
    excerpt: "Leverage TypeScript 5.0's new features like const assertions, template literal types, and advanced generics to build bulletproof React applications.",
    content: `# Building Type-Safe React Apps with TypeScript 5.0

TypeScript has become indispensable in my React development workflow. With TypeScript 5.0's new features, we can write even more robust and maintainable code. Let me share the patterns I use daily.

## Advanced TypeScript Patterns for React

### 1. Generic Components with Constraints

\`\`\`typescript
interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps<T extends SelectOption> {
  options: T[];
  value: T['value'];
  onChange: (value: T['value']) => void;
  renderOption?: (option: T) => React.ReactNode;
}

function Select<T extends SelectOption>({
  options,
  value,
  onChange,
  renderOption
}: SelectProps<T>) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {renderOption ? renderOption(option) : option.label}
        </option>
      ))}
    </select>
  );
}
\`\`\`

### 2. Template Literal Types for Dynamic APIs

\`\`\`typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = '/users' | '/posts' | '/comments';
type ApiUrl<M extends HttpMethod, E extends ApiEndpoint> = 
  M extends 'GET' | 'DELETE' 
    ? \`\${E}\` | \`\${E}/\${string}\`
    : \`\${E}\`;

async function apiCall<M extends HttpMethod, E extends ApiEndpoint>(
  method: M,
  endpoint: ApiUrl<M, E>,
  data?: M extends 'POST' | 'PUT' ? Record<string, any> : never
) {
  // Type-safe API calls
  return fetch(endpoint, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  });
}

// Usage - fully type-safe!
apiCall('GET', '/users/123'); // ✅ Valid
apiCall('POST', '/users', { name: 'John' }); // ✅ Valid
apiCall('GET', '/users', { name: 'John' }); // ❌ Error: data not allowed for GET
\`\`\`

### 3. Discriminated Unions for Component Variants

\`\`\`typescript
type ButtonVariant = 
  | { variant: 'primary'; color?: never; }
  | { variant: 'secondary'; color?: never; }
  | { variant: 'custom'; color: string; };

interface ButtonProps extends ButtonVariant {
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant, color, children, onClick }: ButtonProps) {
  const getButtonClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 text-white';
      case 'secondary':
        return 'bg-gray-500 text-white';
      case 'custom':
        return \`bg-[\${color}] text-white\`;
    }
  };

  return (
    <button className={getButtonClass()} onClick={onClick}>
      {children}
    </button>
  );
}

// Usage
<Button variant="primary">Save</Button> // ✅ No color needed
<Button variant="custom" color="#ff0000">Delete</Button> // ✅ Color required
<Button variant="primary" color="#ff0000">Invalid</Button> // ❌ Error!
\`\`\`

### 4. Type-Safe Form Handling

\`\`\`typescript
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

type FormErrors<T> = Partial<Record<keyof T, string>>;

function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const updateValue = <K extends keyof T>(key: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const setError = <K extends keyof T>(key: K, error: string) => {
    setErrors(prev => ({ ...prev, [key]: error }));
  };

  return { values, errors, updateValue, setError };
}

// Usage in component
function SignUpForm() {
  const { values, errors, updateValue, setError } = useForm<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  return (
    <form>
      <input
        value={values.email}
        onChange={(e) => updateValue('email', e.target.value)}
      />
      {errors.email && <span>{errors.email}</span>}
    </form>
  );
}
\`\`\`

## Key TypeScript 5.0 Features I Use

1. **Const Assertions**: More precise type inference
2. **Satisfies Operator**: Type checking without widening
3. **Template Literal Types**: Dynamic string types
4. **Conditional Types**: Logic in the type system

These patterns have made my React code more maintainable, caught bugs at compile time, and improved the overall developer experience significantly.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-15",
    readTime: 11,
    tags: ["TypeScript", "React", "Type Safety", "Generics", "Development"],
    category: "Development",
    featuredImage: blogPost3,
    featured: false
  },
  {
    id: "4",
    title: "React 18 Concurrent Features: Practical Implementation Guide",
    slug: "react-18-concurrent-features-practical-guide",
    excerpt: "Master React 18's concurrent features including Suspense, useDeferredValue, and useTransition to build more responsive user interfaces.",
    content: `# React 18 Concurrent Features: Practical Implementation Guide

React 18 introduced concurrent features that fundamentally change how we think about rendering and user interactions. After implementing these in production apps, I want to share practical patterns that actually work.

## Understanding Concurrency in React

Concurrent rendering allows React to interrupt, pause, and resume rendering work. This enables:

- **Non-blocking updates**: Keep UI responsive during heavy operations
- **Prioritized rendering**: Critical updates happen first
- **Better user experience**: Smoother interactions and transitions

## 1. useTransition for Non-Urgent Updates

\`\`\`javascript
import { useState, useTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setQuery(value); // Urgent: update input immediately
    
    startTransition(() => {
      // Non-urgent: expensive search can be interrupted
      setResults(performExpensiveSearch(value));
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      
      {isPending && <div>Searching...</div>}
      
      <div className="results">
        {results.map(result => (
          <SearchResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}
\`\`\`

## 2. useDeferredValue for Smooth UI

\`\`\`javascript
import { useDeferredValue, useMemo } from 'react';

function ProductList({ searchTerm }: { searchTerm: string }) {
  const deferredSearchTerm = useDeferredValue(searchTerm);
  
  const filteredProducts = useMemo(() => {
    // This expensive operation won't block typing
    return products.filter(product =>
      product.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  }, [deferredSearchTerm]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
          isStale={searchTerm !== deferredSearchTerm}
        />
      ))}
    </div>
  );
}
\`\`\`

## 3. Suspense for Better Loading States

\`\`\`javascript
import { Suspense } from 'react';

// Component that fetches data
function UserProfile({ userId }: { userId: string }) {
  const user = use(fetchUser(userId)); // React 18 'use' hook
  
  return (
    <div className="profile">
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}

// Loading fallback
function ProfileSkeleton() {
  return (
    <div className="profile animate-pulse">
      <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
      <div className="h-6 bg-gray-200 rounded w-32 mt-4"></div>
      <div className="h-4 bg-gray-200 rounded w-48 mt-2"></div>
    </div>
  );
}

// App component
function App() {
  return (
    <div>
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile userId="123" />
      </Suspense>
    </div>
  );
}
\`\`\`

## 4. Practical Performance Patterns

### Concurrent-Safe State Updates

\`\`\`javascript
function OptimizedCounter() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleIncrement = () => {
    // Urgent: immediate feedback
    setCount(c => c + 1);
    
    startTransition(() => {
      // Non-urgent: analytics, logging, etc.
      trackUserInteraction('counter_increment');
      updateDatabase(count + 1);
    });
  };

  return (
    <div>
      <button onClick={handleIncrement} disabled={isPending}>
        Count: {count} {isPending && '(Saving...)'}
      </button>
    </div>
  );
}
\`\`\`

### Smart Data Fetching with Suspense

\`\`\`javascript
// Custom hook for suspense-compatible data fetching
function useSuspenseQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>
) {
  const data = use(
    React.useMemo(() => {
      return queryClient.fetchQuery({ queryKey, queryFn });
    }, [queryKey, queryFn])
  );
  
  return data;
}

function PostsList({ category }: { category: string }) {
  const posts = useSuspenseQuery(
    ['posts', category],
    () => fetchPostsByCategory(category)
  );

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

## Key Takeaways from Production Use

1. **Use Transitions Sparingly**: Only for truly non-urgent updates
2. **Combine with useMemo**: Defer expensive computations effectively  
3. **Suspense Boundaries**: Place them strategically for good UX
4. **Test Performance**: Always measure the impact of concurrent features

These concurrent features have made my applications feel significantly more responsive, especially on slower devices and networks.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-12",
    readTime: 9,
    tags: ["React 18", "Concurrent Features", "Performance", "useTransition", "Suspense"],
    category: "Development",
    featuredImage: blogPost4,
    featured: false
  },
  {
    id: "5",
    title: "Modern CSS-in-JS: Styled-Components vs Emotion vs Vanilla Extract",
    slug: "modern-css-in-js-comparison-2024",
    excerpt: "A comprehensive comparison of modern CSS-in-JS solutions, including performance benchmarks, developer experience, and practical recommendations for React projects.",
    content: `# Modern CSS-in-JS: Styled-Components vs Emotion vs Vanilla Extract

The CSS-in-JS landscape has evolved dramatically. After using various solutions in production, I want to share insights on choosing the right styling approach for modern React applications.

## The Current State of CSS-in-JS

### Performance Considerations

Runtime CSS-in-JS libraries have performance implications:
- **Bundle size**: Additional JavaScript overhead
- **Runtime cost**: Style generation and injection
- **Server-side rendering**: Hydration mismatches

### Zero-Runtime Solutions

The trend is moving towards compile-time solutions:
- **Vanilla Extract**: Type-safe CSS with zero runtime
- **Linaria**: CSS-in-JS without runtime overhead
- **Compiled**: Facebook's solution for large-scale apps

## Styled-Components: The Pioneer

\`\`\`javascript
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
}

const Button = styled.button<ButtonProps>\`
  padding: \${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'medium': return '12px 24px';
      case 'large': return '16px 32px';
    }
  }};
  
  background-color: \${props => 
    props.variant === 'primary' ? '#007bff' : '#6c757d'
  };
  
  border-radius: 6px;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  
  \${props => props.variant === 'primary' && css\`
    &:hover {
      background-color: #0056b3;
    }
  \`}
\`;

// Usage
<Button variant="primary" size="medium">
  Click me
</Button>
\`\`\`

**Pros:**
- Great developer experience
- Dynamic styling with props
- Strong TypeScript support
- Mature ecosystem

**Cons:**
- Runtime overhead
- Bundle size impact
- SSR complexity

## Emotion: Performance Focused

\`\`\`javascript
/** @jsxImportSource @emotion/react */
import { css, styled } from '@emotion/react';

const buttonStyles = css\`
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
\`;

const primaryButton = css\`
  background-color: #007bff;
  color: white;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }
\`;

// Using css prop
function MyButton({ children, isPrimary }: { 
  children: React.ReactNode; 
  isPrimary?: boolean;
}) {
  return (
    <button 
      css={[buttonStyles, isPrimary && primaryButton]}
    >
      {children}
    </button>
  );
}

// Or styled API
const StyledButton = styled.button\`
  \${buttonStyles}
  \${props => props.isPrimary && primaryButton}
\`;
\`\`\`

**Pros:**
- Better performance than styled-components
- Flexible API (css prop + styled)
- Smaller bundle size
- Good SSR support

**Cons:**
- Still has runtime cost
- Babel configuration needed

## Vanilla Extract: Zero-Runtime Champion

\`\`\`typescript
// button.css.ts
import { style, styleVariants } from '@vanilla-extract/css';
import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    white: '#ffffff'
  },
  space: {
    small: '8px',
    medium: '12px',
    large: '16px'
  }
});

const baseButton = style({
  borderRadius: '6px',
  border: 'none',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s',
  ':hover': {
    transform: 'translateY(-1px)'
  }
});

export const buttonVariants = styleVariants({
  primary: [baseButton, {
    backgroundColor: vars.colors.primary,
    color: vars.colors.white,
    ':hover': {
      backgroundColor: '#0056b3'
    }
  }],
  secondary: [baseButton, {
    backgroundColor: vars.colors.secondary,
    color: vars.colors.white,
    ':hover': {
      backgroundColor: '#5a6268'
    }
  }]
});

export const buttonSizes = styleVariants({
  small: {
    padding: \`\${vars.space.small} \${vars.space.medium}\`
  },
  medium: {
    padding: \`\${vars.space.medium} \${vars.space.large}\`
  },
  large: {
    padding: \`\${vars.space.large} 32px\`
  }
});
\`\`\`

\`\`\`javascript
// Button.tsx
import { buttonVariants, buttonSizes } from './button.css';
import clsx from 'clsx';

interface ButtonProps {
  variant: keyof typeof buttonVariants;
  size: keyof typeof buttonSizes;
  children: React.ReactNode;
}

export function Button({ variant, size, children }: ButtonProps) {
  return (
    <button 
      className={clsx(buttonVariants[variant], buttonSizes[size])}
    >
      {children}
    </button>
  );
}
\`\`\`

**Pros:**
- Zero runtime overhead
- Type-safe styles
- Excellent performance
- Great build-time optimizations

**Cons:**
- Learning curve
- Less dynamic styling
- More setup complexity

## My Recommendations Based on Project Needs

### For New Projects (2024)
**Vanilla Extract** + **Tailwind CSS** combination:
- Vanilla Extract for component-specific styles
- Tailwind for utility classes and rapid development

### For Existing Large Apps
**Emotion** for gradual migration:
- Better performance than styled-components
- Easier migration path
- Good compatibility

### For Rapid Prototyping
**Styled-Components**:
- Fastest development experience
- Great for component libraries
- Easy dynamic styling

## Performance Benchmarks (Real App)

From my testing on a production app:

- **Vanilla Extract**: 0ms runtime overhead, 15% smaller bundle
- **Emotion**: 2-3ms per component render
- **Styled-Components**: 4-5ms per component render

The choice depends on your priorities: performance vs developer experience vs team expertise.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-08",
    readTime: 8,
    tags: ["CSS-in-JS", "Styled Components", "Emotion", "Vanilla Extract", "Performance"],
    category: "Development",
    featuredImage: blogPost5,
    featured: false
  },
  {
    id: "aem-react-integration-guide",
    title: "Building Scalable Web Experiences with AEM and React: A Complete Integration Guide",
    slug: "aem-react-integration-guide",
    excerpt: "Master the art of combining Adobe Experience Manager with React to create powerful, content-driven web applications. Learn headless CMS patterns, GraphQL integration, and modern deployment strategies.",
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-xl font-medium text-muted-foreground mb-8">Adobe Experience Manager (AEM) paired with React represents one of the most powerful combinations for building enterprise-scale web applications. This comprehensive guide explores how to leverage both technologies to create scalable, maintainable, and high-performance digital experiences.</p>

        <h2>Why AEM + React?</h2>
        <p>The combination of AEM's robust content management capabilities with React's component-based architecture offers several compelling advantages:</p>
        
        <ul>
          <li><strong>Content-First Development:</strong> AEM provides enterprise-grade content management while React handles the presentation layer</li>
          <li><strong>Developer Experience:</strong> React's modern development tools combined with AEM's authoring experience</li>
          <li><strong>Performance:</strong> Client-side rendering capabilities with server-side content optimization</li>
          <li><strong>Scalability:</strong> Microservices architecture supporting both technologies</li>
        </ul>

        <h2>Headless AEM Architecture</h2>
        <p>Modern AEM implementations leverage headless architecture patterns, where AEM serves as a content repository while React applications consume content via APIs:</p>

        <pre><code>// Content Fragment API integration
import { AEMHeadless } from '@adobe/aem-headless-client-js';

const aemHeadlessClient = new AEMHeadless({
  serviceURL: process.env.REACT_APP_AEM_HOST,
  endpoint: process.env.REACT_APP_AEM_ENDPOINT,
});

export const fetchContentFragments = async (modelPath) => {
  try {
    const response = await aemHeadlessClient.runPersistedQuery(
      \`my-site/article-by-path\`,
      { path: modelPath }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch content:', error);
    throw error;
  }
};</code></pre>

        <h2>GraphQL Integration Patterns</h2>
        <p>AEM's GraphQL API provides a flexible way to query content fragments. Here's how to set up efficient data fetching:</p>

        <pre><code>// GraphQL query for article content
const ARTICLE_QUERY = \`
  query ArticleByPath($path: String!) {
    articleByPath(path: $path) {
      item {
        title
        description
        content {
          html
        }
        author {
          name
          bio
        }
        publishDate
        featuredImage {
          _path
          _authorUrl
        }
      }
    }
  }
\`;

// React hook for content fetching
export const useAEMContent = (path) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const result = await aemHeadlessClient.runQuery(ARTICLE_QUERY, { path });
        setContent(result.data.articleByPath.item);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (path) {
      fetchContent();
    }
  }, [path]);

  return { content, loading, error };
};</code></pre>

        <h2>Component Mapping and Content Models</h2>
        <p>Establish a clear mapping between AEM content models and React components:</p>

        <pre><code>// Component mapping configuration
const componentMapping = {
  'hero-banner': HeroBanner,
  'article-text': ArticleText,
  'image-gallery': ImageGallery,
  'call-to-action': CallToAction,
};

// Dynamic component renderer
export const ContentRenderer = ({ contentFragment }) => {
  const { componentType, ...props } = contentFragment;
  const Component = componentMapping[componentType];
  
  if (!Component) {
    console.warn(\`Component type "\${componentType}" not found\`);
    return null;
  }
  
  return <Component {...props} />;
};</code></pre>

        <h2>Performance Optimization Strategies</h2>
        <p>Optimize your AEM + React application for maximum performance:</p>

        <h3>1. Content Caching</h3>
        <pre><code>// React Query integration for caching
import { useQuery } from '@tanstack/react-query';

export const useAEMArticle = (path) => {
  return useQuery({
    queryKey: ['aem-article', path],
    queryFn: () => fetchContentFragments(path),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};</code></pre>

        <h3>2. Image Optimization</h3>
        <pre><code>// Optimized image component
const AEMImage = ({ imagePath, alt, className }) => {
  const optimizedSrc = \`\${imagePath}?width=800&format=webp&optimize=medium\`;
  const fallbackSrc = \`\${imagePath}?width=800&format=jpeg\`;
  
  return (
    <picture>
      <source srcSet={optimizedSrc} type="image/webp" />
      <img src={fallbackSrc} alt={alt} className={className} loading="lazy" />
    </picture>
  );
};</code></pre>

        <h2>Deployment and CI/CD</h2>
        <p>Set up automated deployment pipelines for both AEM content and React applications:</p>

        <pre><code># Docker configuration for React app
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>

        <h2>Testing Strategies</h2>
        <p>Implement comprehensive testing for AEM content integration:</p>

        <pre><code>// Mock AEM responses for testing
import { render, screen, waitFor } from '@testing-library/react';
import { useAEMContent } from '../hooks/useAEMContent';

jest.mock('../hooks/useAEMContent');

describe('ArticlePage', () => {
  it('renders article content from AEM', async () => {
    const mockContent = {
      title: 'Test Article',
      content: { html: '<p>Test content</p>' },
      author: { name: 'Chandrashekar' }
    };
    
    useAEMContent.mockReturnValue({
      content: mockContent,
      loading: false,
      error: null
    });

    render(<ArticlePage path="/content/articles/test" />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument();
    });
  });
});</code></pre>

        <h2>Security Best Practices</h2>
        <p>Ensure your AEM + React implementation follows security best practices:</p>

        <ul>
          <li><strong>API Authentication:</strong> Implement proper authentication for AEM GraphQL endpoints</li>
          <li><strong>Content Validation:</strong> Sanitize and validate all content from AEM before rendering</li>
          <li><strong>CORS Configuration:</strong> Properly configure CORS policies for cross-origin requests</li>
          <li><strong>Content Security Policy:</strong> Implement CSP headers to prevent XSS attacks</li>
        </ul>

        <h2>Future Considerations</h2>
        <p>As the web development landscape evolves, consider these emerging patterns:</p>

        <ul>
          <li><strong>Edge Computing:</strong> Leverage CDN edge functions for improved performance</li>
          <li><strong>Progressive Web Apps:</strong> Implement PWA features for enhanced user experience</li>
          <li><strong>Micro-frontends:</strong> Consider micro-frontend architecture for large-scale applications</li>
          <li><strong>AI Integration:</strong> Explore AI-powered content personalization with AEM</li>
        </ul>

        <h2>Conclusion</h2>
        <p>The combination of AEM and React provides a robust foundation for building modern, content-driven web applications. By following the patterns and practices outlined in this guide, you can create scalable, maintainable, and high-performance digital experiences that serve both content creators and end users effectively.</p>

        <p>Remember that successful AEM + React integration requires careful planning of your content architecture, component design, and deployment strategy. Start small, iterate frequently, and always prioritize performance and user experience in your implementation decisions.</p>
      </div>
    `,
    author: {
      name: "Chandrashekar",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chandrashekar",
      bio: "Senior React Developer with 3+ years of experience in modern web development and enterprise CMS integration. Passionate about building scalable, performant web applications."
    },
    publishedDate: "2024-08-20",
    readTime: 15,
    tags: ["AEM", "React", "Headless CMS", "GraphQL", "Enterprise", "Content Management"],
    category: "Development",
    featuredImage: blogHeroImage,
    featured: true
  },
  {
    id: "7",
    title: "Persisting React State Across Page Refreshes: localStorage Patterns",
    slug: "persisting-react-state-page-refresh-localstorage",
    excerpt: "Learn effective patterns for persisting React state using localStorage, including custom hooks and best practices for maintaining state across browser sessions.",
    content: `# Persisting React State Across Page Refreshes: localStorage Patterns

One of the most common challenges in React development is maintaining state when users refresh the page. After building several production apps, I've developed reliable patterns for state persistence using localStorage.

## The Problem with Default React State

By default, React state is ephemeral. When users refresh the page, all state is lost:

\`\`\`javascript
const [cart, setCart] = useState([]); // Lost on refresh!
\`\`\`

This creates poor user experience, especially for:
- Shopping carts
- Form data
- User preferences
- Search filters
- Theme selections

## Basic localStorage Integration

Here's the fundamental pattern I use:

\`\`\`javascript
const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
\`\`\`

### Key Points:
- Use lazy initial state to read from localStorage only once
- Parse JSON when reading, stringify when writing
- Update localStorage whenever state changes

## Custom usePersistState Hook

For better reusability, I created this custom hook:

\`\`\`typescript
import { useState, useEffect, useMemo } from 'react';

export function usePersistState<T>(
  initialValue: T, 
  storageKey: string
): [T, (newState: T) => void] {
  
  const prefixedKey = \`state:\${storageKey}\`;
  
  // Initialize state from localStorage or use default
  const _initialValue = useMemo(() => {
    try {
      const storedValue = localStorage.getItem(prefixedKey);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.warn(\`Failed to parse localStorage value for key "\${prefixedKey}"\`, error);
    }
    return initialValue;
  }, [prefixedKey, initialValue]);

  const [state, setState] = useState<T>(_initialValue);

  // Persist state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(prefixedKey, JSON.stringify(state));
    } catch (error) {
      console.warn(\`Failed to save to localStorage for key "\${prefixedKey}"\`, error);
    }
  }, [state, prefixedKey]);

  return [state, setState];
}
\`\`\`

## Usage Examples

### Shopping Cart
\`\`\`javascript
function ShoppingCart() {
  const [cart, setCart] = usePersistState([], 'shopping-cart');
  
  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  return (
    <div>
      {cart.map(item => (
        <CartItem key={item.id} item={item} onRemove={removeFromCart} />
      ))}
      <button onClick={() => addToCart(newProduct)}>
        Add Product
      </button>
    </div>
  );
}
\`\`\`

### User Preferences
\`\`\`javascript
function UserSettings() {
  const [preferences, setPreferences] = usePersistState({
    theme: 'light',
    language: 'en',
    notifications: true
  }, 'user-preferences');

  const updateTheme = (theme) => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  return (
    <div>
      <ThemeSelector 
        value={preferences.theme} 
        onChange={updateTheme} 
      />
    </div>
  );
}
\`\`\`

This pattern has dramatically improved user experience in my applications by maintaining context across browser sessions while keeping the implementation clean and reusable.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-12",
    readTime: 8,
    tags: ["React", "localStorage", "State Management", "Hooks", "Persistence"],
    category: "Development",
    featuredImage: blogPost4,
    featured: false
  },
  {
    id: "8",
    title: "Essential Git Commands Cheat Sheet for Developers",
    slug: "essential-git-commands-cheat-sheet-developers",
    excerpt: "A comprehensive guide to Git commands every developer needs to know, from basic operations to advanced workflows for effective version control.",
    content: `# Essential Git Commands Cheat Sheet for Developers

Git is the backbone of modern software development. After 3 years of React development, I've compiled the essential Git commands that every developer should master. This is my go-to reference guide.

## Getting Started with Git

### Repository Initialization
\`\`\`bash
git init                     # Initialize a new Git repository
git clone [url]             # Clone a repository into a new directory
git remote -v               # List remote repositories with URLs
git remote add [name] [url] # Add a new remote repository
git remote remove [name]    # Remove a remote repository
\`\`\`

## Daily Git Workflow Commands

### Basic Operations
\`\`\`bash
git status                  # Display working directory and staging area status
git add [file]             # Add a file to the staging area
git add .                  # Add all changes to staging area
git commit -m "[message]"  # Record changes with a descriptive message
git push                   # Upload local repository content to remote
git pull                   # Fetch and merge changes from remote repository
\`\`\`

### Configuration
\`\`\`bash
git config --global user.name "[name]"        # Set your name
git config --global user.email "[email]"      # Set your email
git config --list                             # Show all configuration settings
\`\`\`

## Branch Management

### Creating and Switching Branches
\`\`\`bash
git branch                    # List all local branches
git branch [branch-name]      # Create a new branch
git checkout [branch]         # Switch to specified branch
git checkout -b [branch]      # Create new branch and switch to it
git branch -d [branch]        # Delete specified branch safely
git branch -D [branch]        # Force delete specified branch
\`\`\`

### Merging and Integration
\`\`\`bash
git merge [branch]           # Merge specified branch into current branch
git merge --abort            # Abort current merge process
git rebase [branch]          # Reapply commits on top of another branch
git cherry-pick [commit]     # Apply a specific commit to current branch
\`\`\`

## Advanced Git Operations

### Stashing Changes
\`\`\`bash
git stash                    # Temporarily save uncommitted changes
git stash pop                # Apply most recent stash and remove it
git stash list               # Show all stashed changes
git stash drop               # Delete a specific stash
git stash clear              # Delete all stashes
\`\`\`

### History and Information
\`\`\`bash
git log                      # Display commit history
git log --oneline            # Compact commit history
git log --graph              # Show branch structure
git diff                     # Show changes between commits/files
git show [commit]            # Display information about a commit
\`\`\`

These commands form the foundation of effective version control. Master them, and your development workflow will become significantly more efficient and reliable.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-10",
    readTime: 12,
    tags: ["Git", "Version Control", "Developer Tools", "Workflow", "Commands"],
    category: "Tools",
    featuredImage: blogPost5,
    featured: false
  },
  {
    id: "9",
    title: "Advanced React State Patterns: Custom Hooks for Better Code",
    slug: "advanced-react-state-patterns-custom-hooks",
    excerpt: "Explore advanced state management patterns in React using custom hooks, including state persistence, complex state logic, and performance optimizations.",
    content: `# Advanced React State Patterns: Custom Hooks for Better Code

After working with React for 3 years, I've discovered that custom hooks are the secret to writing clean, reusable, and maintainable code. Let me share the advanced patterns I use in production applications.

## Why Custom Hooks Matter

Custom hooks allow us to:
- Extract component logic into reusable functions
- Share stateful logic between components
- Separate concerns and improve testability
- Create domain-specific abstractions

## Advanced usePersistState Hook

Building on localStorage concepts, here's my production-ready persistent state hook:

\`\`\`typescript
import { useState, useEffect, useCallback, useRef } from 'react';

interface UsePersistStateOptions {
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
  onError?: (error: Error, key: string) => void;
}

export function usePersistState<T>(
  key: string,
  defaultValue: T,
  options: UsePersistStateOptions = {}
): [T, (value: T | ((prev: T) => T)) => void] {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    onError = console.error
  } = options;

  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? deserialize(item) : defaultValue;
    } catch (error) {
      onError(error as Error, key);
      return defaultValue;
    }
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      localStorage.setItem(key, serialize(state));
    } catch (error) {
      onError(error as Error, key);
    }
  }, [key, state, serialize, onError]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setState(value);
  }, []);

  return [state, setValue];
}
\`\`\`

## Shopping Cart Hook Example

Real-world example combining multiple patterns:

\`\`\`typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function useShoppingCart() {
  const [items, setItems] = usePersistState<CartItem[]>('shopping-cart', []);

  const addItem = useCallback((product: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }, [setItems]);

  const removeItem = useCallback((productId: string) => {
    setItems(currentItems => 
      currentItems.filter(item => item.id !== productId)
    );
  }, [setItems]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [setItems, removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const totalPrice = useMemo(() =>
    items.reduce((total, item) => total + (item.price * item.quantity), 0),
    [items]
  );

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    isEmpty: items.length === 0
  };
}
\`\`\`

These patterns have transformed how I build React applications, making code more maintainable, testable, and reusable across projects.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-08",
    readTime: 15,
    tags: ["React", "Custom Hooks", "State Management", "TypeScript", "Patterns"],
    category: "Development",
    featuredImage: blogPost3,
    featured: false
  }
];

export const categories = ["All", "Development", "Content Management", "Design", "Tools"];

export const tags = [
  "React", "TypeScript", "Performance", "Server Components", "Next.js",
  "React Query", "TanStack", "Data Fetching", "State Management", "Type Safety",
  "Generics", "React 18", "Concurrent Features", "useTransition", "Suspense",
  "CSS-in-JS", "Styled Components", "Emotion", "Vanilla Extract", "Development",
  "localStorage", "Hooks", "Persistence", "Git", "Version Control", "Developer Tools",
  "Workflow", "Commands", "Custom Hooks", "Patterns"
];
