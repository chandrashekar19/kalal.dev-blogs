
import { BlogPost } from '@/types/blog-post';
import reactServerComponents from "./tech/react-server.md?raw";
import reactQueryV5 from "./tech/react-query.md?raw";
import CustomHooks from "./tech/custom-hooks.md?raw";
import AemGuide from "./tech/aem-guide.md?raw";
import GitCommands from "./tech/git-commands.md?raw";
import npmPublish from "./tech/npm-publish.md?raw";
import jsAZ from "./tech/js-a-z.md?raw";
import  TypeSafe from "./tech/type-safe.md?raw";
import PersistState from "./tech/persist-state.md?raw";

// Mock data simulating AEM Content Fragments for blog posts

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "React Server Components: The Future of Full-Stack Development",
    slug: "react-server-components-future-fullstack-development",
    excerpt: "Dive deep into React Server Components and how they're revolutionizing the way we build modern web applications. Learn the patterns, performance benefits, and implementation strategies.",
    content: reactServerComponents,
    author: {
      name: "Chandrashekar",
      avatar: "/profile.jpg",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-20",
    readTime: 12,
    tags: ["React", "Server Components", "Next.js", "Performance", "Full-Stack"],
    category: "Development",
    featuredImage: "react-server.png",
    featured: true
  },
  {
    id: "2",
    title: "Mastering React Query v5: Advanced Patterns for Modern Apps",
    slug: "mastering-react-query-v5-advanced-patterns",
    excerpt: "Explore the latest React Query v5 features including infinite queries, optimistic updates, and advanced caching strategies that every React developer should know.",
    content: reactQueryV5,
    author: {
      name: "Chandrashekar",
      avatar: "/profile.jpg",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-18",
    readTime: 10,
    tags: ["React Query", "TanStack", "Data Fetching", "Performance", "State Management"],
    category: "Development",
    featuredImage: "/react-query.png",
    featured: true
  },
  {
    id: "3",
    title: "Building Type-Safe React Apps with TypeScript 5.0",
    slug: "building-type-safe-react-apps-typescript-5",
    excerpt: "Leverage TypeScript 5.0's new features like const assertions, template literal types, and advanced generics to build bulletproof React applications.",
    content: TypeSafe,
    author: {
      name: "Chandrashekar",
       avatar: "/profile.jpg",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-15",
    readTime: 11,
    tags: ["TypeScript", "React", "Type Safety", "Generics", "Development"],
    category: "Development",
    featuredImage: "/ts.jpg",
    featured: false
  },
  {
    id: "4",
    title: "JavaScript A-Z: Complete Developer's Reference Guide",
    slug: "react-18-concurrent-features-practical-guide",
    excerpt: "A comprehensive A-Z guide covering essential JavaScript concepts, APIs, and terminologies that every developer should know in 2024.",
    content: jsAZ,
    author: {
      name: "Chandrashekar",
       avatar: "/profile.jpg",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-12",
    readTime: 15,
    tags: ["JavaScript", "Programming", "Web Development", "Reference", "ES6"],
    category: "Development",
    featuredImage: "a-to-z.jpg",
    featured: false
  },
  {
    id: "5",
    title: "Building Scalable Web Experiences with AEM and React: A Complete Integration Guide",
    slug: "building-scalable-web-aem-react-integration",
    excerpt: "Learn how to integrate Adobe Experience Manager with React to build powerful, content-driven web applications. From setup to deployment strategies.",
    content: AemGuide,
    author: {
      name: "Chandrashekar",
       avatar: "./profile.jpg",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-10",
    readTime: 14,
    tags: ["AEM", "React", "Adobe Experience Manager", "Integration", "Enterprise"],
    category: "Development",
    featuredImage: "/aem.png",
    featured: true
  },
  {
    id: "6",
    title: "Persisting React State Across Page Refreshes: localStorage Patterns",
    slug: "react-state-persistence-localstorage-patterns",
    excerpt: "Master state persistence in React applications using localStorage. Learn custom hooks, best practices, and advanced patterns for maintaining state across sessions.",
    content: PersistState,
    author: {
      name: "Chandrashekar",
       avatar: "./profile.jpg",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-08",
    readTime: 13,
    tags: ["React", "localStorage", "State Management", "Hooks", "Persistence"],
    category: "Development",
    featuredImage: "/react-persist.jpg",
    featured: false
  },
  {
    id: "7",
    title: "Essential Git Commands Cheat Sheet for Developers",
    slug: "essential-git-commands-cheat-sheet-developers",
    excerpt: "A comprehensive reference guide to Git commands every developer needs to know. From basic workflows to advanced techniques for professional development.",
    content: GitCommands,
    author: {
      name: "Chandrashekar",
       avatar: "/profile.jpg",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-06",
    readTime: 16,
    tags: ["Git", "Version Control", "Development", "Command Line", "Workflow"],
    category: "Development",
    featuredImage: "/git.png",
    featured: false
  },
  {
    id: "8",
    title: "Advanced React State Patterns: Custom Hooks for Better Code",
    slug: "advanced-react-state-patterns-custom-hooks",
    excerpt: "Explore advanced React state management patterns using custom hooks. Learn to build reusable, maintainable state logic for complex applications.",
    content: CustomHooks,
    author: {
      name: "Chandrashekar",
       avatar: "/profile.jpg",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-04",
    readTime: 18,
    tags: ["React", "Custom Hooks", "State Management", "TypeScript", "Advanced Patterns"],
    category: "Development",
    featuredImage: "/custom-hooks.png",
    featured: false
  },
  {
    id: "9",
    title: "Publishing Your First NPM Package: A Step-by-Step Guide",
    slug: "publishing-your-first-npm-package-step-by-step",
    excerpt: "Learn how to create, publish, and maintain your first NPM package. This guide covers everything from setup to best practices for open-source contributions.",
    content: npmPublish,
    author: {
      name: "Chandrashekar",
       avatar: "/profile.jpg",
      bio: "React Developer with 3+ years experience, passionate about modern web technologies and performance optimization"
    },
    publishedDate: "2024-01-02",
    readTime: 9,
    tags: ["NPM", "JavaScript", "Open Source", "Package Publishing", "Development"],
    category: "Development",
    featuredImage: "/npm.jpg",
    featured: false

  }
];

