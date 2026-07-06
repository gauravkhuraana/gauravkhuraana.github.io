# ESXp Time Entry Automation Script
# This script automates time entry in Microsoft ESXp system

param(
    [string]$CustomerNotes = "",
    [int]$Hours = 4,
    [string]$LaborCategory = "Testing and Stabilization"
)

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "ESXp Time Entry Automation" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# If customer notes not provided, prompt for it
if ([string]::IsNullOrWhiteSpace($CustomerNotes)) {
    Write-Host "`nPlease enter customer notes for today's time entry:" -ForegroundColor Yellow
    $CustomerNotes = Read-Host "Customer Notes"
    
    if ([string]::IsNullOrWhiteSpace($CustomerNotes)) {
        Write-Host "`nError: Customer notes cannot be empty!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`nTime Entry Details:" -ForegroundColor Green
Write-Host "  Hours: $Hours" -ForegroundColor White
Write-Host "  Labor Category: $LaborCategory" -ForegroundColor White
Write-Host "  Customer Notes: $CustomerNotes" -ForegroundColor White

# Confirm before proceeding
Write-Host "`nProceed with time entry? (Y/N): " -ForegroundColor Yellow -NoNewline
$confirm = Read-Host
if ($confirm -ne 'Y' -and $confirm -ne 'y') {
    Write-Host "Cancelled by user." -ForegroundColor Red
    exit 0
}

Write-Host "`nStarting automation..." -ForegroundColor Green

# Note: The actual Playwright automation would be triggered here
# For now, this script will open the URL and provide instructions

Write-Host "`nOpening ESXp Time Management..." -ForegroundColor Cyan
Start-Process "https://esxp.microsoft.com/#/time/assignments/managetime"

Write-Host "`n[INFO] Manual steps required:" -ForegroundColor Yellow
Write-Host "1. Click on the item under 'Recent Entries'" -ForegroundColor White
Write-Host "2. Select Labor Category: '$LaborCategory'" -ForegroundColor White
Write-Host "3. Update Hours to: $Hours" -ForegroundColor White
Write-Host "4. Add Customer Notes: '$CustomerNotes'" -ForegroundColor White
Write-Host "5. Click Save/Submit" -ForegroundColor White

Write-Host "`n[NOTE] To enable full automation, run with GitHub Copilot's Playwright integration" -ForegroundColor Gray
Write-Host "=====================================" -ForegroundColor Cyan
