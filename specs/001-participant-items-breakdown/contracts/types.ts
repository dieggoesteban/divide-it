/**
 * Represents a single expense item.
 */
export interface Item {
  /** Unique identifier for the item (UUID) */
  id: string;
  /** Description of the expense */
  description: string;
  /** Cost of the item. Must be positive. */
  amount: number;
}

/**
 * Represents a participant in the expense sharing group.
 */
export interface Participant {
  /** Unique identifier for the participant */
  id: string;
  /** Name of the participant */
  name: string;
  /** List of expense items associated with the participant */
  items: Item[];
  /** 
   * Total expense amount. 
   * Should be calculated as the sum of all item amounts.
   */
  amount: number;
  /** Net balance after calculation (optional) */
  netAmount?: number;
}

/**
 * Input payload for creating a new participant.
 */
export interface CreateParticipantInput {
  name: string;
  items: Omit<Item, 'id'>[]; // Items might not have IDs yet if created in UI before saving, or UI generates them.
}

/**
 * Input payload for updating a participant's items.
 */
export interface UpdateParticipantItemsInput {
  participantId: string;
  items: Item[];
}
