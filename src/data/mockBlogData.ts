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
    title: "JavaScript A-Z: Complete Developer's Reference Guide",
    slug: "react-18-concurrent-features-practical-guide",
    excerpt: "A comprehensive A-Z guide covering essential JavaScript concepts, APIs, and terminologies that every developer should know in 2024.",
    content: `# JavaScript A-Z: Complete Developer's Reference Guide

As a developer working with JavaScript daily, I've compiled this comprehensive A-Z reference guide covering the essential concepts, APIs, and terminologies that every JavaScript developer should master in 2024.

## A - API (Application Programming Interface), Async (Asynchronous)

**API (Application Programming Interface)**: A set of protocols and tools for building software applications. APIs define how different software components should interact.

**Async (Asynchronous)**: Programming pattern that allows code to run without blocking the main thread, enabling better performance and user experience.

## B - BOM (Browser Object Model), Blob, Bubbling

**BOM (Browser Object Model)**: Represents the browser window and provides access to browser-specific objects like window, navigator, and location.

**Blob**: Binary Large Object - represents immutable raw data, often used for file handling and data manipulation.

**Bubbling**: Event propagation phase where events bubble up from the target element to the document root.

## C - DOM (Document Object Model), Classes

**DOM (Document Object Model)**: Programming interface for HTML documents, representing the page structure as a tree of objects.

**Classes**: ES6 feature providing a cleaner syntax for creating constructor functions and implementing inheritance.

## D - Data Types, DOMContentLoaded, Debounce

**Data Types**: JavaScript has primitive types (string, number, boolean, null, undefined, symbol, bigint) and reference types (objects, arrays, functions).

**DOMContentLoaded**: Event fired when the HTML document has been completely loaded and parsed.

**Debounce**: Technique to limit function execution by delaying it until after a specified time has passed since the last invocation.

## E - Events, ECMAScript, ES6 (ECMAScript 2015)

**Events**: Actions that can be detected by JavaScript, such as clicks, key presses, or page loads.

**ECMAScript**: The standard that JavaScript is based on, defining syntax, types, statements, keywords, and objects.

**ES6 (ECMAScript 2015)**: Major update introducing classes, modules, arrow functions, destructuring, and many other features.

## F - Fetch API, FormData, Function

**Fetch API**: Modern way to make HTTP requests, replacing XMLHttpRequest with a Promise-based interface.

**FormData**: Web API for capturing form fields and their values, often used for file uploads.

**Function**: First-class objects in JavaScript that can be stored in variables, passed as arguments, and returned from other functions.

## G - Geolocation API, Generators, GET (HTTP method)

**Geolocation API**: Web API that allows web applications to access the user's geographical location.

**Generators**: Functions that can be paused and resumed, useful for creating iterators and managing asynchronous flow.

**GET (HTTP method)**: HTTP method used to retrieve data from a server without causing side effects.

## H - Hoisting, History API

**Hoisting**: JavaScript behavior where variable and function declarations are moved to the top of their scope during compilation.

**History API**: Web API that provides access to the browser's session history, enabling navigation without page reloads.

## I - IIFE (Immediately Invoked Function Expression), Iterables

**IIFE (Immediately Invoked Function Expression)**: Function that runs as soon as it's defined, often used to create isolated scopes.

**Iterables**: Objects that implement the iterator protocol, allowing them to be iterated over with for...of loops.

## J - JSON (JavaScript Object Notation)

**JSON (JavaScript Object Notation)**: Lightweight data interchange format that's easy for humans to read and write.

## K - Key-Value, Keyboard Events, Koa (JavaScript web framework)

**Key-Value**: Data structure pattern where data is stored as pairs of keys and their corresponding values.

**Keyboard Events**: Events triggered by keyboard interactions like keydown, keyup, and keypress.

**Koa (JavaScript web framework)**: Modern web framework for Node.js that uses async functions and provides a more expressive API.

## L - LocalStorage, Let (Variable Declaration), Loops

**LocalStorage**: Web Storage API that allows storing data in the browser with no expiration time.

**Let (Variable Declaration)**: Block-scoped variable declaration introduced in ES6, replacing var in many use cases.

**Loops**: Control structures for repeating code execution, including for, while, do-while, and for...in/for...of loops.

## M - Maps (Data structure), Mocha (JavaScript testing framework), Modules

**Maps (Data structure)**: ES6 collection type that holds key-value pairs and remembers insertion order.

**Mocha (JavaScript testing framework)**: Feature-rich testing framework for Node.js and browsers.

**Modules**: Way to organize and reuse code by exporting and importing functionality between files.

## N - Node.js (JavaScript runtime), NaN (Not a Number), Nullish Coalescing Operator

**Node.js (JavaScript runtime)**: Runtime environment that allows JavaScript to run on servers and build backend applications.

**NaN (Not a Number)**: Special numeric value representing an invalid or undefined mathematical operation.

**Nullish Coalescing Operator**: Logical operator (??) that returns the right-hand operand when the left is null or undefined.

## O - Objects, Object Methods, Operator Overloading

**Objects**: Complex data types that store collections of key-value pairs and are fundamental to JavaScript.

**Object Methods**: Functions that are properties of objects, providing behavior to object instances.

**Operator Overloading**: Ability to define custom behavior for operators when applied to user-defined types.

## P - Promises, Proxy, Polyfills

**Promises**: Objects representing the eventual completion or failure of asynchronous operations.

**Proxy**: ES6 feature that allows intercepting and customizing operations on objects like property access and assignment.

**Polyfills**: Code that implements features on web browsers that don't natively support them.

## Q - QuerySelector, Query Parameters, Queues (Data structure)

**QuerySelector**: DOM method for selecting elements using CSS selectors.

**Query Parameters**: Part of a URL that assigns values to specified parameters, appearing after the question mark.

**Queues (Data structure)**: First-In-First-Out (FIFO) data structure commonly used in algorithms and asynchronous programming.

## R - Recursion, RegExp (Regular Expressions)

**Recursion**: Programming technique where a function calls itself to solve smaller instances of the same problem.

**RegExp (Regular Expressions)**: Patterns used to match character combinations in strings, useful for validation and text processing.

## S - Storage API, Symbols, Spread Syntax

**Storage API**: Web APIs (localStorage, sessionStorage) for storing data in the browser.

**Symbols**: Primitive data type introduced in ES6, often used to create unique property keys.

**Spread Syntax**: ES6 feature (...) that allows iterables to be expanded in places where multiple elements are expected.

## T - TypeScript, Template Literals, Timeouts, Temporal Dead Zone

**TypeScript**: Superset of JavaScript that adds static type checking and compiles to plain JavaScript.

**Template Literals**: ES6 feature using backticks for string interpolation and multi-line strings.

**Timeouts**: Functions like setTimeout and setInterval for executing code after specified delays.

**Temporal Dead Zone**: Period between entering scope and variable declaration where let/const variables cannot be accessed.

## U - UI (User Interface), URL (Uniform Resource Locator), UTF-8 (Character encoding)

**UI (User Interface)**: The space where interactions between humans and computers occur.

**URL (Uniform Resource Locator)**: Web address that specifies the location of a resource on the internet.

**UTF-8 (Character encoding)**: Variable-width character encoding capable of encoding all valid Unicode characters.

## V - Variables, Var (Variable Declaration), Vanilla JS

**Variables**: Named storage locations for data values in programming.

**Var (Variable Declaration)**: Traditional way to declare variables in JavaScript, function-scoped and hoisted.

**Vanilla JS**: Plain JavaScript without any additional libraries or frameworks.

## W - Webpack (JavaScript module bundler), WebSocket, WeakMap

**Webpack (JavaScript module bundler)**: Tool that bundles JavaScript modules and assets for web applications.

**WebSocket**: Communication protocol providing full-duplex communication channels over a single TCP connection.

**WeakMap**: Collection of key-value pairs where keys must be objects and are held weakly.

## X - XMLHttpRequest, XML (eXtensible Markup Language)

**XMLHttpRequest**: API that provides client functionality for transferring data between a client and server.

**XML (eXtensible Markup Language)**: Markup language that defines rules for encoding documents in a machine-readable format.

## Y - Yield (Generator function), Yarn (Package manager)

**Yield (Generator function)**: Keyword used in generator functions to pause execution and return a value.

**Yarn (Package manager)**: Fast, reliable, and secure dependency management tool for JavaScript projects.

## Z - Zone (Execution context in Angular), Zero-based Indexing

**Zone (Execution context in Angular)**: Execution context that persists across async tasks in Angular applications.

**Zero-based Indexing**: Programming convention where the first element of a sequence is assigned index 0.

This comprehensive guide serves as a quick reference for JavaScript concepts that I use regularly in my development work. Each concept builds upon others to create the rich ecosystem we know as modern JavaScript development.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-12",
    readTime: 15,
    tags: ["JavaScript", "Programming", "Web Development", "Reference", "ES6"],
    category: "Development",
    featuredImage: blogPost4,
    featured: false
  },
  {
    id: "5",
    title: "Building Scalable Web Experiences with AEM and React: A Complete Integration Guide",
    slug: "building-scalable-web-aem-react-integration",
    excerpt: "Learn how to integrate Adobe Experience Manager with React to build powerful, content-driven web applications. From setup to deployment strategies.",
    content: `# Building Scalable Web Experiences with AEM and React: A Complete Integration Guide

