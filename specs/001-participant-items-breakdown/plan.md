# Implementation Plan: Desglose de Items por Participante

**Branch**: `001-participant-items-breakdown` | **Date**: 2025-12-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-participant-items-breakdown/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

The feature "Desglose de Items por Participante" allows users to add multiple expense items (description + amount) to a participant instead of just a single total amount. The system will automatically calculate the participant's total based on these items. This involves updating the `Participant` data model to include an array of `Item`s, updating the `AddParticipantForm` to support adding/editing items, and displaying the breakdown in the `ParticipantDetailsPage`.

## Technical Context

**Language/Version**: TypeScript 5.6, React 18.3
**Primary Dependencies**: shadcn/ui (Radix UI), Tailwind CSS, React Router DOM
**Storage**: In-memory (React Context) - Stateless
**Testing**: Manual (No test runner configured in package.json)
**Target Platform**: Web (Modern Browsers)
**Project Type**: Single Page Application (SPA)
**Performance Goals**: Instant UI updates (<100ms)
**Constraints**: Stateless, no persistence
**Scale/Scope**: Small feature, local state only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Simplicity & Robustness**: The solution extends the existing `Participant` model without introducing complex state management libraries.
- **Modern & Secure Stack**: Uses existing React + TypeScript stack.
- **Dependency Minimalism**: No new dependencies required. `crypto.randomUUID` will be used for IDs.
- **Documentation Standards**: Spec and Plan are being created.
- **UI Consistency**: Will use existing shadcn/ui components (Dialog, Input, Button) for the new item management UI.

## Project Structure

### Documentation (this feature)

```text
specs/001-participant-items-breakdown/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── contracts/           # Phase 1 output
    └── types.ts         # TypeScript definitions
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── AddParticipantForm.tsx       # Update to handle items
│   ├── ParticipantDetailsPage.tsx   # Update to show items
│   └── ui/                          # Existing UI components
├── context/
│   └── ParticipantsContext.tsx      # Update reducer for items
├── core/
│   └── participants.ts              # Update Participant interface
└── pages/
    └── ParticipantDetailsPage.tsx   # Update to display breakdown
```

**Structure Decision**: Modifying existing files in `src/` to accommodate the new data model and UI requirements.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A
