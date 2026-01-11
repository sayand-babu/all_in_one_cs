# Competition Platform - Frontend Architecture Guide

## Overview

This is a production-oriented frontend for a user-hosted coding competition platform built with React, Vite, Tailwind CSS, and React Router. The system allows authenticated users to create and participate in private coding competitions.

## Quick Navigation

### New Contest Pages
- **ContestsListPage** (`src/pages/contest/ContestsListPage.jsx`) - Browse all contests
- **CreateContestPage** (`src/pages/contest/CreateContestPage.jsx`) - Host creates competition
- **ContestDashboard** (`src/pages/contest/ContestDashboard.jsx`) - Live contest view with timer & leaderboard
- **ProblemSolvingPage** (`src/pages/contest/ProblemSolvingPage.jsx`) - Solve problems during contest

### New State Management
- **AuthContext** (`src/contexts/AuthContext.jsx`) - User authentication
- **ContestContext** (`src/contexts/ContestContext.jsx`) - Contest data & submissions

### New Utilities
- **useContestTimer()** - Countdown timer hook
- **useCodeExecution()** - Run code against test cases
- **useSubmissionTracker()** - Track live submissions
- **time.js** - Formatting & time utilities

### New Components
- **ContestComponents.jsx** - Reusable contest UI (ContestCard, ProblemListItem, etc.)

## System Flow

```
User creates contest
    ↓
[CreateContestPage] → Form validation → ContestContext.createContest()
    ↓
Contest created with "scheduled" status
    ↓
Participants receive invitations
    ↓
Participants accept/decline
    ↓
[ContestsListPage] shows all contests
    ↓
At start time, contest becomes "active"
    ↓
[ContestDashboard] displays live view with timer
    ↓
Participant clicks problem → [ProblemSolvingPage]
    ↓
Write code → Run tests → Submit
    ↓
Backend judges code → Updates score & leaderboard
    ↓
At end time, contest becomes "completed"
    ↓
Results visible in leaderboard
```

## File Structure

```
src/
├── contexts/
│   ├── AuthContext.jsx          ← User auth & profile
│   └── ContestContext.jsx       ← Contest state management
│
├── hooks/
│   └── index.js                 ← Custom hooks (timer, execution, etc.)
│
├── pages/
│   └── contest/
│       ├── ContestsListPage.jsx         ← All contests
│       ├── CreateContestPage.jsx        ← Create contest form
│       ├── ContestDashboard.jsx         ← Live contest view
│       └── ProblemSolvingPage.jsx       ← Solve problem
│
├── components/
│   ├── ContestComponents.jsx            ← Reusable contest UI
│   └── Header.jsx               ← Updated with Contests link
│
├── utils/
│   └── time.js                  ← Time formatting & utilities
│
├── types/
│   └── index.js                 ← JSDoc interface definitions
│
├── mock/
│   └── mockData.js              ← Sample data for development
│
└── App.jsx                      ← Updated with new routes
```

## Key Data Models

### Contest
```javascript
{
  id: 'contest-1',
  hostId: 'user-2',
  title: 'Spring Challenge #1',
  description: '...',
  startTime: Date,
  endTime: Date,
  durationMinutes: 180,
  status: 'scheduled' | 'active' | 'completed',
  problems: Problem[],
  participants: ParticipantStatus[],  // track acceptance
  visibility: 'invite-only' | 'private' | 'public'
}
```

### ParticipantStatus
```javascript
{
  userId: 'user-1',
  username: 'alex_developer',
  invitationStatus: 'pending' | 'accepted' | 'declined',
  hasJoined: boolean,
  score: 0,
  rank: 0,
  problemStatuses: {
    'problem-1': 'unsolved' | 'attempted' | 'solved'
  }
}
```

### Submission
```javascript
{
  id: 'submission-1',
  contestId: 'contest-1',
  problemId: 'problem-1',
  userId: 'user-1',
  code: '...',
  language: 'javascript',
  timestamp: Date,
  status: 'accepted' | 'wrong_answer' | 'runtime_error',
  pointsScored: 100,
  executionTime: 45  // ms
}
```

## Routes

```
GET  /contests                          → ContestsListPage
GET  /contest/create                    → CreateContestPage
GET  /contest/:contestId                → ContestDashboard
GET  /contest/:contestId/problem/:pid   → ProblemSolvingPage
```

## Component Usage

### ContestCard
Display contest with key info
```jsx
<ContestCard
  contest={contest}
  onClick={() => navigate(`/contest/${contest.id}`)}
/>
```