Adobe Experience Manager (AEM) combined with React creates a powerful foundation for building enterprise-scale web applications. After working on several AEM + React projects, I want to share the integration patterns and best practices I've learned.

## Why AEM + React?

The combination of AEM's robust content management capabilities with React's component-based architecture offers:

- **Content-Driven Development**: Marketers can manage content without developer intervention
- **Component Reusability**: React components can be mapped to AEM components
- **SEO-Friendly**: Server-side rendering with AEM's built-in SEO capabilities
- **Scalable Architecture**: Both technologies scale well for enterprise needs

## Setting Up AEM with React

### 1. AEM React Editable Components

\`\`\`javascript
import { MapTo, withMappable } from '@adobe/aem-react-editable-components';

const HeroComponent = (props) => {
  return (
    <div className="hero-component">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <img src={props.imageUrl} alt={props.title} />
    </div>
  );
};

// Map React component to AEM component
MapTo('mysite/components/hero')(withMappable(HeroComponent));
\`\`\`

### 2. Content Fragment Integration

\`\`\`javascript
import { useEffect, useState } from 'react';

function useContentFragment(path) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(\`/content/dam/\${path}.model.json\`);
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [path]);

  return { content, loading };
}

// Usage in component
function BlogPost({ contentPath }) {
  const { content, loading } = useContentFragment(contentPath);

  if (loading) return <div>Loading...</div>;

  return (
    <article>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </article>
  );
}
\`\`\`

### 3. GraphQL Integration

\`\`\`javascript
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_ARTICLES = gql\`
  query GetArticles($limit: Int!) {
    articleList(limit: $limit) {
      items {
        _path
        title
        description
        publishDate
        author {
          name
          bio
        }
      }
    }
  }
\`;

function ArticleList() {
  const { loading, error, data } = useQuery(GET_ARTICLES, {
    variables: { limit: 10 }
  });

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="article-grid">
      {data.articleList.items.map((article) => (
        <ArticleCard key={article._path} article={article} />
      ))}
    </div>
  );
}
\`\`\`

## Advanced Integration Patterns

### 1. Context-Aware Components

\`\`\`javascript
import { useContext } from 'react';
import { ModelManager } from '@adobe/aem-spa-page-model-manager';

const AEMContext = createContext();

function withAEMContext(Component) {
  return function AEMContextComponent(props) {
    const [model, setModel] = useState(null);

    useEffect(() => {
      ModelManager.getData({ path: props.cqPath })
        .then(setModel)
        .catch(console.error);
    }, [props.cqPath]);

    return (
      <AEMContext.Provider value={{ model, ...props }}>
        <Component {...props} />
      </AEMContext.Provider>
    );
  };
}
\`\`\`

### 2. Multi-Site Management

\`\`\`javascript
function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    const siteName = window.location.hostname;
    fetch(\`/etc/acs-commons/site-config/\${siteName}.json\`)
      .then(response => response.json())
      .then(setSiteConfig)
      .catch(console.error);
  }, []);

  return siteConfig;
}

function SiteWrapper({ children }) {
  const siteConfig = useSiteConfig();

  if (!siteConfig) return <div>Loading site configuration...</div>;

  return (
    <div className={\`site-\${siteConfig.theme}\`}>
      <header>
        <img src={siteConfig.logo} alt={siteConfig.siteName} />
        <nav>{/* Dynamic navigation based on site config */}</nav>
      </header>
      <main>{children}</main>
      <footer>{/* Site-specific footer */}</footer>
    </div>
  );
}
\`\`\`

## Performance Optimization

### 1. Code Splitting by AEM Components

\`\`\`javascript
import { lazy, Suspense } from 'react';

const ComponentMap = {
  'mysite/components/hero': lazy(() => import('./HeroComponent')),
  'mysite/components/carousel': lazy(() => import('./CarouselComponent')),
  'mysite/components/form': lazy(() => import('./FormComponent'))
};

function DynamicComponent({ resourceType, ...props }) {
  const Component = ComponentMap[resourceType];

  if (!Component) {
    console.warn(\`Component not found: \${resourceType}\`);
    return null;
  }

  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <Component {...props} />
    </Suspense>
  );
}
\`\`\`

### 2. Caching Strategies

\`\`\`javascript
// Service Worker for content caching
const CACHE_NAME = 'aem-content-v1';
const CONTENT_URLS = [
  '/content/dam/',
  '/api/graphql',
  '/_jcr_content'
];

self.addEventListener('fetch', event => {
  if (CONTENT_URLS.some(url => event.request.url.includes(url))) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            // Serve from cache
            return response;
          }
          // Fetch and cache
          return fetch(event.request)
            .then(response => {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
              return response;
            });
        })
    );
  }
});
\`\`\`

## Deployment Best Practices

1. **Environment Configuration**: Use AEM's runmode system to manage different environments
2. **Build Optimization**: Leverage AEM's client library system for production builds
3. **CDN Integration**: Configure AEM Dispatcher with CDN for optimal content delivery
4. **Monitoring**: Implement proper logging and monitoring for both AEM and React layers

## Key Takeaways

- Start with AEM's SPA editor for quick prototyping
- Use Content Fragments for structured content
- Implement proper error boundaries for component failures
- Leverage AEM's caching mechanisms alongside React optimizations
- Plan your component mapping strategy early in the project

The AEM + React combination provides a robust foundation for enterprise web applications, offering both developer productivity and content author flexibility.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-10",
    readTime: 14,
    tags: ["AEM", "React", "Adobe Experience Manager", "Integration", "Enterprise"],
    category: "Development",
    featuredImage: blogPost5,
    featured: true
  },
  {
    id: "6",
    title: "Persisting React State Across Page Refreshes: localStorage Patterns",
    slug: "react-state-persistence-localstorage-patterns",
    excerpt: "Master state persistence in React applications using localStorage. Learn custom hooks, best practices, and advanced patterns for maintaining state across sessions.",
    content: `# Persisting React State Across Page Refreshes: localStorage Patterns

