<!--
	IT Legend Job Task: Next.js Course Player
	Author: Mostafa Mohamed
	Last updated: October 19, 2025
-->

# Next.js Course Player — IT Legend Task

A compact, production-minded course player built with Next.js (App Router), React 19, and TypeScript. This project demonstrates a modular UI, accessible patterns, and client-driven UX for learning platforms: video playback with mobile PiP, curriculum navigation, PDF embedding, exams, comments, and leaderboard.

> Last updated: October 19, 2025

## 🔗 Quick Links

- Live demo: [live Demo](https://course-player-eight.vercel.app/)
- Video demo: [Video Demo](https://drive.google.com/file/d/17_FPdbNnojI_vrmvY8_Mu78Fgjc79E1W/view?usp=sharing)

- Figma File: [Figma File ](https://www.figma.com/design/M6RfSjHqm6glEN1BQR1WFl/ITLegend-Course-Player-Page-Test?node-id=0-1&p=f&t=nPMUCoS28qCk6rwY-0)

## 📑 Table of Contents

- [What you’ll find](#what-youll-find)
- [Architecture & Design](#architecture--design)
- [Key Features](#key-features)
- [Developer Setup](#developer-setup)
- [Code Walkthrough (where to look)](#code-walkthrough-where-to-look)

## 🎯 What you'll find

- A responsive Course page with:
  - Custom video player (playback, volume, seek, PiP, fullscreen)
  - Curriculum sidebar (week/lesson grouping, locked lessons)
  - Course materials panel (duration, topics, price)
  - Comments, exams, and a leaderboard (modal-driven flows)
- PDF integration (react-pdf-viewer) with a simple server-side proxy for Google Drive files
- Client-side state via a custom hook `useCoursePage()` and dynamic imports for heavy pieces

## 🛠️ Architecture & Design

Design goals:

- Composability: Features are grouped under `src/features/*`. Each feature owns its components, hooks, and types.
- Performance: Large viewers (PDF, exam UI) are lazy-loaded using Next.js dynamic imports.

Quick file tour

```bash


└── src
    ├── app
    │   ├── layout.tsx              # global layout, fonts, pdf worker
    │   ├── page.tsx                # route entry (mounts CoursePage)
    │   ├── not-found.tsx
    │   ├── global-error.tsx
    │   └── api/proxy-pdf/route.ts  # server-side PDF proxy
    ├── components
    │   ├── shared
    │   └── ui
    │       ├── button.tsx          # primary UI primitive
    │       └── modal.tsx           # modal primitive used across features
    ├── features
    │   └── course
    │       ├── components/CoursePage.tsx           # main composition
    │       ├── hooks/useCoursePage.ts              # central page state & interactions
    │       ├── features
    │       │   ├── video-player
    │       │   ├── sidebar
    │       │   └── ...other feature modules (comments, ask-question, etc.)
    │       ├── exams
    │       └── pdf-viewer
    ├── lib
    │   └── utils.ts               # utility helpers
    └── features/course/utils/mockCourseData.ts     # demo data

Recommended quick read order:
1. src/features/course/components/CoursePage.tsx
2. src/features/course/hooks/useCoursePage.ts
3. src/features/course/features/video-player/components/VideoPlayer.tsx
4. src/app/layout.tsx
```

Core concepts:

- App layer (`src/app`) wires routes and global layout (fonts, PDF worker tag).
- Feature modules (`src/features/*`) are independent: e.g., `course`, `pdf-viewer`, `exam`.
- Shared UI (`src/components/ui/*`) contains atomic components (Button, Modal, Slider).
- Small server API (`src/app/api/proxy-pdf/route.ts`) safely proxies Google Drive PDFs, returning `application/pdf` to the client.

## ✨ Key Features

- ✅ Responsive video player with a modern control bar and accessible buttons
- ✅ Mobile-first Picture-in-Picture (auto-activated on scroll)
- ✅ Dynamic PDF viewing with a robust viewer (react-pdf-viewer)
- ✅ Exam workflow (questions, timed sessions, scoring)
- ✅ Comments and leaderboard for social proof and user engagement

## 🚀 Developer Setup

Local dev commands:

```bash
pnpm install
pnpm dev      # start dev server

```

Open

```bash
http://localhost:3000
```

Configuration notes:

- `src/app/layout.tsx` inserts a CDN `pdf.worker.min.js` that matches the `pdfjs-dist` version (
  keep these in sync if you upgrade `pdfjs-dist`).
- No environment variables are required for the demo.

## 🔍 Code Walkthrough (where to look)

- Entry: `src/app/page.tsx` — mounts CoursePage
- Composition: `src/features/course/components/CoursePage.tsx` — layout and dynamic imports
- Player: `src/features/course/features/video-player/components/VideoPlayer.tsx` & hooks
- UI primitives: `src/components/ui/*` — Button, Modal, Slider, Textarea
- Local hook: `src/features/course/hooks/useCoursePage.ts` — central UI state for the page
- API: `src/app/api/proxy-pdf/route.ts` — proxy endpoint for PDFs
- Mocks: `src/features/course/utils/mockCourseData.ts` — demo dataset

## 📋 Code Review Guide

Primary signals to check:

- Code structure & modularity: look for feature folders and small reusable UI primitives

Suggested inspection checklist:

1. Open `CoursePage.tsx` and follow how components are dynamically imported and wired.
2. Review `useCoursePage.ts` for client logic.

## 📦 Libraries

Next.js, React 19, TypeScript, Tailwind CSS, Shadcn UI, react-pdf-viewer, lucide-react

## 📬 Contact

📧 Email: [mostafa.mohamed.se@gmail.com](mostafa.mohamed.se@gmail.com)  
🔗 LinkedIn: [LinkedIn](https://linkedin.com/in/mostafa22/)
