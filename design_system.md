# DESIGN SYSTEM TOKENS

## COLORS
- Background (Deep Charcoal): #0A0A0A
- Surface (Card BG): #171717
- Primary Text: #F3F4F6
- Secondary Text: #9CA3AF
- Accent (Acid Lime): #D4FF00
- Accent Hover: #B8E600
- Error: #FF4D00
- Success: #D4FF00 (Same as accent for this brand)
- Border: 1px solid rgba(255, 255, 255, 0.1)

## TYPOGRAPHY
- Headings: 'Space Grotesk', sans-serif (Weights: 700)
- Body: 'Inter', sans-serif (Weights: 400, 500)

## SHAPES & COMPONENT STYLES
- Border Radius: 0px (Sharp edges everywhere).
- Inputs: Transparent background, Border-Bottom only (1px white/20), No outline on focus, specific focus-visible ring.
- Glassmorphism: backdrop-blur-md bg-white/5.

## UI RULES
1. Buttons: Uppercase labels, font-bold, py-3 px-6.
2. Cards: No drop shadows. Use borders for separation.
3. Mobile First: All grids must be flex-col on mobile and grid-cols-X on desktop.