One of the most common challenges in React development is maintaining state across page refreshes. In this comprehensive guide, I'll share the patterns and custom hooks I use to create seamless user experiences with persistent state.

## The Problem with Default React State

By default, React state is ephemeral - it disappears when users refresh the page or navigate away. This can be frustrating for users who lose their form data, shopping cart contents, or application preferences.

## Basic localStorage Integration

### Simple State Persistence

\`\`\`javascript
import { useState, useEffect } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState(() => {
    // Initialize state from localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  return (
    <div className="shopping-cart">
      {cart.map(item => (
        <CartItem 
          key={item.id} 
          item={item} 
          onRemove={() => removeFromCart(item.id)} 
        />
      ))}
      <button onClick={() => addToCart(newProduct)}>
        Add Product
      </button>
    </div>
  );
}
\`\`\`

## Custom Hook for State Persistence

### usePersistState Hook

\`\`\`typescript
import { useState, useEffect, useMemo } from 'react';

export function usePersistState<T>(
  initialValue: T, 
  key: string
): [T, (newState: T | ((prev: T) => T)) => void] {
  
  // Initialize state from localStorage
  const _initialValue = useMemo(() => {
    try {
      const localStorageValue = localStorage.getItem(\`state:\${key}\`);
      if (localStorageValue) {
        return JSON.parse(localStorageValue);
      }
    } catch (error) {
      console.warn(\`Failed to parse localStorage item '\${key}'\`, error);
    }
    return initialValue;
  }, [initialValue, key]);

  const [state, setState] = useState<T>(_initialValue);

  // Update localStorage when state changes
  useEffect(() => {
    try {
      const stateString = JSON.stringify(state);
      localStorage.setItem(\`state:\${key}\`, stateString);
    } catch (error) {
      console.warn(\`Failed to save state to localStorage '\${key}'\`, error);
    }
  }, [state, key]);

  return [state, setState];
}
\`\`\`

### Usage Examples

\`\`\`javascript
// Counter with persistence
function PersistentCounter() {
  const [counter, setCounter] = usePersistState(0, 'counter');

  return (
    <div>
      <p>Count: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
      <button onClick={() => setCounter(0)}>
        Reset
      </button>
    </div>
  );
}

// Form with auto-save
function ContactForm() {
  const [formData, setFormData] = usePersistState({
    name: '',
    email: '',
    message: ''
  }, 'contact-form');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm(formData);
      // Clear form after successful submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Your name"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Your email"
      />
      <textarea
        value={formData.message}
        onChange={(e) => updateField('message', e.target.value)}
        placeholder="Your message"
      />
      <button type="submit">Send Message</button>
    </form>
  );
}
\`\`\`

## Advanced Patterns

### usePersistedReducer Hook

\`\`\`typescript
import { useReducer, useEffect } from 'react';

function usePersistedReducer<T, A>(
  reducer: (state: T, action: A) => T,
  initialState: T,
  key: string
): [T, React.Dispatch<A>] {
  
  // Get initial state from localStorage
  const getInitialState = (): T => {
    try {
      const savedState = localStorage.getItem(\`reducer:\${key}\`);
      return savedState ? JSON.parse(savedState) : initialState;
    } catch {
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, getInitialState());

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(\`reducer:\${key}\`, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save reducer state:', error);
    }
  }, [state, key]);

  return [state, dispatch];
}

// Example usage with shopping cart
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    
    default:
      return state;
  }
}

function ShoppingCartWithReducer() {
  const [cartState, dispatch] = usePersistedReducer(
    cartReducer,
    { items: [], total: 0 },
    'shopping-cart'
  );

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <div>
      {cartState.items.map((item) => (
        <div key={item.id}>
          {item.name} - \${item.price} x {item.quantity}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### Storage Strategy with Expiration

\`\`\`typescript
interface StorageItem<T> {
  value: T;
  timestamp: number;
  expiry?: number; // Time in milliseconds
}

export function usePersistedStateWithExpiry<T>(
  initialValue: T,
  key: string,
  expiryTime?: number // in milliseconds
): [T, (value: T) => void] {
  
  const getStoredValue = (): T => {
    try {
      const storedItem = localStorage.getItem(\`expiry:\${key}\`);
      if (!storedItem) return initialValue;

      const parsed: StorageItem<T> = JSON.parse(storedItem);
      
      // Check if item has expired
      if (parsed.expiry && Date.now() > parsed.expiry) {
        localStorage.removeItem(\`expiry:\${key}\`);
        return initialValue;
      }

      return parsed.value;
    } catch {
      return initialValue;
    }
  };

  const [state, setState] = useState<T>(getStoredValue);

  const setStoredValue = (value: T) => {
    setState(value);
    
    try {
      const storageItem: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiry: expiryTime ? Date.now() + expiryTime : undefined
      };
      
      localStorage.setItem(\`expiry:\${key}\`, JSON.stringify(storageItem));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  };

  return [state, setStoredValue];
}

// Usage: State that expires after 1 hour
function TemporaryPreferences() {
  const [theme, setTheme] = usePersistedStateWithExpiry(
    'light',
    'user-theme',
    60 * 60 * 1000 // 1 hour
  );

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
\`\`\`

## Best Practices and Considerations

### 1. Error Handling
Always wrap localStorage operations in try-catch blocks, as they can fail in private browsing mode or when storage is full.

### 2. Performance Optimization
For frequently changing state, consider debouncing localStorage updates:

\`\`\`javascript
import { useCallback } from 'react';
import { debounce } from 'lodash';

function useDebouncePersistedState<T>(initialValue: T, key: string, delay = 500) {
  const [state, setState] = useState<T>(initialValue);

  const debouncedSave = useCallback(
    debounce((value: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
      }
    }, delay),
    [key, delay]
  );

  const setPersistedState = (value: T) => {
    setState(value);
    debouncedSave(value);
  };

  return [state, setPersistedState] as const;
}
\`\`\`

### 3. Data Migration
Handle schema changes gracefully:

\`\`\`javascript
function migrateUserData(data: any, version: number): UserData {
  if (version < 2) {
    // Migration logic for version 1 to 2
    return {
      ...data,
      preferences: data.settings || {}, // Rename 'settings' to 'preferences'
      version: 2
    };
  }
  return data;
}
\`\`\`

These patterns ensure robust state persistence while maintaining good user experience and handling edge cases gracefully.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-08",
    readTime: 13,
    tags: ["React", "localStorage", "State Management", "Hooks", "Persistence"],
    category: "Development",
    featuredImage: blogPost1,
    featured: false
  },
  {
    id: "7",
    title: "Essential Git Commands Cheat Sheet for Developers",
    slug: "essential-git-commands-cheat-sheet-developers",
    excerpt: "A comprehensive reference guide to Git commands every developer needs to know. From basic workflows to advanced techniques for professional development.",
    content: `# Essential Git Commands Cheat Sheet for Developers

