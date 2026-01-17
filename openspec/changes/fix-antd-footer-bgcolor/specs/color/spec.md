## MODIFIED Requirements

### Requirement: Page Background Consistency
The system SHALL ensure that all layout components (header, content, footer) use consistent background colors matching the dark theme (`#0a0a0a`).

#### Scenario: Footer background matches page background
- **WHEN** the page is rendered with the MainLayout component
- **THEN** the footer background color SHALL be `#0a0a0a`, matching the page background
- **AND** no Antd default styles (`#f5f5f5`) SHALL be visible
