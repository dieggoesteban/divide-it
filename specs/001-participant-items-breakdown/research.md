# Research: Desglose de Items por Participante

**Feature**: `001-participant-items-breakdown`

## Decisions

### 1. Item ID Generation
- **Decision**: Use `crypto.randomUUID()` for generating unique IDs for items.
- **Rationale**: It is a standard web API available in all modern browsers and Node.js environments. It provides cryptographically strong UUIDs without needing external libraries like `uuid`.
- **Alternatives considered**:
    - `Date.now() + Math.random()`: Less robust, potential for collisions (though unlikely in this scope).
    - `uuid` library: Adds unnecessary dependency.
    - Simple counter: Harder to manage when deleting/adding items out of order.

### 2. State Management
- **Decision**: Extend existing `ParticipantsContext` and `Participant` type.
- **Rationale**: The application uses a simple `useReducer` + Context pattern. Adding items is a natural extension of the `Participant` entity.
- **Alternatives considered**:
    - Redux/Zustand: Overkill for this scale.
    - Local state in components: Would make it hard to share data between pages (List vs Details).

### 3. UI/UX for Item Management
- **Decision**: Use a `Dialog` (Modal) for adding/editing items within the `AddParticipantForm` and `ParticipantDetailsPage`.
- **Rationale**: Keeps the main form clean. Allows for a focused view when managing the breakdown. Matches the "Modal/Popup" requirement in the spec.
- **Alternatives considered**:
    - Inline editing: Could clutter the UI if there are many items.
    - Separate page: Too heavy for just adding a few numbers.

### 4. Data Model Migration
- **Decision**: No migration needed (Stateless app).
- **Rationale**: The app resets on reload. We just need to ensure the initial state handles the new structure (empty arrays).

## Unknowns Resolved

- **Testing**: Confirmed no test runner is configured. Will rely on manual testing as per spec scenarios.
- **Dependencies**: Confirmed `shadcn/ui` components (Dialog, etc.) are available or can be added easily.