Git is an essential tool for modern software development. After years of using Git in various projects, I've compiled this comprehensive cheat sheet of commands that every developer should master.

## Repository Management

### Initializing and Cloning

\`\`\`bash
# Initialize a new Git repository
git init

# Clone a repository into a new directory
git clone [url]

# Clone a specific branch
git clone -b [branch-name] [url]

# Clone with a different directory name
git clone [url] [directory-name]
\`\`\`

### Basic Configuration

\`\`\`bash
# Set global username and email
git config --global user.name "[name]"
git config --global user.email "[email]"

# Set local username and email for current repo
git config user.name "[name]"
git config user.email "[email]"

# View configuration
git config --list
git config user.name
git config user.email
\`\`\`

## Daily Workflow Commands

### Staging and Committing

\`\`\`bash
# Add a file or changes to staging area
git add [file]

# Add all changes to staging area
git add .
git add -A

# Add all tracked files (excludes new files)
git add -u

# Commit staged changes with a message
git commit -m "[descriptive message]"

# Commit all tracked changes (skip staging)
git commit -am "[message]"

# Amend the last commit
git commit --amend
git commit --amend -m "[new message]"
\`\`\`

### Checking Status and History

\`\`\`bash
# Display the status of the working directory
git status

# Show short status
git status -s

# Display commit logs
git log

# Show compact log with one line per commit
git log --oneline

# Show log with graph visualization
git log --graph --oneline --all

# Show specific number of commits
git log -n 5
\`\`\`

## Branch Management

### Creating and Switching Branches

\`\`\`bash
# List all local branches
git branch

# List all branches (local and remote)
git branch -a

# Create a new branch
git branch [branch-name]

# Create and switch to a new branch
git checkout -b [branch-name]

# Switch to an existing branch
git checkout [branch-name]

# Switch to the previous branch
git checkout -

# Delete a local branch
git branch -d [branch-name]

# Force delete a local branch
git branch -D [branch-name]
\`\`\`

### Modern Branch Commands (Git 2.23+)

\`\`\`bash
# Switch to an existing branch
git switch [branch-name]

# Create and switch to a new branch
git switch -c [branch-name]

# Switch to the previous branch
git switch -
\`\`\`

## Remote Repository Operations

### Working with Remotes

\`\`\`bash
# List remote repositories
git remote -v

# Add a new remote repository
git remote add [name] [url]

# Remove a remote repository
git remote remove [name]

# Rename a remote
git remote rename [old-name] [new-name]

# Change remote URL
git remote set-url [name] [new-url]
\`\`\`

### Synchronizing with Remote

\`\`\`bash
# Upload local repository content to remote
git push

# Push to specific remote and branch
git push [remote] [branch]

# Push and set upstream branch
git push -u [remote] [branch]

# Push all tags
git push --tags

# Fetch changes from remote (doesn't merge)
git fetch [remote]

# Fetch and prune deleted remote branches
git fetch --prune

# Pull changes from remote and merge
git pull

# Pull with rebase instead of merge
git pull --rebase
\`\`\`

## Merging and Rebasing

### Merging Branches

\`\`\`bash
# Merge a branch into the current branch
git merge [branch]

# Merge without fast-forward
git merge --no-ff [branch]

# Abort a merge in progress
git merge --abort

# Continue merge after resolving conflicts
git merge --continue
\`\`\`

### Rebasing

\`\`\`bash
# Rebase current branch onto another branch
git rebase [branch]

# Interactive rebase for last n commits
git rebase -i HEAD~[n]

# Continue rebase after resolving conflicts
git rebase --continue

# Abort rebase and return to original state
git rebase --abort

# Skip current commit during rebase
git rebase --skip
\`\`\`

## Undoing Changes

### Working Directory and Staging

\`\`\`bash
# Discard changes in working directory
git checkout -- [file]
git restore [file]  # Git 2.23+

# Unstage a file (keep changes in working directory)
git reset [file]
git restore --staged [file]  # Git 2.23+

# Discard all changes in working directory
git checkout .
git restore .
\`\`\`

### Commit History

\`\`\`bash
# Reset to a specific commit (soft reset)
git reset --soft [commit-hash]

# Reset to a specific commit (mixed reset - default)
git reset [commit-hash]

# Reset to a specific commit (hard reset - destructive)
git reset --hard [commit-hash]

# Reset to remote branch state
git reset --hard origin/[branch-name]

# Create a new commit that undoes changes
git revert [commit-hash]

# Revert a merge commit
git revert -m 1 [merge-commit-hash]
\`\`\`

## Advanced Commands

### Stashing Changes

\`\`\`bash
# Temporarily save changes without committing
git stash

# Stash with a message
git stash save "[message]"

# List all stashes
git stash list

# Apply the most recent stash
git stash apply

# Apply a specific stash
git stash apply stash@{n}

# Apply and remove the most recent stash
git stash pop

# Drop a specific stash
git stash drop stash@{n}

# Clear all stashes
git stash clear
\`\`\`

### Cherry-picking

\`\`\`bash
# Apply a commit from another branch
git cherry-pick [commit-hash]

# Cherry-pick multiple commits
git cherry-pick [commit1] [commit2]

# Cherry-pick a range of commits
git cherry-pick [start-commit]..[end-commit]

# Cherry-pick without committing
git cherry-pick --no-commit [commit-hash]
\`\`\`

### Tagging

\`\`\`bash
# Create a lightweight tag
git tag [tag-name]

# Create an annotated tag
git tag -a [tag-name] -m "[message]"

# List all tags
git tag

# Delete a tag
git tag -d [tag-name]

# Push tags to remote
git push --tags

# Push a specific tag
git push origin [tag-name]
\`\`\`

## Inspection and Comparison

### Viewing Differences

\`\`\`bash
# Show changes between working directory and staging
git diff

# Show changes between staging and last commit
git diff --staged
git diff --cached

# Show changes between two commits
git diff [commit1] [commit2]

# Show changes for a specific file
git diff [file]

# Show changes between branches
git diff [branch1]..[branch2]
\`\`\`

### File History

\`\`\`bash
# Show commit history for a file
git log [file]

# Show changes for each commit of a file
git log -p [file]

# Show who last modified each line of a file
git blame [file]

# Show file content at a specific commit
git show [commit-hash]:[file-path]
\`\`\`

## Cleaning Up

### Removing Files

\`\`\`bash
# Remove file from working directory and staging
git rm [file]

# Remove file from staging only (keep in working directory)
git rm --cached [file]

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Preview what will be removed
git clean -n
\`\`\`

### Repository Maintenance

\`\`\`bash
# Remove remote tracking branches that no longer exist
git remote prune origin

# Garbage collection and optimization
git gc

# Verify repository integrity
git fsck

# Show repository statistics
git count-objects -v
\`\`\`

## Useful Aliases

Add these to your Git configuration for faster workflows:

\`\`\`bash
# Set up useful aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
git config --global alias.lg "log --oneline --graph --all"
\`\`\`

## Pro Tips

1. **Use .gitignore**: Always create a comprehensive .gitignore file for your project
2. **Atomic commits**: Make small, focused commits with clear messages
3. **Branch naming**: Use descriptive branch names like \`feature/user-authentication\`
4. **Commit messages**: Follow conventional commit format for better history
5. **Regular pulls**: Pull frequently to avoid large merge conflicts
6. **Backup branches**: Create backup branches before risky operations

## Emergency Commands

When things go wrong:

\`\`\`bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Completely undo last commit
git reset --hard HEAD~1

# Recover deleted commits (shows reflog)
git reflog

# Reset to a state from reflog
git reset --hard HEAD@{n}

# Create a branch from a lost commit
git branch [branch-name] [commit-hash]
\`\`\`

This cheat sheet covers the essential Git commands I use daily. Master these commands, and you'll be well-equipped to handle any Git workflow efficiently.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-06",
    readTime: 16,
    tags: ["Git", "Version Control", "Development", "Command Line", "Workflow"],
    category: "Development",
    featuredImage: blogPost2,
    featured: false
  },
  {
    id: "8",
    title: "Advanced React State Patterns: Custom Hooks for Better Code",
    slug: "advanced-react-state-patterns-custom-hooks",
    excerpt: "Explore advanced React state management patterns using custom hooks. Learn to build reusable, maintainable state logic for complex applications.",
    content: `# Advanced React State Patterns: Custom Hooks for Better Code

