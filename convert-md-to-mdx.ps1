# PowerShell script to convert .md files to .mdx
# Excludes main README.md files

Write-Host "Converting .md files to .mdx..." -ForegroundColor Green

# Get all .md files except main README.md
$mdFiles = Get-ChildItem -Path . -Recurse -Name "*.md" | Where-Object { 
    $_ -notmatch "^README\.md$" -and 
    $_ -notmatch "\\README\.md$" -and
    $_ -notmatch "/README\.md$"
}

Write-Host "Found $($mdFiles.Count) .md files to convert:" -ForegroundColor Yellow

foreach ($file in $mdFiles) {
    $fullPath = Join-Path -Path (Get-Location) -ChildPath $file
    $newPath = $fullPath -replace "\.md$", ".mdx"
    
    if (Test-Path $fullPath) {
        Write-Host "Converting: $file -> $($file -replace '\.md$', '.mdx')" -ForegroundColor Cyan
        Rename-Item -Path $fullPath -NewName $newPath
    }
}

Write-Host "Conversion completed!" -ForegroundColor Green
Write-Host "Note: README.md files were preserved as they might be needed for repository documentation." -ForegroundColor Yellow
