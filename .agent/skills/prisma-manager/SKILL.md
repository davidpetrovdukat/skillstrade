---
name: prisma-manager
description: Manage Prisma schema changes safely and efficiently. Use when the user asks to "add a field to the user table", "create a new model", or "update the database".
---

# Prisma Manager

This skill ensures safe and consistent database schema updates using Prisma ORM.

## Workflow

1.  **Edit Schema**: Modify `prisma/schema.prisma`.
2.  **Generate Migration**: Create a SQL migration file to track changes.
    -   Command: `npx prisma migrate dev --name <descriptive_name>`
3.  **Generate Client**: Update the TypeScript client to reflect schema changes.
    -   Command: `npx prisma generate`
4.  **Verify**: Check if the client updates are visible in code (VS Code intellisense).

## Safety Rules

-   **Never** use `db push` in production-like environments or when history matters. Always use `migrate dev`.
-   **Review SQL**: Before confirming a migration, briefly review the SQL if it involves data deletion (e.g., dropping columns).
-   **Enums**: When adding enums, ensure they are compatible with the database.

## Common Snippets

### Adding a Model

```prisma
model [ModelName] {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations and Fields
}
```

### Adding a Relation (One-to-Many)

```prisma
model User {
  id    String @id
  posts Post[]
}

model Post {
  id       String @id
  authorId String
  author   User   @relation(fields: [authorId], references: [id])
}
```
