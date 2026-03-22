# GEMINI.md - Project Context & Instructions

This project is a modern real estate platform called **LuxeEstate**, built with Next.js and following high-fidelity design principles.

## Project Overview

*   **Goal:** To provide a premier property discovery and management experience for home seekers, owners, and agents.
*   **Tech Stack:**
    *   **Frontend:** Next.js 16 (App Router), React 19.
    *   **Language:** TypeScript.
    *   **Styling:** Tailwind CSS v4.
    *   **UI Components:** shadcn/ui (Radix UI based) located in `app/components/ui/`.
    *   **Icons:** Lucide React and Google Material Symbols.
    *   **Maps:** Google Maps API (`@react-google-maps/api`).
*   **Architecture:** Next.js App Router with a focus on modular components and clean UI/UX.

## Building and Running

*   **Development:** `npm run dev`
*   **Build:** `npm run build`
*   **Production Start:** `npm run start`
*   **Linting:** `npm run lint`

## Development Conventions

*   **Conductor Methodology:** The project uses the Conductor extension for task management. All major work is tracked in `conductor/tracks.md` and detailed in `conductor/tracks/<track_id>/plan.md`.
*   **Component System:**
    *   Use established **shadcn/ui** components from `app/components/ui/`.
    *   Custom shared components should reside in `app/components/`.
    *   Prioritize visual fidelity as defined in `prd/**/screen.png` and `prd/**/code.html`.
*   **Styling:**
    *   Follow the branding guidelines: Primary color is **Nature-inspired Green** (`#006611`).
    *   Support both Light and Dark modes using Tailwind variables defined in `app/globals.css`.
*   **Icons:** Use `lucide-react` by default, or Material Symbols as fallback if specified in the PRD.

## Key Directories

*   `app/`: Contains the application routes, layouts, and components.
*   `conductor/`: Contains project management artifacts (Product Guide, Tech Stack, Tracks).
*   `prd/`: Contains Product Requirements Documents, including reference screens and mock HTML code.
*   `public/`: Static assets.
*   `lib/`: Utility functions and shared logic (e.g., `cn` helper).

## Core Instructional Protocol

When working on this project:
1.  **Always check the Plan:** Read the current track's `plan.md` before making changes.
2.  **Respect the UI:** Use shadcn/ui variants and follow the PRD reference images strictly.
3.  **Type Safety:** Maintain 100% TypeScript coverage for all new components and logic.
4.  **Verification:** Verify visual fidelity and functional requirements against the track's `spec.md`.
