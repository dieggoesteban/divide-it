# Checklist: Unify Participant Edit and Item Management

## Verification Steps

1.  **Edit Participant**:
    - [ ] Click the "Edit" (pencil) icon on a participant.
    - [ ] Verify that a single dialog opens.
    - [ ] Verify that the dialog contains:
        - Name input.
        - Amount input (read-only if items exist).
        - "Desglose de Gastos" section with `ItemManager`.
    - [ ] Add an item in the `ItemManager` section.
    - [ ] Verify that the total amount updates automatically.
    - [ ] Remove all items.
    - [ ] Verify that the total amount resets (or allows manual input).
    - [ ] Click "Guardar".
    - [ ] Verify that the participant is updated with the new name and items.

2.  **Add Participant**:
    - [ ] Use the "Add Participant" form.
    - [ ] Click the button to add items (this should still open the `ItemManagerDialog` popup).
    - [ ] Add items and save.
    - [ ] Verify that the total amount in the form updates.
    - [ ] Add the participant.
    - [ ] Verify that the new participant has the correct items.

3.  **Navigation**:
    - [ ] Click on the participant name in the list.
    - [ ] Verify that it does *not* navigate to a separate page (link removed).

4.  **Code Cleanup**:
    - [ ] Verify `ParticipantDetailsPage.tsx` is deleted.
    - [ ] Verify `App.tsx` route is removed.
