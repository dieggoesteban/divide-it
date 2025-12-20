# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement participant exclusion per item to allow fairer expense splitting (e.g., vegans not paying for meat).
Technical approach:
- Update `Item` interface to include `excludedParticipantIds`.
- Refactor `participants.ts` calculation logic to handle exclusions.
- Update `ItemManagerDialog` to include a participant selection list.
- Update UI to show exclusions.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18, Vite, Tailwind CSS, shadcn/ui
**Storage**: In-memory (Stateless)
**Testing**: Manual (Automated testing not configured)
**Target Platform**: Web (Modern Browsers)
**Project Type**: Web Application
**Performance Goals**: Instant UI updates (<100ms)
**Constraints**: Client-side only, Stateless
**Scale/Scope**: Small SPA

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ItemManagerDialog.tsx  # Update to include participant selection
│   ├── ItemManager.tsx        # Update to pass participants
│   └── ...
├── core/
│   └── participants.ts        # Update calculation logic
├── context/
│   └── ParticipantsContext.tsx # Update types if needed
```

**Structure Decision**: Single project structure (React + Vite).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
