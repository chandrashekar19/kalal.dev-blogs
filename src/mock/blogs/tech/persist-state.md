# Persisting React State Across Page Refreshes: localStorage Patterns

Refreshing a page shouldn’t mean losing all your progress. Yet in React, that’s exactly what happens by default — your state resets every time.

In this guide, we’ll explore **practical ways to persist state with `localStorage`**, from simple patterns to reusable hooks, so your apps feel smoother and more reliable.

---

## 🛑 The Problem with Default React State

React state lives in memory. Once the tab reloads, everything’s gone — whether that’s:

- 🛒 A shopping cart
- ✍️ A half-filled form
- ⚙️ User preferences

Users expect these things to **stick around**. That’s where `localStorage` helps.

---

## ✅ Basic localStorage Integration

Let’s start small: persisting a shopping cart.

```javascript
import { useState, useEffect } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => setCart(prev => [...prev, product]);
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  return (
    <div>
      {cart.map(item => (
        <CartItem key={item.id} item={item} onRemove={() => removeFromCart(item.id)} />
      ))}
      <button onClick={() => addToCart(newProduct)}>Add Product</button>
    </div>
  );
}

✔️ This works — but every time you need persistence, you’ll repeat logic. Let’s improve that.

🔧 Custom Hook: usePersistState

A hook that makes state persistence plug-and-play.

import { useState, useEffect, useMemo } from 'react';

export function usePersistState<T>(initialValue: T, key: string) {
  const _initialValue = useMemo(() => {
    try {
      const saved = localStorage.getItem(`state:${key}`);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  }, [initialValue, key]);

  const [state, setState] = useState<T>(_initialValue);

  useEffect(() => {
    try {
      localStorage.setItem(`state:${key}`, JSON.stringify(state));
    } catch {}
  }, [state, key]);

  return [state, setState] as const;
}

Example 1: Persistent Counter
function PersistentCounter() {
  const [count, setCount] = usePersistState(0, 'counter');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

 Auto-Saving Form
function ContactForm() {
  const [form, setForm] = usePersistState({ name: '', email: '', message: '' }, 'contact-form');

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const submit = (e) => {
    e.preventDefault();
    sendForm(form);
    setForm({ name: '', email: '', message: '' }); // reset
  };

  return (
    <form onSubmit={submit}>
      <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Name" />
      <input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email" />
      <textarea value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Message" />
      <button type="submit">Send</button>
    </form>
  );
}

🚀 Advanced Patterns
1. Reducer with Persistence

For complex state (like carts), combine useReducer + localStorage.

function usePersistedReducer(reducer, initialState, key) {
  const getInitial = () => {
    const saved = localStorage.getItem(`reducer:${key}`);
    return saved ? JSON.parse(saved) : initialState;
  };

  const [state, dispatch] = useReducer(reducer, getInitial());

  useEffect(() => {
    localStorage.setItem(`reducer:${key}`, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}


👉 This is cleaner than juggling multiple useStates.

2. State with Expiry

Sometimes persistence should be temporary (e.g. a theme setting).

function usePersistedStateWithExpiry<T>(initialValue: T, key: string, expiryTime?: number) {
  const getStored = () => {
    const saved = localStorage.getItem(`expiry:${key}`);
    if (!saved) return initialValue;

    const parsed = JSON.parse(saved);
    if (parsed.expiry && Date.now() > parsed.expiry) {
      localStorage.removeItem(`expiry:${key}`);
      return initialValue;
    }
    return parsed.value;
  };

  const [state, setState] = useState<T>(getStored);

  const setPersisted = (value: T) => {
    setState(value);
    localStorage.setItem(`expiry:${key}`, JSON.stringify({
      value,
      expiry: expiryTime ? Date.now() + expiryTime : undefined
    }));
  };

  return [state, setPersisted] as const;
}

📌 Best Practices

Always use try/catch → localStorage can fail (e.g. private browsing).

Debounce writes → prevents performance issues if state changes rapidly.

Handle migrations → if your schema changes, migrate old data gracefully.

💡 Takeaway

Persisting state with localStorage:

Improves UX (no lost data on refresh)

Is simple to implement with custom hooks

Scales from counters → forms → reducers → expiring sessions

By wrapping persistence in reusable hooks, you save boilerplate and make your app more resilient.
```
