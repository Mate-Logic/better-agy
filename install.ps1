param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Plugins
)

$ErrorActionPreference = 'Stop'

$RepoUrl = if ($env:BETTERANTIGRAVITY_REPO) { $env:BETTERANTIGRAVITY_REPO } else { 'https://github.com/Mate-Logic/betterantigravity.git' }
$Branch  = if ($env:BETTERANTIGRAVITY_BRANCH) { $env:BETTERANTIGRAVITY_BRANCH } else { 'main' }

if (-not (Get-Command agy -ErrorAction SilentlyContinue)) {
  Write-Error "Error: 'agy' (Antigravity CLI) not found in PATH. Install it first: https://antigravity.google/product/antigravity-cli"
  exit 1
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Warning "Note: 'node' was not found in PATH. Hook-based plugins (time-machine, after, meters, narrator, quick-peek, image-preview) require Node.js 18+."
}

# Allow selecting plugins via $env:PLUGINS="commit review" when piped to iex.
if ((-not $Plugins -or $Plugins.Count -eq 0) -and $env:PLUGINS) {
  $Plugins = $env:PLUGINS.Split(' ', [System.StringSplitOptions]::RemoveEmptyEntries)
}

$TempClone = $null
try {
  $LocalPluginsDir = if ($PSScriptRoot) { Join-Path $PSScriptRoot 'plugins' } else { $null }
  if ($LocalPluginsDir -and (Test-Path (Join-Path $LocalPluginsDir 'commit\plugin.json'))) {
    $PluginsDir = $LocalPluginsDir
  } else {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
      Write-Error "Error: 'git' is required to clone better-antigravity. Install Git for Windows: https://git-scm.com/download/win"
      exit 1
    }
    $TempClone = Join-Path ([System.IO.Path]::GetTempPath()) ("betterantigravity-" + [System.Guid]::NewGuid().ToString('N'))
    Write-Host "Cloning better-antigravity..."
    & git clone --depth 1 --branch $Branch --quiet $RepoUrl $TempClone
    if ($LASTEXITCODE -ne 0) {
      Write-Error "Failed to clone $RepoUrl"
      exit 1
    }
    $PluginsDir = Join-Path $TempClone 'plugins'
  }

  $Selected = @()
  if ($Plugins -and $Plugins.Count -gt 0) {
    foreach ($p in $Plugins) {
      if ($p -eq '--list' -or $p -eq '-l') {
        Get-ChildItem -Path $PluginsDir -Directory | Where-Object { Test-Path (Join-Path $_.FullName 'plugin.json') } | ForEach-Object { $_.Name }
        exit 0
      } elseif ($p -eq '--all' -or $p -eq '-a') {
        $Selected = Get-ChildItem -Path $PluginsDir -Directory | Where-Object { Test-Path (Join-Path $_.FullName 'plugin.json') } | ForEach-Object { $_.Name }
      } else {
        $Selected += $p
      }
    }
  } else {
    $Selected = Get-ChildItem -Path $PluginsDir -Directory | Where-Object { Test-Path (Join-Path $_.FullName 'plugin.json') } | ForEach-Object { $_.Name }
  }

  if (-not $Selected -or $Selected.Count -eq 0) {
    Write-Error "No plugins found to install."
    exit 1
  }

  $Installed = 0
  $Failed = 0
  foreach ($name in $Selected) {
    $target = Join-Path $PluginsDir $name
    if (-not (Test-Path (Join-Path $target 'plugin.json'))) {
      Write-Warning "Unknown plugin: $name"
      $Failed++
      continue
    }
    Write-Host "-> Installing $name..."
    & agy plugin install $target
    if ($LASTEXITCODE -eq 0) {
      $Installed++
    } else {
      Write-Warning "Failed to install $name"
      $Failed++
    }
  }

  Write-Host ""
  Write-Host "Done: $Installed installed, $Failed failed."
  Write-Host "Open a new Antigravity CLI session (agy) to use the installed plugins."
  if ($Failed -gt 0) {
    exit 1
  }
} finally {
  if ($TempClone -and (Test-Path $TempClone)) {
    Remove-Item -Recurse -Force $TempClone -ErrorAction SilentlyContinue
  }
}
