## Tiny React Carousel

A `0.6kb` simple carousel headless component

demo: https://tiny-carousel.vercel.app/

### Quick Start

```sh
npm install @infinitex/tiny-carousel
```

### Usage

```tsx
import { useCarousel } from '@infinitex/tiny-carousel';

export default function() {
  const { element, index, onNext, onPrev, jump } = useCarousel({
    width: 250,
    children: [1, 2, 3].map(i => <div key={i} className="item" />),
  });

  return element;
}
```

### Options

```ts
interface CarouselOptions {
  width: number;                   // Carousel Container Width
  transition: number;              // Custom slide transition. eg: "200ms ease"
  children: React.ReactNode[];     // Carousel Item List
}

interface CarouselReturn {
  onNext: (step?: number) => void; // Trigger next
  onPrev: (step?: number) => void; // Trigger previous
  jump: (index: number) => void;   // Jump to target index
  index: number;                   // Current index
  element: JSX.Element;            // Carousel JSX Element
}
```

#### Todo List

- [ ] add drag gesture support
- [ ] add custom props support