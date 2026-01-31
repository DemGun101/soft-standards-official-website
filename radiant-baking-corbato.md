# Brand Guidelines Implementation Plan

## Overview
Implement Soft Standards Inc. brand guidelines into the existing 6-page agency website, replacing current emerald green theme with the official purple/violet brand identity.

## Project Status (To be documented in progress.md)

### Completed ✓
- HTML structure for all 6 pages (index, services, case-studies, about, blog, careers)
- CSS design system with comprehensive styling
- UI layout and component structure
- Responsive design implementation

### In Progress
- Brand guidelines implementation

### Pending
- Logo integration
- Color scheme replacement
- Typography update
- Content alignment with brand messaging

## Brand Guidelines Summary

### Visual Identity
- **Logo**: Geometric "S" mark with 6 rounded blocks (Golden Ratio construction)
- **Company**: Soft Standards Inc.
- **Tagline**: "The New Standard in Digital Marketing"
- **Designer**: DEM

### Color Palette (Replace Emerald with Purple/Violet)
```
Primary Colors:
- Pastel Purple Glow: #A38FF9 (was: emerald-500 #10b981)
- Royal Violet Blue: #5B3BF4 (was: emerald-600 #059669)
- Soft Lavender White: #F7F5FE (was: off-white #f8faf9)
- Navy Black: #00002D (was: gray-900 #0a0a0a)

Supporting Shades (to be created):
- Purple-50: #F3F1FE (lightest)
- Purple-100: #E0DCFE
- Purple-200: #C7C0FD
- Purple-400: #8B7AF6
- Purple-500: #5B3BF4 (primary)
- Purple-600: #4A2FD9
- Purple-700: #3922B8
- Purple-800: #2D1B8F
- Purple-900: #1A0F5C
```

### Typography (Replace Inter with Poppins)
```
Current: Inter (400, 500, 600, 700, 800)
New: Poppins (Thin, Regular, Medium, Semi Bold, Bold, Extra Bold)
Google Fonts URL: https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700;800&display=swap
```

### Services/Offerings
- AI Automation
- Branding
- Digital Marketing
- Web Development
- App Development

## Implementation Steps

### Phase 1: Create Progress Documentation
**File**: `progress.md`

Create a markdown file documenting:
- [x] HTML structure completed (6 pages)
- [x] CSS design system completed
- [x] UI layout and components completed
- [x] Responsive design implemented
- [ ] Brand guidelines implementation started
- [ ] Color scheme updated
- [ ] Typography updated
- [ ] Logo assets integrated
- [ ] Content updated with brand messaging

### Phase 2: Asset Preparation
**Files to create**: `/assets/` folder structure

1. **Create assets directory structure**:
   ```
   /assets
     /images
       - logo.svg (extract/recreate from guidelines)
       - logo-dark.svg (Navy Black version)
       - logo-light.svg (White version)
       - logo-icon.svg (S mark only)
     /fonts (if using local fonts)
   ```

2. **Logo implementation notes**:
   - The logo is a geometric "S" made of 6 rounded rectangular blocks
   - Uses Golden Ratio proportions
   - Available in multiple variations (full logo, icon only, light/dark versions)
   - Need to create SVG versions for web use

### Phase 3: CSS Variables Update
**File**: `styles.css` (lines 1-100)

Replace entire color system in `:root`:

```css
/* OLD - Emerald Theme */
--emerald-500: #10b981;
/* ... all emerald colors ... */

/* NEW - Purple/Violet Theme */
--purple-50: #F3F1FE;
--purple-100: #E0DCFE;
--purple-200: #C7C0FD;
--purple-glow: #A38FF9;    /* Pastel Purple Glow */
--purple-400: #8B7AF6;
--purple-500: #5B3BF4;     /* Royal Violet Blue - Primary */
--purple-600: #4A2FD9;
--purple-700: #3922B8;
--purple-800: #2D1B8F;
--purple-900: #1A0F5C;

--lavender-white: #F7F5FE; /* Soft Lavender White */
--navy-black: #00002D;     /* Navy Black */

/* Update text colors */
--text-primary: #00002D;   /* Navy Black */
--text-secondary: #1A0F5C; /* Purple-900 */
```

### Phase 4: Typography Update
**File**: `styles.css` (lines 1-50)

1. Replace Google Fonts import:
```css
/* OLD */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

/* NEW */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700;800&display=swap');
```

2. Update font-family declarations:
```css
body {
  font-family: 'Poppins', sans-serif; /* was: 'Inter' */
}
```

### Phase 5: Component Color Updates
**File**: `styles.css` (throughout)

Update all instances of emerald colors to purple:

1. **Buttons** (lines ~200-300):
   - `.btn-primary`: background from emerald-500 → purple-500
   - Hover states: emerald-600 → purple-600
   - Shadows: emerald glow → purple glow

2. **Cards** (lines ~400-600):
   - Accent bars: emerald-500 → purple-500
   - Hover borders: emerald-500 → purple-500

3. **Navigation** (lines ~100-200):
   - Active link color: emerald-500 → purple-500
   - Mobile menu background adjustments

4. **Backgrounds** (throughout):
   - Hero sections with emerald gradients → purple gradients
   - CTA sections: emerald backgrounds → purple backgrounds
   - Accent elements: emerald → purple

