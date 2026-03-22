# Update Spec Reviewer and Executing Plans skills with shadcn/ui identification

## Objective
Update the `spec-reviewer-prompt.md` and `executing-plans/SKILL.md` files to include specific instructions and verification steps for shadcn/ui component usage based on PRD reference screens.

## Analysis of `prd/home_discover_screen/screen.png`
The following shadcn/ui components (or similar patterns) are identified:
- **Header**: `NavigationMenu` (links), `Button` (ghost variants for icons), `Avatar`.
- **Hero/Search**: `Input`, `Button` (primary search button).
- **Filters/Categories**: `Tabs` (specifically `TabsList` and `TabsTrigger`) or `ToggleGroup`, `Button` (secondary variants for pills).
- **Cards (Featured & Market)**: `Card`, `CardContent`, `Badge` (for "EXCLUSIVE", "FOR SALE", etc.), `Button` (icon-only for favorites), `AspectRatio` (to maintain image proportions).
- **Icons**: `Lucide` icons for search, notifications, favorites, beds, baths, and area.
- **Actions**: `Button` (for "Load more properties").

## Implementation Steps

### 1. Update `.agents/skills/subagent-driven-development/spec-reviewer-prompt.md`
- Modify the "Your Job" section to include a "UI/UX & shadcn/ui Compliance" subsection.
- Add instructions to verify:
    - Use of shadcn/ui components (e.g., `Card`, `Badge`, `Button`, `Input`) instead of generic HTML.
    - Matching of component variants (e.g., ghost, outline, secondary).
    - Consistency with PRD reference screens (`prd/**/screen.png`).
    - Correct icon usage (Lucide).

### 2. Update `.agents/skills/executing-plans/SKILL.md`
- Update "Step 1: Load and Review Plan" to include identifying required shadcn components from PRD screens.
- Update "Step 2: Execute Tasks" to ensure verification includes visual fidelity and component usage.
- Add a point in "Remember" about prioritized usage of established shadcn components.

## Verification
- Confirm that the updated files contain the new instructions and that they align with the project's use of shadcn/ui and Next.js.
