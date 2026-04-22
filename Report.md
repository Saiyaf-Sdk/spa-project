# Mini Project Report - Lumen Cart SPA

## 1. Implemented Features

- Product listing from DummyJSON API (`/products`)
- Search, category filtering, and sort controls
- Dynamic product detail routing (`/product/:id`)
- Auth simulation with `/auth/login`
- Token persistence and logout flow
- Global cart with Pinia and `localStorage` persistence
- Dark mode toggle with persistent preference
- Fully responsive layout using Tailwind utility classes

## 2. Component Hierarchy

- `App.vue`
- `components/layout/AppHeader.vue`
- `views/HomeView.vue`
- `components/home/HeroSection.vue`
- `components/products/FilterBar.vue`
- `components/products/ProductGrid.vue`
- `components/products/ProductCard.vue`
- `views/ProductDetailView.vue`
- `views/CartView.vue`
- `views/LoginView.vue`
- `components/layout/AppFooter.vue`

## 3. Architectural Notes

- **Routing**: Vue Router manages SPA navigation with dynamic route params.
- **State**: Pinia stores separate concerns:
  - `auth` store handles login/logout and token persistence.
  - `cart` store handles cart items, quantity updates, and persisted state.
- **Data Layer**: `src/lib/dummyJsonApi.ts` centralizes typed API requests.
- **Typing**: Interfaces are defined in `src/types/` and reused across components/stores.
- **UI**: Tailwind utility classes with custom theme tokens and responsive breakpoints.

## 4. How to Run

```bash
npm install
npm run dev
```

## 5. Optional Improvements

- Add unit tests for stores and composables.
- Add toast notifications for add/remove cart actions.
- Add skeleton loaders for product detail review section.

