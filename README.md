# Sky Interior

A boutique interior design studio based in Ahmedabad & Banswara founded by Harshit Suthar and Palak Suthar. Designing spaces around how people actually live day-to-day, rather than chasing fleeting trends.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: Newsreader (editorial serif) & Hanken Grotesk (architectural sans)
- **Language**: TypeScript (strict mode)
- **Form Integration**: Google Apps Script with honeypot bot filtering (`mode: "no-cors"`)

---

## 🏛 Design System

- **Canvas Background**: `#F5F2EC` (warm lime plaster / off-white)
- **Primary Text**: `#1C1B19` (near-black, high contrast)
- **Secondary / Muted Text**: `#736F69`
- **Accent**: `#9C5B3F` (terracotta / clay)
- **Surface**: `#FAF8F5`
- **Borders & Rules**: `#E5DFD5`
- **Geometry**: Sharp 2px corners (`rounded-sm`), zero artificial pill shapes, zero glowing gradients.
- **Motion**: Subtle 400–600ms reveals, max 1.02x hover scaling.

---

## 📁 5-Page Site Structure

1. **Home (`/`)**: Hero, selected work showcase, studio introduction, 4-core services list, 4-step compact process row, and direct contact strip.
2. **Work (`/work` & `/work/[slug]`)**: Curated project grid with category toggle (All / Residential / Commercial) and individual case study detail pages.
3. **Services (`/services`)**: Single folded services breakdown (Residential Interiors, Modular Kitchens & Storage, Commercial & Workspaces, Turnkey Execution) with deliverables, materials, workflows, and FAQs.
4. **Studio (`/studio`)**: Bios for founders Harshit Suthar and Palak Suthar, two studio locations (Ahmedabad & Banswara), and 4 design philosophy pillars.
5. **Contact (`/contact`)**: Protected inquiry form with honeypot spam protection, direct calling, and WhatsApp links.
6. **Privacy (`/privacy`)**: Concise client data handling policy.

---

## 🚀 How to Add a Project

Public case study pages are strictly reserved for genuine work with real photography. Draft projects are excluded from `/work`, Home, sitemap, and `generateStaticParams`.

To publish a real project:

### Step 1: Add Local Photography
Create a folder inside `public/projects/` named after your project slug:
```
public/
  projects/
    shantigram-villa/
      hero.jpg
      01.jpg
      02.jpg
```

### Step 2: Add Entry in `content/projects.json`
Add the project details to `content/projects.json` with `"draft": false` and local image paths:
```json
{
  "slug": "shantigram-villa",
  "name": "Shantigram Villa",
  "category": "Residential",
  "city": "Ahmedabad",
  "size": "3,200 sq. ft.",
  "scope": "Full interior architecture, bespoke joinery",
  "timeline": "6 months",
  "brief": "A family residence planned around natural light and quiet material continuity.",
  "heroImage": "/projects/shantigram-villa/hero.jpg",
  "images": [
    "/projects/shantigram-villa/01.jpg",
    "/projects/shantigram-villa/02.jpg"
  ],
  "closingLine": "A timeless family home balancing durability with quiet elegance.",
  "featured": true,
  "draft": false
}
```

### Step 3: Test and Build
Run build validation to generate the new static case study page:
```sh
npm run build
```
The project will immediately appear at `/work/shantigram-villa`, in `/work`, and on the Home page.

---

## ⚙️ Configuration & Pre-Launch Flags

All primary contact details and launch flags are centralized in [`lib/site.ts`](lib/site.ts):

- **`indexable`**: Set to `false` during staging. When `false`, search engines are blocked via `robots: noindex, nofollow` and `robots.txt Disallow: /`. Flip to `true` at official launch.
- **`showPlaceholders`**: Set to `true` to display subtle "Photography in progress" badges on unphotographed modules during staging.
- **`contact`**: Single source of truth for calling phone (`+91 7726837091`), WhatsApp (`+91 9328414008`), and studio email.

---

## 📝 Contact Form Handler

The contact form posts directly to Google Apps Script. Bot submissions are blocked by checking the hidden `website` honeypot parameter. See complete Apps Script instructions in [`docs/GOOGLE_APPS_SCRIPT.md`](docs/GOOGLE_APPS_SCRIPT.md).

---

## 💻 Local Development

```sh
# Install dependencies
npm install

# Start local dev server (Turbopack)
npm run dev

# Run linter
npm run lint

# Build production bundle
npm run build
```

---

**Sky Interior**  
Ahmedabad (Gujarat) &middot; Banswara (Rajasthan)  
Primary Phone: +91 77268 37091 &middot; WhatsApp: +91 93284 14008
