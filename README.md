# divide-it

A simple, robust, and modern static frontend application built with React and TypeScript.

## The Idea

This application simplifies the process of splitting expenses for group purchases or shared activities, ensuring costs are divided equally among all participants. It solves the common problem of "who owes whom" after a shared event.

## A Practical Example

Imagine a group of friends organizing a dinner. One brings drinks, another brings meat, another vegetables, and so on. Each participant spends a different amount.

After dinner, it's time to settle up. The process is straightforward in theory: sum all expenses and divide by the number of participants to find the "fair share" or Individual Calculated Amount (ICA).

*   Participants who spent **less** than the ICA have a **debit balance** (they owe money).
*   Participants who spent **more** than the ICA have a **credit balance** (they are owed money).

The calculation becomes tedious when there are multiple debtors and creditors. You have to figure out how to split the payments so everyone gets reimbursed correctly. While not complex math, it's a chore that this app automates for you.

## What this app offers

*   **Expense Entry**: Easily input the total expenses for each participant.
*   **Automatic Calculation**: Instantly computes the total group expense and the Individual Calculated Amount (ICA).
*   **Balance Visualization**: Clearly shows each participant's balance—whether they are a debtor or a creditor.
*   **Smart Settlement**: Suggests the most efficient way to settle debts, indicating exactly who needs to pay whom and how much to minimize the number of transactions.

## Live Demo

Check out the live application here: [https://divide-it-b2349.web.app/](https://divide-it-b2349.web.app/)

## Philosophy

- **Keep it simple and robust**: We prioritize maintainability and simplicity.
- **Modern & Secure**: Built with the latest industry best practices.
- **Dependency Minimalism**: We only use what we strictly need.

## Tech Stack

- React
- TypeScript
- Vite
- shadcn/ui
- Tailwind CSS

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Run the development server: `npm run dev`

## Documentation

- [Constitution](.specify/memory/constitution.md)
- [Changelog](CHANGELOG.md)
