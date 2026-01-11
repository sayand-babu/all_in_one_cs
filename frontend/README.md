# CodeChallenge - LeetCode-like Coding Platform

A modern, responsive web application for solving coding problems with a clean UI similar to LeetCode. Built with React, Tailwind CSS, and Vite.

## 🚀 Features

- **Problem Browsing**: Browse and filter coding problems by difficulty
- **Code Editor**: In-browser code editor with syntax highlighting
- **Test Cases**: Run and view test case results
- **Problem Navigation**: Easy navigation between problems
- **Responsive Design**: Works seamlessly on desktop and tablet screens
- **Static Data**: Pre-populated with sample problems and test cases
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Navigation header
│   │   ├── ProblemDescription.jsx  # Problem details and examples
│   │   ├── CodeEditor.jsx          # Code editor component
│   │   ├── TestCaseResults.jsx     # Test case results display
│   │   └── ProblemsNav.jsx         # Previous/Next problem navigation
│   ├── pages/
│   │   ├── HomePage.jsx            # Landing page
│   │   ├── ProblemsListPage.jsx    # Problems list view
│   │   └── ProblemPage.jsx         # Individual problem solving page
│   ├── data/
│   │   └── problemsData.js         # Static problems and test cases
│   ├── App.jsx                     # Main routing component
│   ├── main.jsx                    # Entry point
│   └── style.css                   # Tailwind CSS imports
├── index.html                      # HTML entry point
├── package.json                    # Dependencies
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
└── vite.config.js                  # Vite configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation Steps

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5174`

## 📦 Dependencies

### Main Dependencies
- **React** (^18.0.0): UI library
- **React Router DOM** (^6.0.0): Client-side routing
- **Lucide React** (^0.x): Icon library

### Dev Dependencies
- **Vite** (^7.2.4): Build tool and dev server
- **Tailwind CSS** (^3.0): Utility-first CSS framework
- **PostCSS** (^8.0): CSS processing
- **Autoprefixer** (^10.0): CSS vendor prefixing

## 🎯 Pages & Components

### Pages

#### HomePage (`pages/HomePage.jsx`)
- Landing page with hero section
- Features showcase
- Statistics about the platform
- Call-to-action buttons

#### ProblemsListPage (`pages/ProblemsListPage.jsx`)
- Display all available problems in a table
- Filter by difficulty level
- Show acceptance rate and topics
- Quick access links to solve problems

#### ProblemPage (`pages/ProblemPage.jsx`)
- Main problem-solving interface
- Split layout with problem description on left, editor on right
- Test case results display
- Problem navigation buttons

### Components

#### Header (`components/Header.jsx`)
- Navigation bar with logo
- Links to home and problems list
- Sign-in button
- Sticky positioning

#### ProblemDescription (`components/ProblemDescription.jsx`)
- Problem title, difficulty, and acceptance rate
- Full problem description
- Example test cases with explanations
- Problem topics/tags

#### CodeEditor (`components/CodeEditor.jsx`)
- Code textarea with syntax highlighting
- Run code button
- Reset code button
- Language indicator

#### TestCaseResults (`components/TestCaseResults.jsx`)
- Display all test cases
- Show passed/failed status with icons
- Display expected vs actual output
- Loading state during execution

#### ProblemsNav (`components/ProblemsNav.jsx`)
- Navigation to previous/next problems
- Problem counter (X of Y)
- Quick preview of adjacent problems

## 📊 Static Data

All problems and test cases are stored in `src/data/problemsData.js` with the following structure:

```javascript
{
  id: 1,
  title: "Two Sum",
  difficulty: "Easy", // Easy, Medium, Hard
  description: "Problem description...",
  examples: [
    {
      input: "...",
      output: "...",
      explanation: "..."
    }
  ],
  testCases: [
    {
      input: "...",
      expectedOutput: "..."
    }
  ],
  initialCode: "function twoSum(nums, target) { ... }",
  tags: ["Array", "Hash Table"],
  acceptance: "78.5%"
}
```

## 🎨 Styling

The project uses **Tailwind CSS** for all styling:

- Color scheme: Professional blues, greens, yellows, and reds for difficulty levels
- Responsive breakpoints: Mobile-first approach
- Custom components: Buttons, cards, tables styled with Tailwind
- Icon support: Lucide React icons throughout

### Key Tailwind Configuration
- Content paths configured for JSX files
- Base Tailwind utilities imported
- Components and utilities available throughout

## 🔄 Routing

Using React Router v6:

```
/ → HomePage
/problems → ProblemsListPage
/problems/:problemId → ProblemPage (individual problem)
```

## 💡 Features Explained

### Code Execution (Demo)
The code execution is simulated with:
- 1.5 second delay to simulate backend processing
- Random pass/fail for demo purposes
- In production, would send code to backend for actual execution

### Test Case Display
- Shows input and expected output
- Displays actual output after execution
- Color-coded status (green for pass, red for fail)
- Shows loading state during execution

### Problem Navigation
- Previous/Next buttons at bottom
- Disabled when at first/last problem
- Shows problem number counter

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Build
```bash
npm run preview
```

## 🎓 Sample Problems Included

1. **Two Sum** (Easy) - Find two numbers that sum to target
2. **Reverse String** (Easy) - Reverse an array of characters
3. **Fibonacci Sequence** (Medium) - Calculate Fibonacci number
4. **Palindrome Check** (Easy) - Check if string is palindrome

## 🔮 Future Enhancements

- Backend integration for actual code execution
- User authentication and problem submission tracking
- Discussion forums for each problem
- Solution explanations
- Code syntax highlighting
- Multiple language support
- Leaderboards and achievements
- Video tutorials

## 📝 Notes

- Current implementation uses static data for demonstration
- Code execution is simulated with random results
- Can easily be connected to a backend API for real execution
- Tailwind CSS provides excellent customization options
- Component structure allows for easy expansion

## 🤝 Contributing

To add new problems:
1. Edit `src/data/problemsData.js`
2. Add new problem object to the `problemsData` array
3. Follow the existing structure for consistency

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🎉**
