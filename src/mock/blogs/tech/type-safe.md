# Building Type-Safe React Apps with TypeScript 5.0

TypeScript has become indispensable in my React development workflow. With TypeScript 5.0's new features, we can write even more robust and maintainable code. Here are some practical patterns I use daily.

## Advanced Patterns for React + TypeScript

### 1. Generic Components

```tsx
interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps<T extends SelectOption> {
  options: T[];
  value: T['value'];
  onChange: (value: T['value']) => void;
}

function Select<T extends SelectOption>({
  options,
  value,
  onChange,
}: SelectProps<T>) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
```

### 2. Template Literal Types for APIs

```tsx
type HttpMethod = 'GET' | 'POST';
type ApiEndpoint = '/users' | '/posts';

type ApiUrl<M extends HttpMethod, E extends ApiEndpoint> = M extends 'GET'
  ? `${E}` | `${E}/${string}`
  : `${E}`;

async function apiCall<M extends HttpMethod, E extends ApiEndpoint>(
  method: M,
  endpoint: ApiUrl<M, E>,
  data?: M extends 'POST' ? Record<string, any> : never,
) {
  return fetch(endpoint, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  });
}

// ✅ apiCall('GET', '/users/123');
// ❌ apiCall('GET', '/users', { name: 'John' });
```

### 3. Discriminated Unions for Variants

```tsx
type ButtonVariant =
  | { variant: 'primary' }
  | { variant: 'secondary' }
  | { variant: 'custom'; color: string };

interface ButtonProps extends ButtonVariant {
  children: React.ReactNode;
}

function Button({ variant, color, children }: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-blue-500'
      : variant === 'secondary'
      ? 'bg-gray-500'
      : `bg-[${color}]`;

  return <button className={styles}>{children}</button>;
}

// ✅ <Button variant="custom" color="#ff0000">Delete</Button>
// ❌ <Button variant="primary" color="#ff0000">Invalid</Button>
```

### 4. Type-Safe Forms

```tsx
interface FormData {
  email: string;
  password: string;
}

function useForm<T extends Record<string, any>>(initial: T) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const updateValue = <K extends keyof T>(key: K, value: T[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  return { values, errors, updateValue };
}

function SignUpForm() {
  const { values, errors, updateValue } = useForm<FormData>({
    email: '',
    password: '',
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
```

## TypeScript 5.0 Features I Use Most

1. **Const Assertions** – for precise inference
2. **Satisfies Operator** – validate shapes without widening
3. **Template Literal Types** – powerful dynamic string types
4. **Conditional Types** – type-level logic

---

These patterns make React apps safer, easier to scale, and help catch bugs before runtime.
