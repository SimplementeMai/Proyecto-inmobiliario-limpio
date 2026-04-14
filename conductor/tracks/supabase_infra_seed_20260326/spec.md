# Specification: Supabase Integration & Property Seeding

## Overview
Establish the core data infrastructure for LuxeEstate using Supabase. This includes configuring the connection for the Next.js App Router, linking the Supabase MCP for migration management, and populating the database with 30 high-fidelity property records derived from PRD research.

## Functional Requirements
### 1. Supabase Infrastructure
- **App Framework Connection:** Configure `@supabase/ssr` using `.env.local` variables for both Client and Server components.
- **MCP Tool Integration:** Link the Supabase MCP tool to the project using credentials in `.env.local`.

### 2. Enhanced Database Schema (`public.properties`)
- **Fields:** `id`, `slug`, `title`, `type`, `status`, `price`, `beds`, `baths`, `sq_meters`, `garage`, `address`, `city`, `latitude`, `longitude`, `description`, `images` (5+), `amenities`.

### 3. High-Volume Seeding
- **Quantity:** 30 properties minimum.
- **Fidelity:** Real-world locations (PRD based) and valid geolocation.

## Acceptance Criteria
- [ ] Supabase MCP is successfully linked and can execute `list_tables`.
- [ ] Connection verified via a basic fetch in a Next.js Server Component.
- [ ] `public.properties` table contains 30+ records.
- [ ] Each seed property has 5+ images and correct geolocation data.
- [ ] All PRD-specified amenities are represented in the seed data.
