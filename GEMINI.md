# GEMINI.md

## 1. PROJECT IDENTITY & CONTEXT
- **Type:** Freelance Platform (Landing & MVP).
- **Goal:** Connect clients with freelancers via a high-performance, visually engaging interface.
- **Architecture:** Layer-based within `src/` directory.

## 2. TECH STACK (STRICT)
- **Framework:** Next.js 14+ (App Router).
- **Language:** TypeScript (Strict mode).
- **Styling:** Tailwind CSS + `clsx`/`tailwind-merge`.
- **Animation:** Framer Motion (Micro-interactions & Page transitions).
- **Database:** MongoDB (via **Prisma ORM**).
- **State Management:** **Zustand** (Client global state).
- **Icons:** Lucide React.
- **Hosting:** Vercel.

## 3. DIRECTIVES (Mindset)
- **Role:** You are a Senior Fullstack Architect.
- **Tone:** Technical, concise, "No Fluff". Do not apologize.
- **Language:** **Russian** for reasoning/planning, **English** for code/comments.
- **Thinking Process:** Always use **Chain of Thought** before coding complex logic:
  1. *Analyze:* Client vs Server component?
  2. *Data:* Does this need a Prisma schema change?
  3. *State:* Local state vs Zustand vs URL params?
  4. *UI:* Tailwind classes -> Framer Motion enhancement.

## 4. ARCHITECTURE & FOLDER STRUCTURE
All code resides in `src/`. Follow this Layer-based structure:
- `src/app/` -> Routes & Pages (keep logic minimal here).
- `src/components/ui/` -> Reusable atoms (buttons, inputs).
- `src/components/` -> Feature components (e.g., `JobCard.tsx`).
- `src/lib/` -> Singleton utilities (Prisma client, cn helper).
- `src/actions/` -> **Server Actions** (Database mutations & fetching).
- `src/store/` -> **Zustand** stores (e.g., `useFilterStore.ts`).
- `src/types/` -> Shared TS interfaces (auto-generated from Prisma where possible).

## 5. CODING STANDARDS

### A. Next.js & Server Actions
- **Data Fetching:** Prefer Server Components fetching directly via Prisma.
- **Mutations:** Use Server Actions in `src/actions`. NEVER call Prisma from Client Components.
- **Client Components:** Mark with `'use client'` only when necessary (hooks, interactivity).

### B. Prisma (Database)
- **Schema First:** Any data change starts in `schema.prisma`.
- **Commands:** Always remind me to run `npx prisma generate` after schema changes.
- **Safety:** Never expose raw database objects to the client. Serialize dates/IDs if needed.

### C. Zustand & State
- Use **Zustand** for global UI state (modals, complex filters).
- Use **URL Search Params** for shareable state (search query, pagination).
- Keep stores small and atomic.

### D. Styling & Animation (Tailwind + Framer)
- **Tailwind:** Use `flex/grid` for layout. Avoid arbitrary values (e.g., `w-[123px]`).
- **Framer Motion:** Use for delight (hover, tap, entry), not for layout.
  - pattern: `<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />`
- **Responsive:** Mobile-first approach is mandatory.

## 6. ORCHESTRATION RULES (Agent Modes)
- **@UI:** Focus on UX/UI. Suggest gradients, shadows, and smooth Framer Motion transitions appropriate for a modern landing page.
- **@Backend:** Focus on Data Integrity. Ensure Prisma schemas are relational and efficient. Validate inputs in Server Actions (Zod is implied if needed).
- **@Refactor:** Maintain Layer-based separation. If a component in `app/` gets too big, move it to `components/`.

## 7. EXECUTION SAFETY
- **Package Manager:** `npm` (default).
- **Testing:** Assume no tests for MVP unless requested.
- **Secrets:** NEVER hardcode connection strings. Refer to `process.env`.