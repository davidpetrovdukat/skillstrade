---
name: feature-creator
description: Create a vertical feature slice (Server Action, Zustand Store, Component) following project architecture. Use when the user asks to "create a new feature", "add a X feature", or "scaffold a component with logic".
---

# Feature Creator

This skill automates the creation of a new feature following the strict Layer-based architecture of the project defined in `GEMINI.md`.

## Usage Process

1.  **Identify Feature Scope**: Determine the Feature Name (PascalCase, e.g., `JobApplication`) and what layers are needed (UI, Store, Action, Database).
2.  **Verify Prerequisites**: Check if `prisma.schema` needs updates first. If so, create a plan to update schema before generating code.
3.  **Scaffold Files**: Create the necessary files using the templates below.

## File Structure Rules

For a feature named `[FeatureName]`:

-   **Server Actions**: `src/actions/[featureName].ts` (camelCase filename)
-   **Zustand Store**: `src/store/use[FeatureName]Store.ts` (camelCase filename, hook style)
-   **UI Component**: `src/components/[FeatureName]/index.tsx` (PascalCase directory) OR `src/components/[FeatureName].tsx` if simple.

## Templates

### 1. Server Action (`src/actions/[featureName].ts`)

Use for ALL database mutations.

```typescript
'use server'

import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Define Schema immediately (Zod)
const [featureName]Schema = z.object({
  // define fields
})

export type [FeatureName]Input = z.infer<typeof [featureName]Schema>

export async function [actionName](data: [FeatureName]Input) {
  const result = [featureName]Schema.safeParse(data)
  
  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors }
  }

  try {
    // const record = await prisma.[model].create({ data: result.data })
    
    revalidatePath('/[relevant-path]')
    return { success: true, data: 'record' }
  } catch (error) {
    console.error('[FeatureName] Error:', error)
    return { success: false, error: 'Failed to perform action' }
  }
}
```

### 2. Zustand Store (`src/store/use[FeatureName]Store.ts`)

Use for complex client-side state (modals, multi-step forms).

```typescript
import { create } from 'zustand'

interface [FeatureName]State {
  isOpen: boolean
  // data: Type | null
  setIsOpen: (value: boolean) => void
}

export const use[FeatureName]Store = create<[FeatureName]State>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}))
```

### 3. UI Component (`src/components/[FeatureName]/index.tsx`)

Use `client` components only when interactivity is needed.

```tsx
'use client'

import { use[FeatureName]Store } from '@/store/use[FeatureName]Store'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface [FeatureName]Props {
  className?: string
}

export const [FeatureName] = ({ className }: [FeatureName]Props) => {
  const { isOpen, setIsOpen } = use[FeatureName]Store()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-6 border border-white/10 bg-surface",
        className
      )}
    >
      <h2 className="text-xl font-heading font-bold text-primary mb-4">
        Feature Title
      </h2>
      {/* Content */}
    </motion.div>
  )
}
```