Custom hooks are one of React's most powerful features for creating reusable state logic. After building numerous React applications, I've developed a collection of advanced patterns that have significantly improved my code quality and development efficiency.

## The Power of Custom Hooks

Custom hooks allow us to:
- Extract component logic into reusable functions
- Share stateful logic between components
- Separate concerns and improve testability
- Create more readable and maintainable code

## Essential Custom Hook Patterns

### 1. useToggle - Simple Boolean State Management

\`\`\`typescript
import { useState, useCallback } from 'react';

interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue
  };
}

// Usage
function Modal() {
  const modal = useToggle(false);

  return (
    <div>
      <button onClick={modal.setTrue}>Open Modal</button>
      {modal.value && (
        <div className="modal">
          <h2>Modal Content</h2>
          <button onClick={modal.setFalse}>Close</button>
        </div>
      )}
    </div>
  );
}
\`\`\`

### 2. useCounter - Enhanced Counter Logic

\`\`\`typescript
interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

export function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {}
): UseCounterReturn {
  const { min = -Infinity, max = Infinity, step = 1 } = options;
  const [count, setCount] = useState(
    Math.max(min, Math.min(max, initialValue))
  );

  const increment = useCallback(() => {
    setCount(prev => Math.min(max, prev + step));
  }, [max, step]);

  const decrement = useCallback(() => {
    setCount(prev => Math.max(min, prev - step));
  }, [min, step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const set = useCallback((value: number) => {
    setCount(Math.max(min, Math.min(max, value)));
  }, [min, max]);

  return { count, increment, decrement, reset, set };
}

// Usage
function QuantitySelector() {
  const quantity = useCounter(1, { min: 1, max: 10 });

  return (
    <div className="quantity-selector">
      <button onClick={quantity.decrement}>-</button>
      <span>{quantity.count}</span>
      <button onClick={quantity.increment}>+</button>
      <button onClick={quantity.reset}>Reset</button>
    </div>
  );
}
\`\`\`

### 3. useArray - Advanced Array State Management

\`\`\`typescript
interface UseArrayReturn<T> {
  items: T[];
  add: (item: T) => void;
  remove: (index: number) => void;
  removeById: (id: string | number) => void;
  update: (index: number, item: T) => void;
  updateById: (id: string | number, item: Partial<T>) => void;
  clear: () => void;
  filter: (predicate: (item: T) => boolean) => void;
  sort: (compareFn?: (a: T, b: T) => number) => void;
  move: (fromIndex: number, toIndex: number) => void;
}

export function useArray<T extends { id?: string | number }>(
  initialArray: T[] = []
): UseArrayReturn<T> {
  const [items, setItems] = useState<T[]>(initialArray);

  const add = useCallback((item: T) => {
    setItems(prev => [...prev, item]);
  }, []);

  const remove = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const removeById = useCallback((id: string | number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const update = useCallback((index: number, newItem: T) => {
    setItems(prev => prev.map((item, i) => i === index ? newItem : item));
  }, []);

  const updateById = useCallback((id: string | number, updates: Partial<T>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const filter = useCallback((predicate: (item: T) => boolean) => {
    setItems(prev => prev.filter(predicate));
  }, []);

  const sort = useCallback((compareFn?: (a: T, b: T) => number) => {
    setItems(prev => [...prev].sort(compareFn));
  }, []);

  const move = useCallback((fromIndex: number, toIndex: number) => {
    setItems(prev => {
      const newItems = [...prev];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      return newItems;
    });
  }, []);

  return {
    items,
    add,
    remove,
    removeById,
    update,
    updateById,
    clear,
    filter,
    sort,
    move
  };
}

// Usage
function TodoList() {
  const todos = useArray([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: false }
  ]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: 'New todo',
      completed: false
    };
    todos.add(newTodo);
  };

  const toggleTodo = (id: number) => {
    const todo = todos.items.find(t => t.id === id);
    if (todo) {
      todos.updateById(id, { completed: !todo.completed });
    }
  };

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      {todos.items.map((todo, index) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => todos.remove(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### 4. useAsync - Async State Management

\`\`\`typescript
interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncReturn<T> extends UseAsyncState<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = false
): UseAsyncReturn<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async (...args: any[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await asyncFunction(...args);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
      throw error;
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, reset };
}

// Usage
async function fetchUserData(userId: string) {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

function UserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    loading,
    error,
    execute: refetchUser
  } = useAsync(() => fetchUserData(userId), true);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={refetchUser}>Refresh</button>
    </div>
  );
}
\`\`\`

### 5. useDebounce - Debounced Values

\`\`\`typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Advanced debounced callback
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const debouncedCallback = useMemo(() => {
    return debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay) as T;
  }, [delay]);

  useEffect(() => {
    return () => {
      debouncedCallback.cancel?.();
    };
  }, [debouncedCallback]);

  return debouncedCallback;
}

// Usage
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [results, setResults] = useState([]);

  // Search API call with debounced term
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(\`/api/search?q=\${debouncedSearchTerm}\`)
        .then(response => response.json())
        .then(setResults);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <div>
        {results.map(result => (
          <div key={result.id}>{result.title}</div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

### 6. useLocalStorage - Persistent State

\`\`\`typescript
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get value from localStorage on initialization
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const storageItem = window.localStorage.getItem(key);
      return storageItem ? JSON.parse(storageItem) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
}
\`\`\`

## Advanced Composition Patterns

### Combining Multiple Hooks

\`\`\`typescript
// Complex form hook combining multiple patterns
interface UseFormReturn<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  handleChange: (field: keyof T) => (value: any) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => (e: React.FormEvent) => void;
  reset: () => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: (values: T) => Record<keyof T, string>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form
  const validate = useCallback((formValues: T) => {
    if (!validationSchema) return {};
    return validationSchema(formValues);
  }, [validationSchema]);

  // Check if form is valid
  const isValid = useMemo(() => {
    const currentErrors = validate(values);
    return Object.keys(currentErrors).length === 0;
  }, [values, validate]);

  // Handle field changes
  const handleChange = useCallback((field: keyof T) => (value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  // Handle field blur
  const handleBlur = useCallback((field: keyof T) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate field on blur
    const fieldErrors = validate(values);
    if (fieldErrors[field]) {
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }, [values, validate]);

  // Handle form submission
  const handleSubmit = useCallback((onSubmit: (values: T) => Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      
      const formErrors = validate(values);
      setErrors(formErrors as Record<keyof T, string>);
      
      if (Object.keys(formErrors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    };
  }, [values, validate]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouched({} as Record<keyof T, boolean>);
    setIsSubmitting(false);
  }, [initialValues]);

  // Set individual field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  // Set individual field error
  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError
  };
}
\`\`\`

## Best Practices for Custom Hooks

1. **Start with useState and useEffect**: Build complex hooks by combining simpler ones
2. **Use useCallback and useMemo**: Optimize performance by memoizing functions and values
3. **Handle cleanup properly**: Always clean up subscriptions and timeouts
4. **Make hooks testable**: Extract logic that can be unit tested
5. **Follow naming conventions**: Always start custom hook names with "use"
6. **Keep them focused**: Each hook should have a single responsibility
7. **Provide good TypeScript types**: Make your hooks type-safe and developer-friendly

These advanced patterns have transformed how I build React applications, making my code more reusable, testable, and maintainable.`,
    author: {
      name: "Chandrashekar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-04",
    readTime: 18,
    tags: ["React", "Custom Hooks", "State Management", "TypeScript", "Advanced Patterns"],
    category: "Development",
    featuredImage: blogPost3,
    featured: false
  }
];

// Categories for filtering
export const categories = [
  "All",
  "Development",
  "Performance",
  "Best Practices",
  "Tutorial"
];

// Helper function to get featured posts
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);

// Helper function to get posts by category
export const getPostsByCategory = (category: string) => {
  if (category === "All") return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

// Helper function to search posts
export const searchPosts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.content.toLowerCase().includes(lowercaseQuery)
  );
};