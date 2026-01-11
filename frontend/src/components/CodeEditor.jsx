import React, { useState } from "react";
import { Code, Play, RotateCcw, Settings } from "lucide-react";

const CodeEditor = ({ initialCode, onRun, onReset, isRunning, language = "javascript" }) => {
  const [code, setCode] = useState(initialCode);

  const handleRun = () => {
    onRun(code);
  };

  const handleReset = () => {
    setCode(initialCode);
    onReset();
  };

  return (
    <div className="bg-black border-2 border-punk-lime h-full flex flex-col">
      <div className="p-4 border-b-2 border-punk-purple flex items-center justify-between bg-punk-darkgray">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-punk-lime" />
          <h3 className="text-lg font-black text-punk-lime uppercase">CODE ARENA</h3>
          <span className="text-sm text-punk-cyan ml-2 font-bold">[ {language} ]</span>
        </div>
        <button className="p-2 hover:bg-punk-lime/20 rounded transition" title="Editor Settings">
          <Settings className="w-5 h-5 text-punk-pink" />
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 p-4 font-mono text-sm text-gray-700 resize-none border-b border-gray-200 focus:outline-none focus:ring-0 bg-gray-50"
          placeholder="Write your code here..."
          spellCheck="false"
        />

        <div className="p-4 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
            disabled={isRunning}
          >
            <RotateCcw className="w-4 h-4" />
            Reset Code
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
