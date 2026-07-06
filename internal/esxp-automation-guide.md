# ESXp Time Entry Automation

This guide helps you automate time entries in Microsoft ESXp system.

## Quick Start

### Option 1: Interactive PowerShell Script (Recommended)

Run this script - it will prompt you for customer notes and then guide you:

```powershell
.\esxp-time-entry.ps1
```

Or provide customer notes directly:

```powershell
.\esxp-time-entry.ps1 -CustomerNotes "Worked on database repo" -Hours 4
```

### Option 2: AI-Assisted Browser Automation

If you want fully automated browser interaction:

1. Open this chat with GitHub Copilot
2. Say: "Navigate to ESXp and automate my time entry"
3. I'll use Playwright to:
   - Open the ESXp page
   - Take a snapshot to identify elements
   - Click on recent entries
   - Fill in the form
   - Submit

## Features

- ✅ Prompts for customer notes if not provided
- ✅ Validates input before proceeding
- ✅ Shows summary before submission
- ✅ Configurable hours and labor category
- ✅ Can be extended for full browser automation

## Parameters

```powershell
-CustomerNotes   # What you worked on (required)
-Hours          # Number of hours (default: 4)
-LaborCategory  # Default: "Testing and Stabilization"
```

## Examples

### Daily standup notes:
```powershell
.\esxp-time-entry.ps1 -CustomerNotes "Daily standup and sprint planning"
```

### Code review work:
```powershell
.\esxp-time-entry.ps1 -CustomerNotes "Code review for PR #1234" -Hours 2
```

### Testing work:
```powershell
.\esxp-time-entry.ps1 -CustomerNotes "Integration testing for new feature"
```

## Full Automation with Playwright

If you want to enable full browser automation (no manual clicks), I can help you:

1. Install Playwright (if not already installed)
2. Create a Node.js script that automates the entire flow
3. Handle authentication and page navigation
4. Fill forms and submit automatically

Just ask me: "Set up full Playwright automation for ESXp"

## Tips

- Run this at the end of your workday
- Keep customer notes concise but descriptive
- You can create batch files for common tasks
- Schedule this script to run with Windows Task Scheduler

## Common Time Entry Templates

Create shortcuts for frequently used notes:

```powershell
# Save as quick aliases in your PowerShell profile
function Log-Standup { .\esxp-time-entry.ps1 -CustomerNotes "Daily standup and sprint activities" }
function Log-Testing { .\esxp-time-entry.ps1 -CustomerNotes "Testing and QA activities" }
function Log-CodeReview { .\esxp-time-entry.ps1 -CustomerNotes "Code reviews and PR feedback" }
function Log-Development { .\esxp-time-entry.ps1 -CustomerNotes "Feature development and bug fixes" }
```

Then just type: `Log-Testing` and enter!
