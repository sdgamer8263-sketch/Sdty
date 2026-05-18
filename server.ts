import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Enable CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });

  const requestLogs: any[] = [];
  app.use((req, res, next) => {
    requestLogs.push({ method: req.method, url: req.url, body: req.body, time: new Date().toISOString() });
    if (requestLogs.length > 50) requestLogs.shift();
    next();
  });

  app.get('/api/logs', (req, res) => res.json(requestLogs));

  const dbPath = path.join('/tmp', 'users.json');

  // Memory fallback in case /tmp is not writable
  let memoryDB = [];

  // Helper to read db
  const readDB = () => {
    try {
      if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify([]));
      }
      return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch (e) {
      console.warn('File system read/write failed, using memory fallback.', e.message);
      return memoryDB;
    }
  };

  const writeDB = (data) => {
    try {
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
      memoryDB = data; // Keep in sync
    } catch (e) {
      console.warn('File system read/write failed, using memory fallback.', e.message);
      memoryDB = data;
    }
  };

  // API: Register
  app.post("/api/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const users = readDB();
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ error: "Account with this email already exists." });
    }

    users.push({ name, email, password });
    writeDB(users);

    res.json({ success: true, message: "Registration successful" });
  });

  // API: Login
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const users = readDB();

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    res.json({ success: true, user: { name: user.name, email: user.email } });
  });

  // API: Get user profile
  app.get("/api/user", (req, res) => {
    const email = req.query.email;
    const users = readDB();
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ user: { name: user.name, email: user.email } });
  });

  // Global Error Handler for API
  app.use('/api', (err, req, res, next) => {
    console.error('API Error:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  });

  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
