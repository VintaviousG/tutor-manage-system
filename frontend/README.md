# Tutor Management System

A simple web application to manage tutoring operations, built with Next.js, Supabase, and Tailwind CSS.

## Features
- **Roles**: Separate dashboards for Students, Tutors, and Admins.
- **Admin Management**: Easily manage users and schedules (CRUD operations).
- **Authentication**: Secure login and sign-up using Supabase Auth.

## Tech Stack
- Next.js (App Router)
- Supabase (Database & Authentication)
- Tailwind CSS & Shadcn UI
- Vitest (Testing)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/VintaviousG/tutor-manage-system>
   cd tutor-manage-system/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the App:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.