### ProblemListItem
Show problem with status indicator
```jsx
<ProblemListItem
  problem={problem}
  status="solved" // or 'attempted', 'unsolved'
  score={100}
  onClick={() => navigate(`/problem/${problem.id}`)}
/>
```

### TestResultItem
Display test case results
```jsx
<TestResultItem
  testCase={testCase}
  result={{passed: true, executionTime: 45}}
  isHidden={false}
/>
```

## Context Hooks

### useAuth()
```javascript
const { currentUser, isAuthenticated, login, logout } = useAuth();
```

### useContest()
```javascript
const {
  contests,
  getContest(id),
  createContest(data),
  updateContest(id, updates),
  submitSolution(contestId, problemId, code, language),
  getLeaderboard(contestId),
  updateParticipantStatus(contestId, userId, status)
} = useContest();
```

### useContestTimer(endTime, onExpire)
```javascript
const timeRemaining = useContestTimer(contest.endTime, () => {
  // Contest expired
});
// timeRemaining = { expired, display, hours, minutes, seconds }
```

### useCodeExecution()
```javascript
const { isRunning, results, error, executeCode } = useCodeExecution();

await executeCode(code, 'javascript', testCases);
```

## Styling Classes

### Neon Effect Classes
- `.neon-box` - Cyan glowing box
- `.tech-button` - Interactive button with hover glow
- `.highlight-neon` - Animated glowing text
- `.shadow-neon` - Cyan shadow effect
- `.shadow-neon-lg` - Larger glow

### Animation Classes
- `.animate-neon-glow` - Pulsing glow effect
- `.animate-pulse-neon` - Cyan pulse
- `.animate-fade-in` - Fade in from top
- `.animate-slide-in` - Slide in from left

### Color Classes
- `text-tech-cyan` - Primary cyan text
- `text-tech-lime` - Accent lime text
- `text-tech-pink` - Warning pink text
- `bg-tech-black` - Dark background

## Mock Data

Located in `src/mock/mockData.js`:

### mockUsers
- `mockUsers.current` - Logged-in user (alex_developer)
- `mockUsers.host` - Contest host (sarah_tech)
- `mockUsers.all` - All available users for selection

### mockProblems
Three sample problems:
1. **Two Sum** (easy, 100 pts)
2. **Reverse Linked List** (medium, 150 pts)
3. **Merge k Sorted Lists** (hard, 250 pts)

### mockContests
Two sample contests:
1. **Spring 2026 Weekly Challenge #1** (scheduled)
2. **Algorithm Mastery Sprint** (completed)

## Backend Integration Points

All `TODO: Backend API call` comments indicate where to integrate:

### Authentication
```javascript
// AuthContext.jsx
TODO: POST /auth/login
TODO: POST /auth/logout
```

### Contests
```javascript
// ContestContext.jsx
TODO: GET /contests
TODO: POST /contests
TODO: PUT /contests/{id}
TODO: POST /contests/{id}/participants
```

### Code Execution
```javascript
// useCodeExecution hook
TODO: POST /judge/execute
TODO: POST /contests/{id}/submit
```

### Real-time Updates (WebSocket)
```javascript
// TODO: Implement
ws://api/contests/{contestId}/live
```

## Development Checklist

- [x] Folder structure created
- [x] Data types defined
- [x] Mock data set up
- [x] Authentication context
- [x] Contest context
- [x] Custom hooks
- [x] All UI components
- [x] All pages
- [x] Routing configured
- [x] Theme styling applied
- [ ] Backend API integration
- [ ] WebSocket real-time updates
- [ ] Error handling
- [ ] Loading states
- [ ] Form validation
- [ ] Mobile responsiveness
- [ ] Unit tests
- [ ] E2E tests

## Next Steps

1. **Connect Backend**: Replace mock data with API calls
2. **Add WebSocket**: Real-time leaderboard & submission updates
3. **Enhance UX**: Loading skeletons, animations, transitions
4. **Add Features**: Drafts, timezones, submissions history
5. **Optimize**: Code splitting, lazy loading, caching
6. **Test**: Unit tests, integration tests, E2E tests

## Important Notes

- All dates/times use JavaScript Date objects
- Durations are in minutes
- Points are integers
- Status uses enums: 'pending' | 'accepted' | 'declined'
- Contest status: 'draft' | 'scheduled' | 'active' | 'completed'
- Problem status: 'unsolved' | 'attempted' | 'solved'
- Submission status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded'

## Support

For questions or improvements, refer to the detailed ARCHITECTURE.md file in the frontend root.
