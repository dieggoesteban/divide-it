<!--
Sync Impact Report:
- Version change: New (1.0.0)
- Modified principles: Defined I, II, III, IV, V based on user input.
- Added sections: Technology Stack, Development Workflow.
- Templates requiring updates: None (generic references).
- Follow-up TODOs: None.
-->
# divide-it Constitution

## Core Principles

### I. Simplicity & Robustness
The project philosophy is "Keep it simple and robust". We prioritize simple, maintainable solutions over complex ones. Code should be easy to understand and robust against errors. We avoid over-engineering and premature optimization.

### II. Modern & Secure Stack
Built with React and TypeScript, utilizing shadcn/ui for UI components. We adhere to industry best practices for security and code quality. The application is currently a static frontend, and we aim to keep it that way unless requirements strictly dictate otherwise.

### III. Dependency Minimalism
Do not add extra dependencies unless strictly necessary or highly recommended. We aim to keep the bundle size small and the maintenance burden low. Every new dependency must be justified.

### IV. Documentation Standards
A comprehensive README and a CHANGELOG are mandatory. All features and changes must be documented. Code should be self-documenting where possible, with comments explaining "why" rather than "what".

### V. UI Consistency
We use shadcn/ui as the foundation for our design system. Custom components should align with the established design patterns and theming. We strive for a consistent look and feel across the application.

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI Framework**: shadcn/ui, Tailwind CSS
- **State Management**: React Context (keep it simple)
- **Deployment**: Static hosting (e.g., GitHub Pages, Vercel, Netlify)
- **Linting/Formatting**: ESLint, Prettier

## Development Workflow

- **Code Style**: Enforced via ESLint and Prettier.
- **Testing**: Testing is encouraged to ensure robustness.
- **Version Control**: Git. Semantic Versioning for releases.
- **Pull Requests**: All changes must be reviewed. PRs should be small and focused.

## Governance

This Constitution supersedes all other practices. Amendments require documentation and approval. All PRs must verify compliance with these principles.
- **Versioning**: We follow Semantic Versioning (MAJOR.MINOR.PATCH).
- **Compliance**: All contributors must read and adhere to this constitution.

**Version**: 1.0.0 | **Ratified**: 2025-12-18 | **Last Amended**: 2025-12-18
