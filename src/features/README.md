# Feature Domains Directory (`src/features`)

This directory contains domain-driven feature modules. Each feature encapsulates its own components, hooks, stores, services, utilities, and types.

## Structure per Feature:

```text
src/features/<feature-name>/
├── components/   # UI components specific to this feature
├── hooks/        # React hooks specific to this feature
├── lib/          # Helper utilities specific to this feature
├── store/        # Zustand stores specific to this feature
├── services/     # Business logic, API calls, server actions
└── types/        # TypeScript interfaces & type definitions for this feature
```

## 🛠️ How to Remove the Starter Demo & Add Your Own Feature

All starter demo components, Zustand store state, and types are encapsulated inside `src/features/starter/`.

1. **Create your new feature folder**:
   ```bash
   mkdir -p src/features/my-feature/components src/features/my-feature/store src/features/my-feature/types
   ```
2. **Remove the starter demo**:
   ```bash
   rm -rf src/features/starter
   ```
3. **Update `src/app/page.tsx`** to render your new feature component instead of `<StarterDashboard />`.
