---
description: "Task list for Item Participant Exclusion feature"
---

# Tasks: Exclusión de Participantes por Item

**Input**: Design documents from `/specs/002-item-participant-exclusion/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md
**Tests**: Manual testing via UI as per plan.

## Phase 1: Setup

**Purpose**: Verify environment and dependencies.

- [x] T001 Verify project builds and runs (`npm run dev`)
- [x] T002 [P] Review existing `participants.ts` logic to ensure clean refactoring

## Phase 2: Foundational (Core Logic & Types)

**Purpose**: Implement the core data structures and calculation logic that supports exclusions.

- [x] T003 Update `Item` interface in `src/core/participants.ts` to include `excludedParticipantIds?: string[]`
- [x] T004 Update `Participant` interface in `src/core/participants.ts` to include `fairShare?: number` (Cuota)
- [x] T005 Refactor `getParticipantsWithNetAmountCalc` in `src/core/participants.ts` to calculate debt based on item exclusions
- [x] T006 Update `ResultsPage.tsx` to use the new `fairShare` property and remove reliance on `getTotalIndividual` for balances
- [x] T007 Update `ParticipantsBalanceList.tsx` and `ParticipantBalanceSummary.tsx` to display individual `fairShare` instead of global average

## Phase 3: User Story 1 - Excluir participante de un item específico (Priority: P1)

**Goal**: Allow users to configure which participants share an item's cost.

- [x] T008 [P] [US1] Update `ItemManagerDialog.tsx` to accept `allParticipants` prop
- [x] T009 [P] [US1] Add `excludedParticipantIds` state to `ItemManagerDialog` form
- [x] T010 [US1] Implement checkbox list for participants in `ItemManagerDialog` (checked = included, unchecked = excluded)
- [x] T011 [US1] Update `ItemManager.tsx` to pass `participants` from context to `ItemManagerDialog`
- [x] T012 [US1] Validate that at least one participant is selected (prevent 0 participants)

## Phase 4: User Story 2 - Visualizar participantes asignados a cada item (Priority: P2)

**Goal**: Provide transparency on who is paying for what.

- [x] T013 [P] [US2] Update `ItemManager.tsx` to display a compact indicator (e.g., "👥 2/3") for items with exclusions
- [x] T014 [P] [US2] Add tooltip or details to the indicator to show names of included/excluded participants

## Phase 5: User Story 3 - Agregar/Eliminar participante (Priority: P2)

**Goal**: Ensure consistency when group membership changes.

- [x] T015 [US3] Update `REMOVE_PARTICIPANT` case in `ParticipantsContext.tsx` reducer to clean up `excludedParticipantIds` from all items
- [x] T016 [US3] Verify `ADD_PARTICIPANT` automatically includes new person in existing items (by virtue of not being in exclusion list)

## Phase 6: User Story 4 - Recálculo automático (Priority: P1)

**Goal**: Ensure balances are correct.

- [x] T017 [US4] Verify `getSuggestedTransactions` in `src/core/participants.ts` works correctly with the new `netAmount` values
- [ ] T018 [US4] Manual Test: Create scenario with exclusions and verify "Who owes whom" results match expected values

## Implementation Strategy

1.  **Core First**: Implement the types and calculation logic (Phase 2) first. This might temporarily break the UI until Phase 3 is done, or we can implement it such that "no exclusions" (default) works exactly as before.
2.  **UI Update**: Implement the Dialog changes (Phase 3) to allow creating the data.
3.  **Visualization**: Add the indicators (Phase 4).
4.  **Cleanup**: Handle edge cases like removal (Phase 5).

## Dependencies

- US1 depends on Foundational (Types)
- US4 depends on Foundational (Logic)
- US2 depends on US1 (Data existence)
