# 🏗️ Application Architecture & Flow

## 📐 Component Hierarchy

```
App (Router)
│
├── Header (Always Visible)
│   ├── Logo & Brand
│   ├── Navigation Links
│   └── Sign In Button
│
├── Routes
│   │
│   ├── Route: / (Home Page)
│   │   └── HomePage
│   │       ├── Hero Section
│   │       ├── Features (4 cards)
│   │       ├── Statistics
│   │       └── CTA Sections
│   │
│   ├── Route: /problems (Problems List)
│   │   └── ProblemsListPage
│   │       ├── Statistics Cards
│   │       └── Problems Table
│   │           └── Links to /problems/:id
│   │
│   └── Route: /problems/:id (Problem Solver)
│       └── ProblemPage
│           ├── Left Panel
│           │   └── ProblemDescription
│           │       ├── Title & Difficulty
│           │       ├── Description
│           │       ├── Examples
│           │       └── Tags
│           │
│           ├── Right Panel
│           │   ├── CodeEditor
│           │   │   ├── Textarea
│           │   │   ├── Language Indicator
│           │   │   ├── Run Button
│           │   │   └── Reset Button
│           │   │
│           │   └── TestCaseResults
│           │       ├── Test Cases List
│           │       ├── Status Icons
│           │       └── I/O Display
│           │
│           └── Bottom
│               ├── Result Banner
│               │   └── Pass/Fail Summary
│               │
│               └── ProblemsNav
│                   ├── Previous Button
│                   ├── Problem Counter
│                   └── Next Button
```

---

## 🔄 Data Flow Diagram

```
User Action
    ↓
Component State (useState)
    ↓
Re-render
    ↓
DOM Update
    ↓
Browser Display
    ↓
User sees result
```

### Example: Running Code
```
User clicks "Run Code"
    ↓
CodeEditor.jsx passes code to ProblemPage.jsx
    ↓
simulateCodeExecution() function called
    ↓
isRunning state set to true
    ↓
1.5 second delay
    ↓
Generate random results
    ↓
setResults() updates state
    ↓
TestCaseResults.jsx re-renders
    ↓
Display results to user
```

---

## 🗂️ File Organization

```
frontend/
│
├── Configuration Layer
│   ├── package.json          ← Dependencies
│   ├── tailwind.config.js    ← Tailwind config
│   ├── postcss.config.js     ← CSS processing
│   └── vite.config.js        ← Build config
│
├── Entry Point
│   ├── index.html            ← HTML entry
│   └── src/main.jsx          ← React entry
│
├── Routing Layer
│   └── src/App.jsx           ← Route definitions
│
├── Page Layer (Full Pages)
│   ├── src/pages/HomePage.jsx
│   ├── src/pages/ProblemsListPage.jsx
│   └── src/pages/ProblemPage.jsx
│
├── Component Layer (Reusable)
│   └── src/components/
│       ├── Header.jsx
│       ├── ProblemDescription.jsx
│       ├── CodeEditor.jsx
│       ├── TestCaseResults.jsx
│       └── ProblemsNav.jsx
│
├── Data Layer
│   └── src/data/
│       └── problemsData.js
│
├── Styling Layer
│   └── src/style.css         ← Tailwind imports
│
└── Documentation Layer
    ├── README.md
    ├── STRUCTURE.md
    ├── FEATURES.md
    ├── QUICK_REFERENCE.md
    ├── API_INTEGRATION_GUIDE.md
    └── SETUP_COMPLETE.md
```

---

## 🔀 Routing Flow

