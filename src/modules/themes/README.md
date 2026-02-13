# Theme Module

Self-contained, portable theme management system following the platform's plugin architecture.

## Installation in a New Project

1. **Copy the module directory** — `src/modules/themes/` — into your target project.
2. **Copy the kernel files** — `src/modules/registry.ts`, `src/modules/types.ts`, and `src/modules/index.ts`.
3. **Import the module** in your barrel: add `import './themes';` to `src/modules/index.ts`.
4. **Create the database tables** — Run the SQL in `schema.sql` against your Supabase project.
5. **Install dependencies** — `zod`, `@supabase/supabase-js`, `lucide-react`, `react-router-dom`.

## Directory Structure

```
src/modules/themes/
├── index.ts           # Module registration + barrel exports
├── types.ts           # All theme config interfaces (zero deps)
├── schemas.ts         # Zod validation for all 14 JSONB columns
├── service.ts         # ThemeDbClient DI interface + Supabase default
├── components/        # Admin UI (editor, panels, list, canvas)
├── hooks/             # useTheme (runtime), useThemeAdmin (admin)
└── lib/               # themeConfig (static), themePublisher (pipeline)
```

## Architecture

- **Types** (`types.ts`) — Single source of truth for all interfaces
- **Schemas** (`schemas.ts`) — Zod validation with safe defaults for all JSONB
- **Service** (`service.ts`) — DI layer; swap `supabaseThemeClient` with any implementation
- **Publisher** (`lib/themePublisher.ts`) — Generic `ThemePublisher` interface for deployment targets

## Swapping the Data Layer

```ts
import type { ThemeDbClient } from './service';

const myClient: ThemeDbClient = {
  listThemes: () => fetch('/api/themes').then(r => r.json()),
  // ... implement all methods
};
```

Pass your custom client to `useThemeAdmin` or use the default Supabase implementation.

## Database Schema

The module requires these tables:
- `site_themes` — Main theme storage (14 JSONB columns)
- `published_theme_configs` — Versioned publish snapshots
- `page_theme_assignments` — Route-to-theme mappings
- `logo_versions` — Logo configuration versions

See `schema.sql` for the complete DDL.