5. **Gradients** (search for "linear-gradient"):
   - Update all emerald gradient stops to purple equivalents
   - Example: `linear-gradient(135deg, #10b981 0%, #047857 100%)`
     → `linear-gradient(135deg, #5B3BF4 0%, #3922B8 100%)`

### Phase 6: Logo Integration
**Files**: All HTML files (6 files)

1. **Navigation Logo** (in all pages):
```html
<!-- OLD -->
<a href="index.html" class="logo">SOFT STANDARDS</a>

<!-- NEW -->
<a href="index.html" class="logo">
  <img src="assets/images/logo.svg" alt="Soft Standards Inc." height="32">
</a>
```

2. **Footer Logo** (in all pages):
   - Add logo image above company name
   - Update to "Soft Standards Inc."

3. **Favicon** (in all pages):
```html
<link rel="icon" type="image/svg+xml" href="assets/images/logo-icon.svg">
```

### Phase 7: Content Updates
**Files**: All HTML files

1. **Homepage** (`index.html`):
   - Update hero tagline to: "The New Standard in Digital Marketing"
   - Update company description to match brand mission/vision
   - Add brand messaging about SaaS model for digital marketing

2. **Services Page** (`services.html`):
   - Ensure services match brand guidelines:
     - AI Automation
     - Branding
     - Digital Marketing
     - Web Development
     - App Development

3. **About Page** (`about.html`):
   - Update mission statement
   - Update vision statement
   - Align company values with brand identity

4. **All Pages**:
   - Replace "Soft Standards" with "Soft Standards Inc." where appropriate
   - Ensure messaging consistency

### Phase 8: Shadow & Effects Updates
**File**: `styles.css`

Update shadow variables to use purple tones:
```css
/* OLD */
--shadow-emerald: 0 4px 20px rgba(16, 185, 129, 0.3);
--shadow-emerald-lg: 0 8px 30px rgba(16, 185, 129, 0.4);

/* NEW */
--shadow-purple: 0 4px 20px rgba(91, 59, 244, 0.3);
--shadow-purple-lg: 0 8px 30px rgba(91, 59, 244, 0.4);
--shadow-glow: 0 4px 20px rgba(163, 143, 249, 0.4);
```

### Phase 9: Background Updates
**File**: `styles.css`

Update background colors:
```css
/* OLD */
background-color: #f8faf9; /* off-white */

/* NEW */
background-color: #F7F5FE; /* Soft Lavender White */
```

Update dark sections:
```css
/* OLD */
background: #0a0a0a; /* gray-900 */

/* NEW */
background: #00002D; /* Navy Black */
```

## Critical Files to Modify

1. **styles.css** - Complete color system overhaul
2. **index.html** - Logo, tagline, hero content
3. **services.html** - Service offerings alignment
4. **case-studies.html** - Logo, color accents
5. **about.html** - Mission/vision statements
6. **blog.html** - Logo, color accents
7. **careers.html** - Logo, color accents, brand culture
8. **progress.md** - NEW file to create

## Logo Usage Guidelines (from brand guide)

**DO:**
- Keep proper spacing around logo
- Use approved color variations only
- Maintain proper proportions
- Use on appropriate backgrounds

**DON'T:**
- Make typography too small or too large
- Scale inconsistently
- Rotate the logo
- Stretch typography and icon unnaturally
- Distort the icon vertically
- Place icon on right side of text
- Place text below icon
- Add shadows or effects to logo
- Place typography beside app icon version

## Verification Checklist

After implementation, verify:

1. **Visual Consistency**:
   - [ ] All emerald greens replaced with purple/violet
   - [ ] Logo appears correctly on all pages
   - [ ] Poppins font loads and displays properly
   - [ ] Color contrast meets accessibility standards

2. **Brand Alignment**:
   - [ ] Tagline matches: "The New Standard in Digital Marketing"
   - [ ] Services match brand guidelines
   - [ ] Mission/vision statements updated
   - [ ] Company name consistently "Soft Standards Inc."

3. **Technical**:
   - [ ] All images load correctly
   - [ ] No broken styles or layout issues
   - [ ] Responsive design still works
   - [ ] CSS variables properly updated
   - [ ] Gradients render correctly
   - [ ] Hover states use new purple colors

4. **Cross-page Consistency**:
   - [ ] Navigation matches on all 6 pages
   - [ ] Footer matches on all 6 pages
   - [ ] Color scheme consistent across all pages
   - [ ] Typography consistent across all pages

## Notes

- The logo will need to be recreated as SVG since we can't extract it from the PDF
- Consider creating multiple logo variations (light, dark, icon-only) for different contexts
- Purple color scheme provides good contrast with white/lavender backgrounds
- Navy Black (#00002D) provides strong contrast for text readability
- Poppins font is modern and professional, suitable for tech/SaaS brand
- Keep existing layout structure and components, only update visual styling

## Expected Outcomes

After implementation:
- Modern purple/violet brand identity throughout
- Professional Poppins typography
- Consistent brand messaging
- Logo properly integrated in navigation, footer, and favicon
- All 6 pages visually cohesive with brand guidelines
- Maintained responsive design and functionality
