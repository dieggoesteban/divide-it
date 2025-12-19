# Tasks: Desglose de Items por Participante

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Status**: In Progress

## Phase 1: Setup
*Goal: Ensure the environment is ready for development.*

- [x] T001 Verify project builds and runs locally

## Phase 2: Foundational
*Goal: Update the core data models and context to support multiple items per participant. This is a blocking prerequisite for all user stories.*

- [x] T002 Update `Participant` and `Item` interfaces in `src/core/participants.ts`
- [x] T003 Update `ParticipantsContext` reducer to handle `items` initialization in `src/context/ParticipantsContext.tsx`
- [x] T004 Update `getTotal` function to respect items sum in `src/core/participants.ts`

## Phase 3: User Story 1 - Add participant with multiple items
*Goal: Allow users to add items during participant creation.*
*Priority: P1*

**Independent Test**: Add a participant with 3 items (e.g., 50, 20, 10) and verify the total is 80.

- [x] T005 [US1] Create `ItemManagerDialog` component for managing items in `src/components/ItemManagerDialog.tsx`
- [x] T006 [US1] Add validation for item fields (description required, amount > 0) in `src/components/ItemManagerDialog.tsx`
- [x] T007 [US1] Integrate `ItemManagerDialog` into `AddParticipantForm` in `src/components/AddParticipantForm.tsx`
- [x] T008 [US1] Implement auto-calculation of total from items in `src/components/AddParticipantForm.tsx`

## Phase 4: User Story 2 - View breakdown of expenses
*Goal: Display the detailed list of items for a participant.*
*Priority: P2*

**Independent Test**: Select a participant with items and verify the list is displayed correctly in the details page.

- [x] T009 [US2] Update `ParticipantDetailsPage` to render items list in `src/pages/ParticipantDetailsPage.tsx`
- [x] T010 [US2] Add items indicator (badge/icon) to participant list items in `src/components/ParticipantsList.tsx`

## Phase 5: User Story 3 - Edit items of existing participant
*Goal: Allow modifying items for an existing participant.*
*Priority: P3*

**Independent Test**: Edit a participant, change an item's amount, add a new one, and delete one. Verify total updates.

- [x] T011 [US3] Add "Edit Items" button using `ItemManagerDialog` in `src/pages/ParticipantDetailsPage.tsx`
- [x] T012 [US3] Ensure context updates correctly on item edit in `src/context/ParticipantsContext.tsx`

## Phase 6: Polish & Cross-Cutting Concerns
*Goal: Ensure UX requirements and edge cases are handled.*

- [x] T013 Enforce 2 decimal precision in display in `src/components/ItemManagerDialog.tsx` and `src/pages/ParticipantDetailsPage.tsx`
- [x] T014 Truncate long descriptions in `src/pages/ParticipantDetailsPage.tsx`
- [x] T015 Verify negative amounts are blocked in `src/components/ItemManagerDialog.tsx`

## Dependencies

- **Phase 2** blocks **Phase 3, 4, 5** (Data model changes required first)
- **Phase 3** blocks **Phase 4** (Need to add items to view them)
- **Phase 3** blocks **Phase 5** (Need `ItemManagerDialog` for editing)

## Implementation Strategy

1.  **MVP (Stories 1 & 2)**: Focus on getting the data model updated and the ability to add/view items. This delivers the core value.
2.  **Enhancement (Story 3)**: Add the editing capability once the creation flow is solid.
3.  **Polish**: Refine the UI and handle edge cases.

## Parallel Execution Opportunities

- **T009 (View)** and **T010 (List Indicator)** can be done in parallel with **T007/T008 (Add)** once **Phase 2** is complete, using mock data if needed.
- **T005 (Dialog UI)** is independent of the main context logic and can be built in isolation.
