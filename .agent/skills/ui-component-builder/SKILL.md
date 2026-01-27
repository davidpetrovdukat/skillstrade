---
name: ui-component-builder
description: Guide for building UI components that strictly adhere to the project's Design System (Acid Lime, Sharp Edges, Glassmorphism). Use when creating or styling components to ensure visual consistency.
---

# UI Component Builder

This skill provides the rules and patterns for building UI components that match the specific "Cyber/Industrial" aesthetic of the project.

## Core Design Rules

1.  **Sharp Edges**: ALWAYS use `rounded-none`. No rounded corners.
2.  **Colors**:
    -   Primary Accent: `text-[#D4FF00]` or `bg-[#D4FF00]` (Acid Lime).
    -   Backgrounds: Deep Charcoal (`#0A0A0A`) or Surface (`#171717`).
    -   Borders: Subtle white borders `border-white/10`.
3.  **Glassmorphism**: Use `backdrop-blur-md bg-white/5` for overlays and cards.
4.  **Typography**:
    -   Headings: `font-heading` (Space Grotesk), Uppercase often used for labels.
    -   Body: `font-sans` (Inter).

## Component Patterns

### 1. The "Card" (Standard Container)

```tsx
<div className="border border-white/10 bg-[#171717] p-6 w-full">
  {/* Content */}
</div>
```

### 2. The "Button" (Primary)

```tsx
<button className={cn(
  "bg-[#D4FF00] text-black font-bold uppercase tracking-wide",
  "px-6 py-3 hover:bg-[#B8E600] transition-colors duration-200",
  "flex items-center justify-center gap-2"
)}>
  <span>Label</span>
  <Icon className="w-5 h-5" />
</button>
```

### 3. The "Input" (Minimalist)

```tsx
<div className="relative group">
  <input 
    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#D4FF00] transition-colors"
    placeholder=" " 
  />
  <label className="absolute left-0 top-3 text-white/50 group-focus-within:-top-3 group-focus-within:text-xs group-focus-within:text-[#D4FF00] transition-all">
    Input Label
  </label>
</div>
```

## Animation (Framer Motion)

Use for micro-interactions, NOT layout.

```tsx
// Hover effect for cards
<motion.div 
  whileHover={{ y: -2, borderColor: "rgba(212, 255, 0, 0.5)" }}
  className="border border-white/10..."
>
```

```tsx
// Entry animation
<motion.div
  initial={{ opacity: 0, filter: 'blur(10px)' }}
  animate={{ opacity: 1, filter: 'blur(0px)' }}
  transition={{ duration: 0.5 }}
>
```
