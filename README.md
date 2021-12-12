# ContextOver - a simple context provider

- based on React Context & jamiebuilds/unstated-next

- offers a context over a hook contained logic & values

</br>

## Install

`npm install --save contextover`
</br>

## Example

### Create context over hook

```typescript
const useCount = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  const incrementCount = () => setCount((currentCount) => currentCount + 1);

  return { count, incrementCount };
};

const useCountContext = createContextOver(useCount);
```

</br>

### Provide & Consume context

```typescript
const Counter = () => {
    const { count, incrementCount } = useCountContext.useContext(initialCount);

    return <div onClick={incrementCount}>Count: {count}</div>

}

const App = () => (
    <useCountContext.ProvideContext initialCount={0}>
      <Counter initialCount={0}>
    </useCountContext.ProvideContext>
)
```
