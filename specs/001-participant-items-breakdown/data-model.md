# Data Model: Desglose de Items por Participante

## Entities

### Item
Represents a single expense item within a participant's total.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | `string` | Unique identifier (UUID) | Required, Unique |
| `description` | `string` | Description of the expense | Required, Max 100 chars |
| `amount` | `number` | Cost of the item | Required, > 0, 2 decimals |

### Participant (Updated)
Represents a person in the group.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | `string` | Unique identifier | Required |
| `name` | `string` | Name of the participant | Required |
| `items` | `Item[]` | List of expense items | Required (can be empty) |
| `amount` | `number` | Total expense amount | Calculated (sum of items) |
| `netAmount` | `number` | Net balance (optional) | Calculated |

## Relationships

- One **Participant** has many **Items** (0..*).
- One **Item** belongs to one **Participant**.

## State Transitions

- **Add Item**: Adds to `items` array, updates `amount`.
- **Remove Item**: Removes from `items` array, updates `amount`.
- **Update Item**: Updates field in `items` array, updates `amount`.
- **Create Participant**: Initializes with empty `items` or provided list.
