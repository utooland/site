# utoo installer for Windows
# Usage: irm https://utoo.land/install.ps1 | iex

$ErrorActionPreference = "Stop"

$InstallDir = if ($env:UTOO_INSTALL) { $env:UTOO_INSTALL } else { "$env:USERPROFILE\.utoo" }
$BinDir = "$InstallDir\bin"

# npm registries
$Registries = @(
    "https://registry.npmmirror.com"
    "https://registry.npmjs.org"
)

function Write-Info {
    param([string]$Message)
    Write-Host "info: " -ForegroundColor Cyan -NoNewline
    Write-Host $Message
}

function Write-Success {
    param([string]$Message)
    Write-Host "success: " -ForegroundColor Green -NoNewline
    Write-Host $Message
}

function Write-Error {
    param([string]$Message)
    Write-Host "error: " -ForegroundColor Red -NoNewline
    Write-Host $Message
    exit 1
}

function Get-LatestVersion {
    foreach ($registry in $Registries) {
        try {
            $response = Invoke-RestMethod -Uri "$registry/utoo/latest" -TimeoutSec 10
            if ($response.version) {
                return $response.version
            }
        } catch {
            continue
        }
    }
    Write-Error "Failed to fetch latest version from npm registry"
}

function Install-Utoo {
    param([string]$Version)

    $platform = "win32-x64"
    $pkgName = "utoo-$platform"

    if (-not $Version) {
        Write-Info "Fetching latest version..."
        $Version = Get-LatestVersion
    }

    Write-Host ""
    Write-Host "utoo" -ForegroundColor Cyan -NoNewline
    Write-Host " installer"
    Write-Host ""

    Write-Info "Installing utoo v$Version for $platform..."

    # Create install directory
    if (-not (Test-Path $BinDir)) {
        New-Item -ItemType Directory -Path $BinDir -Force | Out-Null
    }

    $archivePath = "$env:TEMP\utoo-$Version.tgz"
    $downloaded = $false

    foreach ($registry in $Registries) {
        $downloadUrl = "$registry/@utoo/$pkgName/-/$pkgName-$Version.tgz"
        Write-Info "Downloading from $registry..."
        try {
            Invoke-WebRequest -Uri $downloadUrl -OutFile $archivePath -UseBasicParsing
            $downloaded = $true
            break
        } catch {
            continue
        }
    }

    if (-not $downloaded) {
        Write-Error "Failed to download @utoo/$pkgName@$Version"
    }

    Write-Info "Extracting..."

    # Extract using tar (available in Windows 10+)
    $extractDir = "$env:TEMP\utoo-extract"
    if (Test-Path $extractDir) {
        Remove-Item -Recurse -Force $extractDir
    }
    New-Item -ItemType Directory -Path $extractDir -Force | Out-Null

    tar -xzf $archivePath -C $extractDir

    # Copy utoo binary
    $srcUtoo = "$extractDir\package\bin\utoo.exe"
    if (-not (Test-Path $srcUtoo)) {
        $srcUtoo = "$extractDir\package\bin\utoo"
    }

    if (Test-Path $srcUtoo) {
        Copy-Item $srcUtoo "$BinDir\utoo.exe" -Force
    } else {
        Write-Error "Could not find utoo binary in package"
    }

    # Create ut.cmd
    @"
@echo off
utoo %*
"@ | Out-File -FilePath "$BinDir\ut.cmd" -Encoding ASCII

    # Create utx.cmd
    @"
@echo off
utoo x %*
"@ | Out-File -FilePath "$BinDir\utx.cmd" -Encoding ASCII

    # Cleanup
    Remove-Item -Force $archivePath -ErrorAction SilentlyContinue
    Remove-Item -Recurse -Force $extractDir -ErrorAction SilentlyContinue

    Write-Success "utoo v$Version installed to $BinDir"
}

function Add-ToPath {
    Write-Info "Configuring PATH..."

    $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")

    if ($currentPath -like "*$BinDir*") {
        Write-Success "PATH already configured"
        return
    }

    $newPath = "$BinDir;$currentPath"
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")

    # Also update current session
    $env:Path = "$BinDir;$env:Path"

    Write-Success "Added $BinDir to PATH"
}

# Main
$version = if ($args.Count -gt 0) { $args[0] } else { $null }

Install-Utoo -Version $version
Add-ToPath

Write-Host ""
Write-Host "utoo was installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Restart your terminal, then you can use:"
Write-Host ""
Write-Host "  ut install" -ForegroundColor Cyan -NoNewline
Write-Host "      # install dependencies"
Write-Host "  ut run dev" -ForegroundColor Cyan -NoNewline
Write-Host "      # run scripts"
Write-Host "  utx cowsay hi" -ForegroundColor Cyan -NoNewline
Write-Host "   # execute packages"
Write-Host ""
