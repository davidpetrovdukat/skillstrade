# Skills-Trade

A decentralized freelance platform connecting clients with top-tier creative talent. Built with a brutalist aesthetic and modern tech stack.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL (Supabase/Neon) via Prisma ORM
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Set up environment variables**:
    Copy `.env.example` to `.env` and fill in your database credentials.

3.  **Database Setup**:
    ```bash
    npx prisma generate
    npx prisma db push
    npx prisma db seed
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app`: App Router pages and layouts
- `/src/components`: UI components (features, layout, ui-kit)
- `/src/lib`: Utilities and constants
- `/src/store`: Zustand state stores
- `/prisma`: Database schema and seed scripts
