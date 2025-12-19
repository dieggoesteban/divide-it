# Quickstart: Desglose de Items por Participante

## Prerequisites

- Node.js (v18+)
- npm or yarn

## Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open the application**:
    Navigate to `http://localhost:5173` (or the port shown in the terminal).

## Testing the Feature

1.  **Add a Participant with Items**:
    - Click "Add Participant".
    - Enter a name (e.g., "Alice").
    - Click "Add Item" to open the item dialog.
    - Enter description "Lunch" and amount "15.50".
    - Add another item "Coffee" with amount "3.00".
    - Save the participant.
    - Verify the total is displayed as "18.50".

2.  **View Breakdown**:
    - Click on the participant's name or "Details" button.
    - Verify the list of items is shown correctly.

3.  **Edit Items**:
    - In the details page, click "Edit Items".
    - Modify an amount or remove an item.
    - Save and verify the total updates.
