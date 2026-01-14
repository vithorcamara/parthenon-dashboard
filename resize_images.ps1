Add-Type -AssemblyName System.Drawing

$sourceDir = "./Parthenon/assets/gfx/logos/startup"
$destDir = "./Parthenon/assets/gfx/logos/converted_startup"
$width = 480
$height = 272

Get-ChildItem -Path $sourceDir -Filter "*.png" | ForEach-Object {
    $image = [System.Drawing.Image]::FromFile($_.FullName)
    $resized = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($resized)
    $graphics.DrawImage($image, 0, 0, $width, $height)
    $resized.Save("$destDir/$($_.Name)")
    $image.Dispose()
    $resized.Dispose()
    $graphics.Dispose()
}
