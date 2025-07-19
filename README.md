# Personalized-Content-Dashboard

# Overview
A dynamic dashboard that displays personalized content from news, movie recommendations, and social media posts. Users can customize their feed, search content, save favorites, and organize cards via drag-and-drop. Built with React, Next.js, TypeScript, and Redux Toolkit.

# Features
📰 Personalized content feed from 3 APIs (News, Movies, Social)

⚙️ User preference customization

🔍 Debounced search across all content

⭐ Favorite content saving

🖱️ Drag-and-drop card organization

🌙 Dark/light mode toggle

♾️ Infinite scrolling

🌐 Multi-language support (English/Spanish)

# Tech Stack
Frontend: React 18, Next.js 14, TypeScript

State Management: Redux Toolkit, Redux Persist

Styling: Tailwind CSS, CSS Modules

Animation: Framer Motion

Testing: Jest, React Testing Library, Cypress

APIs: NewsAPI, TMDB, Mock Social API

# Setup Instructions
Clone repository:

bash
git clone https://github.com/yourusername/personalized-dashboard.git
cd personalized-dashboard

# Install dependencies:

bash
npm install
# or
yarn install

# Set up environment variables:
Create .env.local file:
env
NEWS_API_KEY=your_newsapi_key_here
TMDB_API_KEY=your_tmdb_key_here
NEXT_PUBLIC_SOCIAL_API=https://mock-social-api.example.com

# Run development server:
bash
npm run dev
or
yarn dev

# Run tests:

bash
Unit tests
npm test
E2E tests (first launch Cypress)
npm run cypress:open

# User Flow
Initial Setup:

On first visit, user selects preferred content categories

Preferences saved in localStorage

# Dashboard Interaction:
graph TD
    A[Landing Page] --> B[Category Selection]
    B --> C[Dashboard View]
    C --> D[Content Feed]
    C --> E[Trending Section]
    C --> F[Search Functionality]
    D --> G[Save Favorite]
    D --> H[Drag to Reorder]
    C --> I[Toggle Dark Mode]

# Key Interactions:

🔍 Type in search bar to filter content

❤️ Click heart icon to save favorites

🖱️ Drag cards to reorganize feed

🌙 Use theme toggle in header

🌐 Change language via dropdown

# API Documentation
NewsAPI:

Endpoint: /v2/top-headlines

Parameters: category=technology&pageSize=20

TMDB API:

Endpoint: /3/discover/movie

Parameters: sort_by=popularity.desc

Mock Social API:

Endpoint: /posts

Returns mock data with hashtags

# Testing Strategy
Test Type	Coverage	Tools Used
Unit Tests	Components, reducers, utilities	Jest, Testing Lib
Integration	API fetching, state updates	Mock Service Worker
E2E	User workflows, UI interactions	Cypress
Performance	Loading, rendering metrics	Lighthouse.

# Project Structure
src/
├── app/            # Next.js app router
├── components/     # Reusable UI components
├── features/       # Redux slices and API logic
├── hooks/          # Custom hooks
├── lib/            # Third-party integrations
├── store/          # Redux store configuration
├── styles/         # Global CSS and themes
├── tests/          # Test suites
└── utils/          # Helper functions

# Future Improvements
Implement user authentication

Add real-time updates via WebSockets

Include content recommendation engine

Add social sharing features

Implement push notifications for new content

# Troubleshooting
API Errors: Verify API keys in .env.local

Styling Issues: Run npm run build:css for Tailwind

Test Failures: Ensure mock APIs are running

Drag-and-Drop: Check browser compatibility (works in Chrome/Firefox)
