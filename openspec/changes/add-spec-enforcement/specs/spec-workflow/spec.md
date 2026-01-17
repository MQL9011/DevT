## ADDED Requirements
### Requirement: Spec-first assistant workflow
The system SHALL provide Cursor rules that require creating an OpenSpec change proposal before any code or configuration modifications.

#### Scenario: Assistant receives a change request
- **WHEN** a user requests a change
- **THEN** the assistant creates an OpenSpec change proposal and tasks before making code edits

### Requirement: Commit guard for missing proposals
The repository SHALL provide a local pre-commit check that fails when non-OpenSpec files are staged without an accompanying OpenSpec change proposal.

#### Scenario: Commit includes code changes without proposal
- **WHEN** a commit stages files outside `openspec/`
- **AND** no `openspec/changes/<change-id>/proposal.md` exists
- **THEN** the commit is blocked with a clear message
