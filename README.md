
# 🎯 Playwright UI - Creative Filters & Data Explorer

A React + TypeScript project built with Next.js to demonstrate dynamic filtering, searching, and data visualization for creative performance data. The UI is styled with Tailwind CSS and features modular components, interactive previews, and a custom-designed table interface.

---

## 🚀 Live Demo

🔗 [Hosted Link](https://your-deployment-link.vercel.app)

---

## 🧾 Features Overview

### ✅ Pixel-Perfect UI Implementation
- Based on provided Figma design
- Responsive layout and theme consistency

### 🧩 Filter Panel
- Built in `components/filter-panel.tsx`
- Filters available:
  - `creative_name`, `tags`, `country`, `ad_network`, `os`, `campaign`, `ad_group`
- Supports multi-selection and real-time filtering

### 📊 Data Table
- Located in `components/data-table.tsx`
- Features:
  - Column sorting
  - Search input
  - Styled and structured to fit the Figma theme

### 💬 Row Preview & Modal
- Built in `components/row-preview.tsx`
- Clicking the first cell of any row opens a chat-style preview at the bottom-right
- Optional full modal expansion

### 🔧 UI Components
- Located in `components/ui/`
- Includes:
  - Accordion, Alert, Badge, Button, Card, Checkbox, Calendar, etc.
- Built with accessibility and reusability in mind

---

## 🧱 Folder Structure

```
playwright-ui/
│
├── app/                     # App entry, layout, pages
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/              # Main components
│   ├── filter-panel.tsx
│   ├── data-table.tsx
│   ├── row-preview.tsx
│   └── theme-provider.tsx
│
├── components/ui/           # Custom UI elements
│   ├── button.tsx
│   ├── card.tsx
│   ├── accordion.tsx
│   └── ...
│
├── public/                  # Static files (if any)
│
├── tailwind.config.ts       # TailwindCSS config
├── next.config.mjs          # Next.js config
├── tsconfig.json            # TypeScript config
├── package.json             # Project metadata and scripts
└── ...
```

---

## 📊 Data Columns Used

| Column Name          | Filterable | Sortable |
|----------------------|------------|----------|
| creative_id          | ❌         | ✅        |
| creative_name        | ✅         | ✅        |
| tags                 | ✅         | ❌        |
| country              | ✅         | ✅        |
| ad_network           | ✅         | ✅        |
| os                   | ✅         | ✅        |
| campaign             | ✅         | ✅        |
| ad_group             | ✅         | ✅        |
| ipm                  | ❌         | ✅        |
| ctr                  | ❌         | ✅        |
| spend                | ❌         | ✅        |
| impressions          | ❌         | ✅        |
| clicks               | ❌         | ✅        |
| cpm                  | ❌         | ✅        |
| cost_per_click       | ❌         | ✅        |
| cost_per_install     | ❌         | ✅        |
| installs             | ❌         | ✅        |

---

## ⚙️ Tech Stack

- **Next.js** (App Router)
- **React + TypeScript**
- **Tailwind CSS**
- **Headless UI / Radix UI / Custom Hooks**
- **React Modal / Dialog** for preview and modals

---

## 🧪 How to Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/haxshith/playwright-ui.git
cd playwright-ui
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Run Dev Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📦 Deployment

Deployed using **Vercel** for a fast, optimized web experience.

---

## 👨‍💻 Author

- **Banothu Harshith**
- GitHub: [@haxshith](https://github.com/haxshith)
- LinkedIn: [Banothu Harshith](https://linkedin.com/in/banothuharshith)

---
