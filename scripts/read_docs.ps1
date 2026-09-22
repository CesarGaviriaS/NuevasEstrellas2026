Add-Type -AssemblyName System.IO.Compression.FileSystem

$folder = Get-ChildItem -Directory | Where-Object { $_.Name -like "*cambios*" } | Select-Object -First 1
$files = Get-ChildItem -Path $folder.FullName -Filter "*.docx"
$out = @()
foreach ($f in $files) {
    $out += "=================================================="
    $out += "FILE: $($f.Name)"
    $out += "=================================================="
    try {
        $zip = [System.IO.Compression.ZipFile]::OpenRead($f.FullName)
        $entry = $zip.GetEntry("word/document.xml")
        if ($entry) {
            $stream = $entry.Open()
            $reader = New-Object System.IO.StreamReader($stream)
            $xmlContent = $reader.ReadToEnd()
            $reader.Close()
            $stream.Close()
            
            $text = $xmlContent -replace '<w:p[^>]*>', "`n" -replace '<[^>]+>', ''
            $text = [System.Net.WebUtility]::HtmlDecode($text)
            $out += $text.Trim()
        }
        $zip.Dispose()
    } catch {
        $out += "Error reading $($f.Name): $_"
    }
    $out += "`n`n"
}
$out | Set-Content -Path "scripts/extracted_docs.txt" -Encoding UTF8
Write-Host "Done writing to scripts/extracted_docs.txt"
