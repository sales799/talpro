# PWA Icons Setup Guide

## Required Icons

The PWA implementation requires the following icon files in the `client/public` directory:

1. **pwa-icon-192.png** (192x192 pixels)
2. **pwa-icon-512.png** (512x512 pixels)

## Icon Requirements

### Maskable Icons
These icons should be designed as "maskable" icons following PWA best practices:

- **Safe Zone**: Keep important content within the center 80% (160x160px for 192px icon, 410x410px for 512px icon)
- **Full Bleed**: The icon should fill the entire canvas with no transparency in corners
- **Background Color**: Use TalPro brand color (#0A0F1E) or (#D4AF37) as background
- **Logo Placement**: Center the TalPro logo with adequate padding

### Color Scheme
- **Primary Background**: #0A0F1E (dark navy)
- **Accent Color**: #D4AF37 (gold)
- **Logo**: White or gold logo on dark background

## How to Create PWA Icons

### Option 1: Using Existing Logo
Source files available in `attached_assets/`:
- `talprologo_1758602345062.png`
- `TalproNewLogo_1758602623135.png`
- `TalproLG1_1758602854563.jpeg`

### Option 2: Online Tools
Use PWA icon generators:
1. **PWA Asset Generator**: https://github.com/elegantapp/pwa-asset-generator
2. **RealFaviconGenerator**: https://realfavicongenerator.net/
3. **Maskable.app**: https://maskable.app/editor

### Option 3: Manual Creation (Figma/Photoshop)

#### For 192x192px Icon:
1. Create a 192x192px canvas
2. Fill background with #0A0F1E
3. Place TalPro logo in center (max 160x160px)
4. Ensure 16px padding on all sides
5. Export as PNG

#### For 512x512px Icon:
1. Create a 512x512px canvas
2. Fill background with #0A0F1E
3. Place TalPro logo in center (max 410x410px)
4. Ensure 51px padding on all sides
5. Export as PNG

## Additional Screenshots (Optional)

For enhanced PWA experience, create these screenshots:

1. **screenshot-wide.png** (1280x720 pixels)
   - Desktop/tablet view of homepage
   - Landscape orientation

2. **screenshot-mobile.png** (750x1334 pixels)
   - Mobile view of homepage
   - Portrait orientation

## Testing Your Icons

After creating the icons:

1. Place them in `client/public/` directory
2. Clear browser cache
3. Open Chrome DevTools
4. Go to Application > Manifest
5. Verify icons appear correctly
6. Test maskable appearance using Maskable.app

## Quick Test Icon

For immediate testing, you can use a temporary placeholder:
- Create a solid square with TalPro brand colors
- Add text "T" or "TP" in center
- Save as both required sizes

This will allow you to test PWA functionality while professional icons are being designed.
