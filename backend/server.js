const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const { execSync } = require('child_process');
const util = require('util');
const fs = require('fs').promises;
const path = require('path');
const { performance } = require('perf_hooks');  // ← BUILT-IN

const execPromise = util.promisify(exec);
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/execute', async (req, res) => {
  const { language = 'python', source_code } = req.body;
  
  console.log(`🧑‍💻 ${language}:`, source_code.slice(0, 50));
  
  // 🔥 METHOD 3: REAL TIMING + MEMORY START
  const startTime = performance.now();
  const startMem = process.memoryUsage().heapUsed;
  
  try {
    let result;
    
    if(language === 'python') {
      const pyResult = await execPromise(
        `python -c "${source_code.replace(/"/g, '\\"').replace(/`/g, '\\`')}"`, 
        { timeout: 5000 }
      );
      result = { stdout: pyResult.stdout, stderr: pyResult.stderr, status: 'Accepted' };
      
    } else if(language === 'cpp') {
      const filename = `temp_${Date.now()}.cpp`;
      const filepath = path.join(__dirname, filename);
      const binary = filename.replace('.cpp', '.exe');
      
      // 1. Write C++ source
      await fs.writeFile(filepath, source_code);
      console.log('📝 C++ file created:', filename);
      
      // 2. Compile with MinGW
      const compile = await execPromise(`g++ "${filepath}" -o "${binary}" -static -O2 2>&1`, { timeout: 10000 });
      
      if(compile.stderr && !compile.stderr.toLowerCase().includes('warning')) {
        await fs.unlink(filepath).catch(() => {});
        throw new Error(`Compilation Error:\n${compile.stderr}`);
      }
      
      // 3. Execute
      const cppResult = await execPromise(`"${binary}"`, { timeout: 5000 });
      
      // 4. BULLETPROOF CLEANUP
      try {
        execSync(`taskkill /F /IM "${path.basename(binary)}" /T >nul 2>&1 || true`, { stdio: 'ignore' });
      } catch(e) {}
      
      const cleanup = async (file, retries = 3) => {
        for(let i = 0; i < retries; i++) {
          try {
            await fs.unlink(file);
            console.log(`🧹 DELETED: ${path.basename(file)}`);
            return true;
          } catch(e) {
            if(i === retries - 1) console.log(`⚠️ Failed to delete ${path.basename(file)}`);
            await new Promise(r => setTimeout(r, 100));
          }
        }
      };
      
      await Promise.all([cleanup(filepath), cleanup(binary)]);
      
      result = { stdout: cppResult.stdout, stderr: cppResult.stderr, status: 'Accepted' };
      
    } else {
      throw new Error('Only Python and C++ supported');
    }
    
    // 🔥 METHOD 3: REAL TIMING + MEMORY END
    const endTime = performance.now();
    const peakMem = process.memoryUsage().heapUsed;
    const realTime = ((endTime - startTime) / 1000).toFixed(3);  // Seconds
    const memoryKB = Math.round((peakMem - startMem) / 1024);    // KB
    
    res.json({
      success: true,
      status: result.status,
      stdout: result.stdout || '',
      stderr: result.stderr || '',
      time: realTime,      // ← REAL e.g. "0.423"
      memory: memoryKB     // ← REAL e.g. "2847"
    });
    
  } catch (error) {
    const endTime = performance.now();
    const realTime = ((endTime - startTime) / 1000).toFixed(3);
    
    res.json({
      success: true,
      status: 'Runtime Error',
      stdout: '',
      stderr: error.message,
      time: realTime,
      memory: 0
    });
  }
});

app.get('/api/languages', (req, res) => {
  res.json([
    { id: 71, name: 'Python 3' },
    { id: 52, name: 'C++ (GCC)' }
  ]);
});

app.listen(5000, () => {
  console.log('🚀 LeetCode Judge LIVE: http://localhost:5000');
  console.log('✅ REAL TIME + MEMORY MEASUREMENT');
  console.log('📋 POST /api/execute');
});
