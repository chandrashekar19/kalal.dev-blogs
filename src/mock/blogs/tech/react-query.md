# Mastering React Query v5: Advanced Patterns for Modern Apps

React Query (now TanStack Query) has become the gold standard for server state management in React applications. With v5's recent release, there are some game-changing features that have transformed how I handle data fetching.

## Why React Query v5 Matters

After working with various state management solutions, React Query stands out for its:

- **Intelligent Caching**: Automatic background refetching and stale-while-revalidate patterns
- **Optimistic Updates**: Update UI immediately while syncing with server
- **Infinite Queries**: Perfect for pagination and infinite scrolling
- **DevTools**: Incredible debugging experience

## Advanced Query Patterns

### 1. Dependent Queries with Enabled Option

```tsx
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
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### 2. Infinite Queries for Pagination

```tsx
function InfinitePostsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
    });

  return (
    <div>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.posts.map((post) => (
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
```

### 3. Optimistic Updates

```tsx
function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (old: any) => [
        { ...newPost, id: Date.now(), pending: true },
        ...old,
      ]);

      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

## Performance Tips I've Learned

1. **Use Stale Time Wisely** – Set appropriate stale times to reduce unnecessary requests
2. **Query Key Structure** – Design hierarchical query keys for efficient invalidation
3. **Select Option** – Use the `select` option to transform data and prevent unnecessary rerenders
4. **Prefetching** – Prefetch data on hover or route changes for instant UX

---

React Query v5 has made my applications faster, more reliable, and significantly easier to debug. It's an essential tool for any serious React developer.
