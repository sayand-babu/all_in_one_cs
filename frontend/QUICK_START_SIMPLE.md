# Quick Start - Frontend Coding Competition Platform

## What You Have

A **clean, static frontend prototype** of a coding competition platform with:
- ✅ Contest listing page
- ✅ Contest dashboard with leaderboard  
- ✅ Code editor with mock execution
- ✅ Simple routing and navigation
- ✅ Neon theme with Tailwind CSS
- ✅ NO authentication or backend calls needed

## How to Run

```bash
cd frontend
npm install    # If you haven't already
npm run dev
```

Visit: http://localhost:5173

## Navigation

```
Home / Problem Practice
    ↓
Contests Page (/contests)
    ↓ Click a contest
Contest Dashboard (/contest/:contestId)
    ↓ Click a problem
Problem Solver (/contest/:contestId/problem/:problemId)
```

## File Structure

```
src/
├── pages/contest/
│   ├── ContestsListPage.jsx      ← Browse contests
│   ├── ContestDashboard.jsx      ← View problems & leaderboard
│   └── ProblemSolvingPage.jsx    ← Write code & test
├── components/
│   └── Header.jsx                ← Navigation
└── App.jsx                        ← Routes
```

## Key Features

### Contest List Page
- Search by title
- Filter by status (All, Upcoming, Active, Completed)
- Click to view contest details

### Contest Dashboard
- **Left**: List of 3 problems with difficulty and points
- **Right**: Leaderboard and participant count
- Click problem → Code editor

### Problem Solver
- **Left**: Problem description and sample test cases
- **Right**: Code editor with language selector
- **Buttons**: Run Code (mock), Submit (mock alert)
- **Results**: Test case pass/fail display

## Mock Data

All hardcoded in components:

**2 Contests:**
- Spring 2026 Weekly Challenge #1 (Scheduled)
- Algorithm Mastery Sprint (Completed)

**3 Problems:**
- Two Sum (Easy, 100 pts)
- Reverse Linked List (Medium, 150 pts)
- Merge k Sorted Lists (Hard, 250 pts)

**2 Leaderboard Entries:**
- jordan_coder (250 pts, Rank 1)
- alex_developer (100 pts, Rank 2)

## How to Test

1. Go to `/contests`
2. See 2 contests listed
3. Click "Spring 2026 Weekly Challenge #1"
4. See 3 problems on left, leaderboard on right
5. Click "Two Sum"
6. See code editor on right
7. Click "Run Code" → See mock test results
8. Click "Submit" → See alert

## What's NOT Implemented (On Purpose)

- ❌ Real code execution
- ❌ Backend API
- ❌ User authentication
- ❌ Database persistence
- ❌ Real-time updates
- ❌ Submission storage

## To Add Backend Later

1. Create API endpoints for contests/problems
2. Replace `MOCK_CONTESTS` with `fetch('/api/contests')`
3. Replace `MOCK_PROBLEMS_MAP` with `fetch('/api/problems/:id')`
4. Add submit handler → POST to `/api/judge/submit`

See `FRONTEND_REFACTOR_COMPLETE.md` for detailed refactoring guide.

---

**That's it! Clean, simple, ready to use.** 🚀
