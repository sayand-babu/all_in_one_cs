# 🚀 Quick Start & Reference Guide

## Installation & Running

### 1. Prerequisites
- Node.js v14+
- npm installed

### 2. Setup Commands
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (only first time)
npm install

# Start development server
npm run dev

# Server will run on http://localhost:5174
```

### 3. Build for Production
```bash
npm run build       # Creates optimized build in 'dist/' folder
npm run preview     # Preview production build locally
```

---

## 📍 File Navigation

### Main Application Files
```
frontend/src/
├── App.jsx                    # Main router
├── main.jsx                   # Entry point
├── style.css                  # Tailwind imports
│
├── pages/
│   ├── HomePage.jsx           # Landing page
│   ├── ProblemsListPage.jsx   # All problems
│   └── ProblemPage.jsx        # Problem solver
│
├── components/
│   ├── Header.jsx             # Navigation
│   ├── ProblemDescription.jsx # Problem details
│   ├── CodeEditor.jsx         # Code input
│   ├── TestCaseResults.jsx    # Results display
│   └── ProblemsNav.jsx        # Problem navigation
│
└── data/
    └── problemsData.js        # Static problems
```

---

## 🔗 Routes & URLs

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | HomePage | Landing page |
| `/problems` | ProblemsListPage | Browse all problems |
| `/problems/1` | ProblemPage | Solve problem 1 |
| `/problems/2` | ProblemPage | Solve problem 2 |
| `/problems/3` | ProblemPage | Solve problem 3 |
| `/problems/4` | ProblemPage | Solve problem 4 |

---

## 🎮 How to Use the App

### From Home Page
1. Click "Start Coding" button
2. Redirects to `/problems` page

### From Problems List
1. View all 4 sample problems in table
2. Click "Solve" button on any problem
3. Taken to `/problems/:id` page

### While Solving Problem
1. **Left side**: Read problem description
2. **Right side top**: Edit code in editor
3. **Right side bottom**: View test cases
4. Click "Run Code" button
5. See results in test cases (green = pass, red = fail)
6. Modify code and try again
7. Click "Reset Code" to start over

### Navigation Between Problems
1. Use "Previous" button at bottom (if not first)
2. Use "Next" button at bottom (if not last)
3. Or go to `/problems` and select another

---

## 📝 Adding New Problems

### Step 1: Edit problemsData.js
```javascript
// In src/data/problemsData.js, add to problemsData array:

{
  id: 5,  // Next available ID
  title: "Problem Title",
  difficulty: "Easy",  // Easy, Medium, or Hard
  description: "Full problem description...",
  examples: [
    {
      input: "example input",
      output: "expected output",
      explanation: "why this is the answer"
    }
  ],
  testCases: [
    {
      input: "test input",
      expectedOutput: "expected output"
    }
  ],
  initialCode: `function solve(param) {\n  // Your code here\n}`,
  tags: ["Tag1", "Tag2"],
  acceptance: "75.5%"
}
```

### Step 2: Test
```bash
npm run dev  # Server auto-refreshes
# Navigate to /problems/5
# Problem automatically appears in list and solver
```

---

## 🎨 Customizing Styles

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Modify Spacing
```javascript
theme: {
  extend: {
    spacing: {
      sm: '2px',
      md: '4px',
      lg: '8px',
    }
  }
}
```

### Common Tailwind Classes
```css
/* Sizing */
w-full, h-full, w-1/2, h-64

/* Colors */
bg-blue-600, text-gray-900, border-gray-200

/* Spacing */
p-4, m-4, gap-2, gap-4

/* Layout */
flex, grid, block, inline-block

/* Effects */
rounded-lg, shadow-lg, hover:bg-gray-100

/* Responsive */
md:w-1/2, lg:w-1/3, sm:flex-col
```

---

## 🐛 Troubleshooting

### Dev Server Won't Start
```bash
# Kill any existing Node processes
# Windows:
Get-Process node | Stop-Process -Force

