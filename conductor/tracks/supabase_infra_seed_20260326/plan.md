# Implementation Plan: Supabase Infrastructure & Property Seed

This plan covers the initial Supabase setup, including connection configuration for the Next.js App Router, MCP tool linking, and seeding the database with 30 property records based on PRDs.

## Phase 1: Supabase Core Setup & MCP Linking
**Goal:** Establish a verified connection between the Next.js app and Supabase, and link the MCP tool.

- [x] Task: Verify `.env.local` configuration for Supabase credentials. (verified)
- [x] Task: Install `@supabase/ssr` and `@supabase/supabase-js`. (installed)
- [x] Task: Implement Supabase client utilities for Server and Client components (App Framework style). (implemented)
- [ ] Task: TDD - Write tests to verify Supabase client initialization and basic connectivity.
- [ ] Task: Implement connectivity check and ensure tests pass.
- [ ] Task: Link Supabase MCP tool using `.env.local` and verify with a `list_tables` command.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Supabase Core Setup' (Protocol in workflow.md)

## Phase 2: Schema Definition & Migrations
**Goal:** Define the `properties` table schema and apply it via Supabase migrations.

- [ ] Task: Create a new Supabase migration file for the `properties` table.
- [ ] Task: Define the `properties` table with all specified columns (slug, geolocation, arrays for images/amenities).
- [ ] Task: Add an index to the `slug` column for performance.
- [ ] Task: Apply the migration to the remote Supabase project using the linked MCP or Supabase CLI.
- [ ] Task: TDD - Write tests to verify the schema structure.
- [ ] Task: Ensure schema verification tests pass.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Schema Definition' (Protocol in workflow.md)

## Phase 3: Property Data Seeding
**Goal:** Populate the database with 30+ high-fidelity property records.

- [ ] Task: Prepare a seed script (or SQL) with 30 properties, using PRD-based data (Beverly Hills, Palo Alto, etc.).
- [ ] Task: Ensure each property has at least 5 image URLs and valid geolocation coordinates.
- [ ] Task: Implement slug generation logic within the seed process.
- [ ] Task: Execute the seeding process and verify record count.
- [ ] Task: TDD - Write tests to verify seed data integrity (30+ records, all fields populated).
- [ ] Task: Ensure seeding verification tests pass.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Property Data Seeding' (Protocol in workflow.md)