```
User visits http://localhost:5174
    ↓
App.jsx Router initializes
    ↓
Matches "/" route
    ↓
Renders HomePage
    ↓
User sees home page
    ↓
User clicks "Start Coding"
    ↓
Navigate to "/problems"
    ↓
Matches "/problems" route
    ↓
Renders ProblemsListPage
    ↓
User sees problems table
    ↓
User clicks "Solve" on Problem 1
    ↓
Navigate to "/problems/1"
    ↓
Matches "/problems/:problemId" route
    ↓
Renders ProblemPage with id=1
    ↓
User sees problem solver interface
    ↓
User clicks "Next"
    ↓
Navigate to "/problems/2"
    ↓
Same route, different :id param
    ↓
ProblemPage re-renders with new problem
```

---

## 📊 State Management

```
ProblemPage Component State:
├── results: {}                    ← Test results
├── isRunning: false              ← Execution status
└── showResults: false            ← Display results

CodeEditor Component State:
└── code: string                  ← Current code

HomePage Component State:
└── None (static content)

ProblemsListPage Component State:
└── None (static data)

Header Component State:
└── None (navigation links)
```

---

## 🎨 UI Layer Structure

```
┌─────────────────────────────────────────┐
│              HEADER                      │
│  Logo  Problems   Home   Sign In        │
└─────────────────────────────────────────┘
│
├── HomePage
│   ├── Hero Section
│   ├── Features (Grid)
│   ├── Statistics (Grid)
│   └── Footer
│
├── ProblemsListPage
│   ├── Title & Description
│   ├── Statistics Cards (Grid)
│   └── Problems Table
│
└── ProblemPage
    ├── Result Banner (if results)
    ├── Main Content (Flex)
    │   ├── Left Panel (50%)
    │   │   └── ProblemDescription (Scrollable)
    │   │
    │   └── Right Panel (50%)
    │       ├── CodeEditor (Flex)
    │       └── TestCaseResults (Scrollable)
    │
    └── Bottom Navigation
        ├── Prev Button
        ├── Counter
        └── Next Button
```

---

## 🔌 API Integration Points

```
Current Implementation:
ProblemPage.jsx
    └── simulateCodeExecution()
        ├── setIsRunning(true)
        ├── setTimeout(1.5s)
        ├── Generate random results
        ├── setResults(results)
        └── setIsRunning(false)

Future Backend Integration:
ProblemPage.jsx
    └── executeCode(code, testCases)
        ├── Fetch POST /api/execute
        ├── Send: {code, testCases, problemId}
        ├── Receive: {results, status}
        ├── setResults(results)
        └── Display results
```

---

## 🎯 User Journey

```
START
  ↓
Home Page (Intro)
  ↓ "Start Coding"
Problems List (Browse)
  ↓ "Solve" Problem
Problem Solver (Code)
  ↓ "Run Code"
View Results
  ↓ "Next" or "Modify Code"
Either:
  - Go to next problem
  - Continue solving current
  - Reset and try again
```

---

## 💾 Data Flow Examples

### Example 1: Problem Selection
```
ProblemsListPage
    └── problemsData (static)
        └── map() over problems
            └── Create table rows
                └── Links to /problems/:id

User clicks "Solve"
    └── Navigate to /problems/:id
        └── ProblemPage receives :id param
            └── Find problem by id
                └── Pass to ProblemDescription
```

### Example 2: Code Execution
```
CodeEditor
    └── User types code
        └── setCode(code)
            └── State updates

"Run Code" button
    └── onClick handler
        └── simulateCodeExecution(code)
            └── Call backend (or simulate)
                └── Get results
                    └── setResults(results)
                        └── TestCaseResults re-renders
```

### Example 3: Navigation
```
User at /problems/1
    └── Clicks "Next"
        └── React Router updates URL to /problems/2
            └── Route parameter changes
                └── ProblemPage hook detects change
                    └── Fetch new problem
                        └── Re-render page
```

---

## 🔐 Data Security Model

