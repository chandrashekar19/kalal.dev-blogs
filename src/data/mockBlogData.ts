
import blogPost1 from '@/assets/blog-post-1.jpg';
import blogPost2 from '@/assets/blog-post-2.jpg';
import blogPost3 from '@/assets/blog-post-3.jpg';
import blogPost4 from '@/assets/blog-post-4.jpg';
import blogPost5 from '@/assets/blog-post-5.jpg';

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
  }
];

export const categories = ["All", "Development", "Content Management", "Design"];

export const tags = [
  "React", "TypeScript", "Performance", "Server Components", "Next.js",
  "React Query", "TanStack", "Data Fetching", "State Management", "Type Safety",
  "Generics", "React 18", "Concurrent Features", "useTransition", "Suspense",
  "CSS-in-JS", "Styled Components", "Emotion", "Vanilla Extract", "Development"
];
