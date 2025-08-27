# Building Scalable Web Experiences with AEM and React: A Complete Integration Guide

Adobe Experience Manager (AEM) combined with React creates a powerful foundation for building enterprise-scale web applications. After working on several AEM + React projects, I want to share the integration patterns and best practices I've learned.

## Why AEM + React?

The combination of AEM's robust content management capabilities with React's component-based architecture offers:

- **Content-Driven Development**: Marketers can manage content without developer intervention
- **Component Reusability**: React components can be mapped to AEM components
- **SEO-Friendly**: Server-side rendering with AEM's built-in SEO capabilities
- **Scalable Architecture**: Both technologies scale well for enterprise needs

## Setting Up AEM with React

### 1. AEM React Editable Components

```javascript
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

 2. Content Fragment Integration .


 import { useEffect, useState } from 'react';

function useContentFragment(path) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/content/dam/${path}.model.json`);
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

3. GraphQl Integration:


import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_ARTICLES = gql`
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
`;

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

3. Context Aware Components:

import { useContext, useEffect, useState, createContext } from 'react';
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
2. Multi-Site Management
function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    const siteName = window.location.hostname;
    fetch(`/etc/acs-commons/site-config/${siteName}.json`)
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
    <div className={`site-${siteConfig.theme}`}>
      <header>
        <img src={siteConfig.logo} alt={siteConfig.siteName} />
        <nav>{/* Dynamic navigation based on site config */}</nav>
      </header>
      <main>{children}</main>
      <footer>{/* Site-specific footer */}</footer>
    </div>
  );
}

Performance Optimization
1. Code Splitting by AEM Components
import { lazy, Suspense } from 'react';

const ComponentMap = {
  'mysite/components/hero': lazy(() => import('./HeroComponent')),
  'mysite/components/carousel': lazy(() => import('./CarouselComponent')),
  'mysite/components/form': lazy(() => import('./FormComponent'))
};

function DynamicComponent({ resourceType, ...props }) {
  const Component = ComponentMap[resourceType];

  if (!Component) {
    console.warn(`Component not found: ${resourceType}`);
    return null;
  }

  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <Component {...props} />
    </Suspense>
  );
}

2. Caching Strategies
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

Deployment Best Practices

Environment Configuration: Use AEM's runmode system to manage different environments

Build Optimization: Leverage AEM's client library system for production builds

CDN Integration: Configure AEM Dispatcher with CDN for optimal content delivery

Monitoring: Implement proper logging and monitoring for both AEM and React layers

Key Takeaways

Start with AEM's SPA editor for quick prototyping

Use Content Fragments for structured content

Implement proper error boundaries for component failures

Leverage AEM's caching mechanisms alongside React optimizations

Plan your component mapping strategy early in the project

The AEM + React combination provides a robust foundation for enterprise web applications, offering both developer productivity and content author flexibility.
```
