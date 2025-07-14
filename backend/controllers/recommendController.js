import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRecommendations = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title required' });
  }

  // ✅ Correct full path to recommend.py inside ai folder
  const pythonScriptPath = path.join(__dirname, '..', 'ai', 'recommend.py');

  // ✅ Spawn Python process with movie title as argument
  const python = spawn('python', [pythonScriptPath, title]);

  let data = '';

  // ✅ Collect Python stdout data
  python.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  // ✅ Log Python errors
  python.stderr.on('data', (err) => {
    console.error("❌ Python error:", err.toString());
  });

  // ✅ When process finishes, send result
  python.on('close', () => {
    try {
      const result = JSON.parse(data);
      res.json(result);
    } catch (e) {
      console.error("❌ JSON Parse Error:", e.message);
      res.status(500).json({ error: "Failed to parse Python output" });
    }
  });
};
