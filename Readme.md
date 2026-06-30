# React + Vite

- React
- Vite
- Tanstack Router
- js
- Tanstack Query
- Redux Tooklit

```
npm create vite@latest my-shop-app -- --template react
```

```
npm install @tanstack/react-router
npm install -D @tanstack/router-plugin
```

```js
//vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [tanstackRouter(), react()],
});
```

```
src/
├── routes/
│   ├── __root.jsx
│   ├── index.jsx
│   └── about.jsx
├── main.jsx
```

```jsx
//src/routes/__root.jsx
import { Outlet, Link, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: function () {
    return (
      <div>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <hr />
        <Outlet />
      </div>
    );
  },
});
```

```jsx
//src/routes/index.jsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: function () {
    return <h1>Home Page</h1>;
  },
});
```

```jsx
//src/routes/about.jsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: function () {
    return <h1>About Page</h1>;
  },
});
```

```jsx
//src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

import "./index.css";

const router = createRouter({
  routeTree,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
```

- [TanStack Router + vite](https://tanstack.com/router/v1/docs/installation/with-vite)
- [shadcn/ui + vite](https://ui.shadcn.com/docs/installation/vite#existing-vite-project)

```
npx shadcn@latest add button
```

```jsx
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}

export default App;
```
