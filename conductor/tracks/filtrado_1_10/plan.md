# Implementation Plan: filtrado_1_10

## Tasks
1. [x] **Task 1: Setup and Basic Modal Structure**
   - Create `app/components/FiltersModal.tsx`
   - Implement `Dialog` structure with header and close button.
   - Verify: Modal opens and closes correctly.

2. [x] **Task 2: Location and Price Range Sections**
   - Add Location `Input` with Lucide `MapPin` icon.
   - Implement Dual Range `Slider` for price.
   - Add Min/Max price inputs.
   - Verify: Slider values update the inputs and vice versa.

3. [x] **Task 3: Property Details (Type, Beds, Baths)**
   - Implement `Select` for Property Type.
   - Create reusable counter component for Bedrooms and Bathrooms.
   - Verify: Counter logic (increment/decrement/min-value).

4. [x] **Task 4: Amenities and Footer**
   - Implement grid of selectable chips for Amenities.
   - Add footer with "Clear all" and "Show results" buttons.
   - Verify: "Clear all" resets state; "Show results" triggers action.

5. [x] **Task 5: Final Styling and Dark Mode**
   - Apply final Tailwind classes for primary color and dark mode support.
   - Match visual fidelity with `prd/search_filters_screen/screen.png`.
   - Verify: Dark mode toggle works and looks correct.
