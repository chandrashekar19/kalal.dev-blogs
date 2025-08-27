# Advanced React State Patterns with Custom Hooks

Custom hooks let us reuse stateful logic across components, improving readability, testability, and maintainability. Here are concise patterns I use daily.

## 1. Boolean State: `useToggle`

```ts
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  return {
    value,
    toggle: () => setValue(v => !v),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
  };
}

// Usage
const modal = useToggle();
<button onClick={modal.toggle}>Toggle</button>
{modal.value && <div>Modal</div>}
2. Counter State: useCounter
ts
Copy code
function useCounter(initial = 0, { min = -Infinity, max = Infinity, step = 1 } = {}) {
  const [count, set] = useState(initial);
  return {
    count,
    increment: () => set(c => Math.min(max, c + step)),
    decrement: () => set(c => Math.max(min, c - step)),
    reset: () => set(initial),
  };
}

// Usage
const qty = useCounter(1, { min: 1, max: 5 });
3. Array State: useArray
ts
Copy code
function useArray<T>(initial: T[] = []) {
  const [items, set] = useState(initial);
  return {
    items,
    add: (item: T) => set(arr => [...arr, item]),
    remove: (i: number) => set(arr => arr.filter((_, idx) => idx !== i)),
    update: (i: number, val: T) => set(arr => arr.map((x, idx) => idx === i ? val : x)),
    clear: () => set([]),
  };
}

// Usage
const todos = useArray([{ id: 1, text: "Learn React" }]);
4. Async State: useAsync
ts
Copy code
function useAsync<T>(fn: () => Promise<T>, immediate = false) {
  const [state, set] = useState({ data: null, loading: false, error: null });
  const execute = async () => {
    set({ data: null, loading: true, error: null });
    try {
      const data = await fn();
      set({ data, loading: false, error: null });
    } catch (e) {
      set({ data: null, loading: false, error: e });
    }
  };
  useEffect(() => { if (immediate) execute(); }, []);
  return { ...state, execute };
}
5. Debounced Value: useDebounce
ts
Copy code
function useDebounce<T>(value: T, delay: number) {
  const [debounced, set] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => set(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
6. Persistent State: useLocalStorage
ts
Copy code
function useLocalStorage<T>(key: string, init: T): [T, (v: T) => void] {
  const [val, setVal] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : init;
  });
  const set = (v: T) => {
    setVal(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  return [val, set];
}
Best Practices
Start simple with useState & useEffect

Use useCallback/useMemo for performance

Clean up side effects

Keep hooks focused on one concern

Always prefix with use and provide strong types

Custom hooks let you compose complex state from simple, testable units — making your React apps cleaner and easier to maintain
```