```
Frontend (Browser)
├── Static Data (problemsData.js)
│   ├── Problem descriptions
│   ├── Test cases
│   └── Expected outputs
│
└── User Input
    └── Code submissions
        └── Should be validated

Backend (Server)
├── Real Code Execution
│   ├── Sandbox environment
│   ├── Timeout protection
│   └── Memory limits
│
├── Data Storage
│   ├── User accounts
│   ├── Submissions
│   └── Results
│
└── Security Layer
    ├── Input validation
    ├── Rate limiting
    ├── Authentication
    └── Authorization
```

---

## 📈 Performance Optimization

```
Optimization Strategies:

1. Code Splitting
   └── Each route is lazy loaded

2. CSS Processing
   └── Tailwind optimizes CSS size

3. Asset Caching
   └── Browser caches static files

4. Minification
   └── Build process minifies code

5. Tree Shaking
   └── Vite removes unused code

6. Image Optimization
   └── SVG icons (Lucide React)
```

---

## 🚀 Build & Deploy Flow

```
Development (npm run dev)
    ├── Vite dev server
    ├── HMR (Hot reload)
    ├── Source maps
    └── Full debugging

Production Build (npm run build)
    ├── Vite builds dist/
    ├── Minifies CSS/JS
    ├── Optimizes assets
    ├── Creates source maps
    └── Outputs dist/ folder

Deploy
    ├── Upload dist/ to server
    ├── Set up domain
    ├── Configure backend API
    └── Enable HTTPS
```

---

## 🔄 Component Communication

```
Parent to Child (Props)
───────────────────
Header → (no children)
App → Header, Routes
ProblemPage → ProblemDescription, CodeEditor, TestCaseResults, ProblemsNav

Child to Parent (Callbacks)
───────────────────
CodeEditor.onRun() → passes code to ProblemPage
CodeEditor.onReset() → calls ProblemPage reset

Sibling Communication (Via Parent)
───────────────────
CodeEditor ←→ ProblemPage ←→ TestCaseResults
(Through ProblemPage state and callbacks)
```

---

## 📱 Responsive Design Breakpoints

```
Mobile (< 768px)
├── Single column layout
├── Stacked components
├── Full-width content
└── Touch-friendly buttons

Tablet (768px - 1024px)
├── Adjusted spacing
├── 2-column layout possible
└── Responsive grid

Desktop (> 1024px)
├── Full 50/50 split
├── Optimal spacing
├── All features visible
└── Scrollable panels
```

---

## 🎓 Learning Paths

```
Beginner
├── Understand component structure
├── Learn React basics
├── Understand routing
└── Try modifying styles

Intermediate
├── Add new components
├── Create new problems
├── Modify layouts
└── Add new routes

Advanced
├── Integrate backend API
├── Implement authentication
├── Build new features
└── Deploy to production
```

---

## 📊 Technology Stack Layers

```
Presentation Layer (UI)
├── React Components
├── Tailwind CSS
└── Lucide Icons

Logic Layer
├── React Hooks (state)
├── React Router (routing)
└── JavaScript logic

Data Layer
├── Static data (problemsData.js)
├── Component state
└── URL parameters

Build/Deployment Layer
├── Vite (build)
├── PostCSS (CSS)
└── npm (package manager)
```

---

## 🔗 External Dependencies Map

```
App
├── react
│   ├── React.FC, useState, useEffect
│   └── React components
│
├── react-dom/client
│   └── ReactDOM.createRoot
│
├── react-router-dom
│   ├── BrowserRouter
│   ├── Routes, Route
│   ├── Link, useParams
│   └── useNavigate
│
├── lucide-react
│   ├── Code2, Home, etc.
│   └── Various icons
│
├── tailwindcss (CSS)
│   └── Utility classes
│
└── postcss (CSS processor)
    └── Processes Tailwind
```

---

This architecture provides:
- ✅ **Scalability**: Easy to add features
- ✅ **Maintainability**: Clear structure
- ✅ **Separation of Concerns**: Each layer has purpose
- ✅ **Reusability**: Components can be reused
- ✅ **Performance**: Optimized build
- ✅ **Readability**: Well-organized code
