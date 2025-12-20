# Research: Exclusión de Participantes por Item

**Feature**: Exclusión de Participantes por Item
**Status**: Completed

## Unknowns & Decisions

### 1. Data Structure for Item Participation
**Question**: How to represent which participants are included in an item's split?
- **Option A**: `includedParticipantIds: string[]`. Explicit list of who pays.
- **Option B**: `excludedParticipantIds: string[]`. List of who does NOT pay.
- **Decision**: **Option A (`includedParticipantIds`)** but with a specific rule for "All".
- **Rationale**: The spec states "Si la lista está vacía o no existe, se asume que todos los participantes están incluidos". This allows backward compatibility. Explicit inclusion is safer for logic than exclusion (e.g. if a new participant is added, do they automatically get excluded or included? Spec says "included automatically").
    - *Refinement*: Actually, if we use `includedParticipantIds`, adding a new participant requires updating ALL items to include them.
    - *Re-evaluation*: If we use `excludedParticipantIds`:
        - New participant added -> Not in any exclusion list -> Automatically included (Matches Spec FR-007).
        - Legacy items -> No exclusion list -> Everyone included (Matches Spec FR-012).
    - **Final Decision**: **Option B (`excludedParticipantIds`)**.
    - **Why**: It natively supports the requirement "New participants are automatically included in all items" without needing to iterate and update every single item in the system. It also handles legacy data perfectly (undefined = no exclusions = everyone pays).

### 2. UI Component for Selection
**Question**: How to select participants in the Item Dialog?
- **Decision**: A scrollable list of checkboxes inside the `ItemManagerDialog`.
- **Details**:
    - Show "Todos" toggle (if list is empty or all selected).
    - List each participant with a checkbox.
    - Checked = Included (UI shows inclusion, data stores exclusion).
    - Store as `excludedParticipantIds` in the background.

### 3. Calculation Logic Update
**Question**: How to update `participants.ts` core logic?
- **Current**: `getTotal` sums all items. `getTotalIndividual` divides total by N participants.
- **New**:
    - `getTotal` remains sum of items (what the person paid).
    - `getNetAmount` needs to change. It's no longer `amount - totalIndividual`.
    - **New Logic**:
        - Calculate `totalSharedCost` per item.
        - For each item, split its cost among non-excluded participants.
        - Accumulate "debt" (what one *should* have paid) for each participant.
        - `netAmount` = `paidAmount` - `debtAmount`.
- **Decision**: Refactor `participants.ts` to calculate "Debt" per participant by iterating all items of all participants.

## Technology Choices

- **State Management**: Continue using `ParticipantsContext`.
- **Persistence**: None (Stateless).

## Best Practices

- **Immutability**: Ensure `excludedParticipantIds` updates create new arrays.
- **Precision**: Maintain 2 decimal precision logic using the existing helper functions.
