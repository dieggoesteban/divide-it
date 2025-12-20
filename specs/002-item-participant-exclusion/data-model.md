# Data Model: Exclusión de Participantes por Item

## Entities

### Item (Updated)
Represents an expense item.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier. |
| `description` | `string` | Description of the expense. |
| `amount` | `number` | Cost of the item. |
| `excludedParticipantIds` | `string[]` | **NEW**: List of IDs of participants who do NOT share this expense. If undefined or empty, all participants share it. |

### Participant (Unchanged)
Represents a person in the group.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name. |
| `items` | `Item[]` | List of expenses paid by this participant. |
| `amount` | `number` | Total amount paid (sum of items). |
| `netAmount` | `number` | Calculated balance (Paid - Fair Share). |

## State Transitions

### Adding a Participant
- **Action**: User adds "New Person".
- **Effect**: "New Person" is NOT added to any `excludedParticipantIds` lists.
- **Result**: "New Person" automatically shares costs of all existing items (unless manually excluded later).

### Removing a Participant
- **Action**: User removes "Old Person".
- **Effect**: "Old Person" ID is removed from any `excludedParticipantIds` lists (cleanup).
- **Result**: Balances recalculated without "Old Person".

### Editing Item Exclusions
- **Action**: User unchecks "Person A" for "Item X".
- **Effect**: "Person A" ID is added to `Item X.excludedParticipantIds`.
- **Result**: "Item X" cost is split among (Total Participants - 1). "Person A" debt for this item is 0.
