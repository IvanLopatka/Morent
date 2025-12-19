# Morent - Car Rental Platform

Morent is a modern, responsive car rental web application built with Next.js 15, TypeScript, and Tailwind CSS. It provides a seamless user experience for browsing, comparing, and renting vehicles.

## 🚀 Features

-   **Car Catalog**: Browse a wide range of vehicles with filtering options.
-   **Detailed Car Views**: Comprehensive information for each vehicle including specifications and images.
-   **Responsive Design**: Fully optimized for both desktop and mobile devices.
-   **Booking System**: Intuitive flow for selecting dates and booking vehicles.
-   **Payment Integration**: Secure payment form layout (UI).
-   **Car Comparison**: Feature to compare different car models side-by-side.
-   **User Reviews**: Read and display user feedback.
-   **Modern UI/UX**: clean, aesthetic design using modern web standards.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) (based on Radix UI)
-   **State Management/Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Forms & Validation**: React Hook Form (implied) / Custom forms
-   **Utilities**: `date-fns`, `clsx`, `tailwind-merge`

## 📦 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/IvanLopatka/Morent.git
    cd morent
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```bash
src/
├── app/              # Next.js App Router pages and layouts
│   ├── catalog/      # Car catalog page
│   ├── payment/      # Payment process page
│   └── page.tsx      # Landing page
├── components/       # Reusable React components
│   ├── ui/           # Shared UI components (Button, Input, etc.)
│   └── ...           # Feature-specific components (CarCard, RentalSummary, etc.)
├── lib/              # Utility functions and mock data
└── ...
```

## 📜 Scripts

-   `dev`: Starts the development server with Turbopack.
-   `build`: Builds the application for production.
-   `start`: Starts the production server.
-   `lint`: Runs ESLint to check for code quality issues.

## 👤 Author

**Ivan Lopatka**
-   GitHub: [@IvanLopatka](https://github.com/IvanLopatka)

