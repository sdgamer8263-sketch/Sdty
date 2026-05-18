import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Enable CORS and disable caching
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    
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
