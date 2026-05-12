---
name: Corporate Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 24px
  margin: 32px
  max_width: 1440px
---

## Brand & Style
The brand personality of the design system is anchored in reliability, authority, and streamlined efficiency. It is designed for professional environments where clarity of information is paramount, such as high-scale e-commerce management or corporate SaaS platforms. 

The design style follows a **Corporate / Modern** aesthetic. It prioritizes functional minimalism with high-quality typography and a disciplined use of whitespace. The interface avoids unnecessary decorative elements, opting instead for precise alignments, subtle depth through tonal layering, and a crisp "utility-first" appearance that evokes trust and technical competence.

## Colors
The palette is built on a foundation of "Navy" and "Slate" to establish a professional atmosphere. 

- **Primary:** A deep navy (#0F172A) used for high-level navigation, headings, and primary calls to action. It provides the "weight" necessary for a sense of security.
- **Secondary:** A bright, functional blue (#3B82F6) used for interactive states, links, and focused indicators.
- **Neutral/Background:** A range of cool grays starting from a clean white (#FFFFFF) to a light gray (#F8FAFC) for surface backgrounds. 
- **Accents:** Tertiary slates (#64748B) are reserved for secondary text and borders to maintain a low-contrast, easy-on-the-eyes hierarchy.

## Typography
The system uses a pairing of two highly legible sans-serif typefaces. **Manrope** is used for headings to provide a modern, slightly geometric character that remains professional. **Inter** is the workhorse for body text and UI labels, chosen for its exceptional readability in data-heavy environments and its neutral, utilitarian tone.

Text colors should strictly follow hierarchy: Primary Navy for headings, Slate for body text, and Light Slate for metadata/labels.

## Layout & Spacing
This design system utilizes a **Fixed Grid** approach for desktop views to maintain control over information density.

- **Grid:** A 12-column grid with a 24px gutter.
- **Rhythm:** An 8pt linear spacing scale is used for all layout dimensions to ensure mathematical harmony.
- **Containers:** Content is housed in "Surface Containers" with 24px internal padding (md) to separate data modules from the background.
- **Alignment:** All forms and data tables must align to the vertical grid lines to maintain the professional "structured" feel.

## Elevation & Depth
Depth is conveyed primarily through **Tonal Layers** and extremely subtle **Ambient Shadows**.

1.  **Level 0 (Background):** The base layer uses the neutral light gray (#F8FAFC).
2.  **Level 1 (Cards/Containers):** Pure white surfaces (#FFFFFF) with a thin 1px border (#E2E8F0).
3.  **Level 2 (Dropdowns/Popovers):** White surfaces with a soft, diffused shadow (0px 4px 20px rgba(15, 23, 42, 0.08)).
4.  **Level 3 (Modals):** White surfaces with a more pronounced shadow (0px 10px 32px rgba(15, 23, 42, 0.12)).

No heavy gradients or harsh shadows are permitted; the goal is to feel light and organized.

## Shapes
The design system adopts a **Soft** shape language. Elements use a 4px (0.25rem) base radius. This creates a balance between the "sharp" efficiency of corporate software and the "friendly" accessibility of modern e-commerce.

- **Standard Radius:** 4px (Buttons, Inputs, Small Cards).
- **Large Radius:** 8px (Main Dashboard Cards, Modals).
- **Pill Radius:** Only used for status tags (e.g., "Active", "Pending") to differentiate them from interactive buttons.

## Components

### Navigation
- **Sidebar:** For management apps, use a fixed left-hand navy sidebar (#0F172A) with white iconography and medium-weight labels.
- **Top Bar:** For e-commerce, use a clean white header with a bottom border, housing search and account actions.

### Buttons
- **Primary:** Solid Navy background with white text. 4px border radius.
- **Secondary:** White background with Navy border and Navy text.
- **Ghost:** Transparent background with Slate text, turning to a light gray background on hover.

### Form Elements
- **Input Fields:** 1px Slate-200 border, white background. On focus, the border changes to the Secondary Blue with a 2px outer "glow" (0.1 opacity).
- **Labels:** Always placed above the field in `label-md` weight.

### Cards & Tables
- **Tables:** No vertical borders. Use thin horizontal 1px dividers. Header row uses a very light gray background (#F1F5F9).
- **Cards:** Used for grouping related data or product items. Must include a subtle 1px border.

### Chips/Status
- Use pill-shaped backgrounds with low-opacity fills (e.g., light green fill with dark green text) to indicate status without drawing too much attention from the primary actions.