# Then restart:
npm run dev
```

### Port 5173/5174 Already in Use
```bash
# Vite automatically tries next port (5174, 5175, etc.)
# Or kill the process using that port
```

### Styles Not Showing
```bash
# Clear browser cache (Ctrl+Shift+Delete)
# Or hard refresh (Ctrl+Shift+R)
# Check that tailwind.config.js exists
```

### Components Not Rendering
1. Check browser console for errors (F12)
2. Verify file paths in imports
3. Ensure all dependencies installed (`npm install`)
4. Check that component files exist

### React Router Issues
1. Verify routes in `App.jsx`
2. Check path syntax matches URLs
3. Ensure `BrowserRouter` wraps the app
4. Verify `<Routes>` and `<Route>` structure

---

## 📦 Installed Packages

### Main Dependencies
```
react                  - UI library
react-dom              - React DOM rendering
react-router-dom       - Client-side routing
lucide-react           - Icon library
```

### Dev Dependencies
```
vite                   - Build tool
tailwindcss            - CSS framework
postcss                - CSS preprocessor
autoprefixer           - CSS vendor prefixes
```

### Install More Packages
```bash
npm install package-name      # Production
npm install -D package-name   # Development
```

---

## 🔧 Common Tasks

### Modify Header/Navigation
File: `src/components/Header.jsx`
- Change logo text
- Add new menu items
- Modify colors
- Change button text

### Add New Component
1. Create `src/components/ComponentName.jsx`
2. Export component
3. Import in parent component
4. Use in JSX

### Change Problem Details
File: `src/data/problemsData.js`
- Edit existing problem
- Add new problem
- Change test cases
- Update descriptions

### Modify Problem Page Layout
File: `src/pages/ProblemPage.jsx`
- Change split ratio (w-1/2 to w-1/3, etc)
- Add new sections
- Reorder components
- Adjust sizing

---

## 📊 Component Props Reference

### ProblemDescription
```javascript
<ProblemDescription problem={problemObject} />

// problem object structure:
{
  id, title, difficulty, description, examples, tags, acceptance
}
```

### CodeEditor
```javascript
<CodeEditor 
  initialCode={string}
  onRun={(code) => {}}
  onReset={() => {}}
  isRunning={boolean}
  language="javascript"
/>
```

### TestCaseResults
```javascript
<TestCaseResults 
  testCases={array}
  isRunning={boolean}
  results={object}
/>

// results object:
{ 0: { status: 'passed', output: '...' }, ... }
```

### ProblemsNav
```javascript
<ProblemsNav currentProblemId={number} />
```

---

## 🚀 Performance Tips

### Optimize Bundle
```bash
npm run build          # Creates production build
# Check dist/ folder for file sizes
```

### Code Splitting
- Each page route is automatically code-split
- Components loaded on demand
- Minimal initial load

### Caching
- Tailwind CSS utilities are cached
- Build output is cached
- Browser caches assets

---

## 📚 Learning Resources

### React
- https://react.dev
- Official React documentation
- Hooks guide
- Router docs

### Tailwind CSS
- https://tailwindcss.com
- Utility class reference
- Component examples
- Configuration guide

### Vite
- https://vitejs.dev
- Build optimization
- Plugin system
- Configuration

---

## 🔐 Security Considerations

### For Production
1. Add input validation
2. Implement authentication
3. Add rate limiting
4. Sanitize user inputs
5. Use HTTPS
6. Implement CORS properly
7. Add error logging
8. Monitor usage

### Backend Security
- Validate code submissions
- Implement code sandboxing
- Use timeouts for execution
- Monitor resource usage
- Rate limit submissions

---

## 📈 Next Steps

### Short Term
1. ✅ Explore the UI
2. ✅ Try all features
3. ✅ Run code on problems
4. ✅ Navigate between problems

### Medium Term
1. Add backend API integration
2. Implement user authentication
3. Add code language support
4. Create database for submissions
5. Add syntax highlighting

### Long Term
1. Build community features
2. Add discussion forums
3. Create leaderboards
4. Support multiple languages
5. Add video tutorials

---

## 💡 Code Examples

### Adding a New Button
```jsx
<button 
  onClick={() => handleClick()}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  Click Me
</button>
```

### Creating New Component
```jsx
// NewComponent.jsx
const NewComponent = ({ prop1, prop2 }) => {
  return (
    <div className="p-4 bg-white rounded-lg">
      <p>{prop1}</p>
      <p>{prop2}</p>
    </div>
  );
};

export default NewComponent;
```

### Adding Route
```jsx
// In App.jsx
<Route path="/new-page" element={<NewPage />} />
```

---

## 🎯 Quick Checklist

- [x] Install dependencies
- [x] Start dev server
- [x] View home page
- [x] Browse problems
- [x] Solve a problem
- [x] Run code
- [x] Navigate problems
- [x] Customize styling
- [x] Add new problem
- [x] Build for production

---

## 📞 Support Resources

### Common Issues
- Check console for errors (F12)
- Read error messages carefully
- Check file paths
- Verify syntax
- Check network requests

### Getting Help
- VS Code IntelliSense (Ctrl+Space)
- Documentation links above
- React error messages are helpful
- Browser DevTools (F12)

---

## 🎉 You're Ready!

Everything is set up and working. Start exploring and building!

**Happy Coding! 🚀**
