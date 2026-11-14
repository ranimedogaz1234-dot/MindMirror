# MindMirror

A premium personality analysis app for discovering personality traits, taking quizzes (including an MBTI-style test and daily mood check-ins), and tracking progress through detailed analytics — built as a fast, mobile-first single-page application.

## Features

- **Google Sign-In** — authentication handled entirely by Firebase Auth (no passwords stored by the app).
- **Trait Discovery** — browse and take short quizzes across multiple personality traits (Openness, Growth Mindset, Natural Leader, Creativity, Discipline, and more).
- **MBTI-Style Test** — a dedicated personality-type assessment screen.
- **Daily Mood Check-In** — a quick daily mood quiz that builds a mood history over time.
- **Analytics Dashboard** — charts and progress visualizations (via Recharts) summarizing quiz results and trends.
- **Streaks & Profile** — per-user profile with activity streaks, synced in real time.
- **Polished UI/UX** — smooth animations (Motion/Framer Motion), toast notifications, and a mobile-first bottom navigation layout.

## Screenshots

> _Add screenshots of the app here before publishing — e.g. `screenshots/home.png`, `screenshots/analytics.png`, `screenshots/quiz.png` — then reference them like:_
>
> ```markdown
> | Home | Analytics | Quiz |
> |---|---|---|
> | ![Home](screenshots/home.png) | ![Analytics](screenshots/analytics.png) | ![Quiz](screenshots/quiz.png) |
> ```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Backend / Data | [Firebase](https://firebase.google.com/) (Authentication + Cloud Firestore) |
| Animation | [Motion](https://motion.dev/) (Framer Motion) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |

The app is a **pure client-side SPA** — there is no custom backend server; all data access goes directly from the browser to Firebase, secured by Firestore security rules.

## Project Structure

```
src/
├── components/     # Reusable UI components (BottomNav, MainLayout, TraitCard)
├── providers/      # React context providers (AuthProvider, DataProvider)
├── screens/        # Top-level screens (Home, Quiz, MBTI Test, Mood Quiz, Traits, Analytics, Profile, Auth, Splash)
├── lib/            # Firebase initialization and utility helpers
├── constants.ts    # Static trait definitions
├── questions.ts    # Quiz question banks
└── types.ts        # Shared TypeScript types

firestore.rules             # Firestore security rules (default-deny, per-user ownership)
firebase-applet-config.json # Firebase web app configuration (public client config)
firebase-blueprint.json     # Data model reference for Firestore collections
```

## Installation & Running Locally

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/MindMirror.git
cd MindMirror

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

The app will be available at `http://localhost:3000`.

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview

# Type-check the project
npm run lint
```

No environment variables are required to run the app locally — see [.env.example](.env.example) for details on why, and on using your own Firebase project.

## Firebase Configuration & Security

This app connects to Firebase using the values in [`firebase-applet-config.json`](firebase-applet-config.json). These values (`apiKey`, `authDomain`, `projectId`, etc.) are **public client identifiers**, not secrets — Firebase web apps are designed to ship this configuration in the client bundle. Actual data access is secured server-side by:

1. **Firebase Authentication** — only signed-in users (via Google Sign-In) can read or write any data.
2. **Firestore Security Rules** ([`firestore.rules`](firestore.rules)) — enforce:
   - A default-deny rule on every document.
   - Per-user ownership checks (`request.auth.uid`) on the `users`, `results`, and `daily_moods` collections, so a user can only read or write their own data.
   - Field-level validation (type, size, and shape) on every write.
   - Read-only, authenticated-only access to shared reference data (`traits`, `quizzes`, `personality_types`).
   - No `update`/`delete` permissions on historical records (`results`, `daily_moods`), so quiz/mood history is append-only.

If you deploy this project to your own Firebase project, make sure to deploy the rules file as well:

```bash
firebase deploy --only firestore:rules
```

## License

This project is provided as-is for portfolio and educational purposes.
