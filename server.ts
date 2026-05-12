import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API for ERP
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Example API routes for the ERP
  app.get("/api/dashboard/summary", (req, res) => {
    res.json({
      salesToday: 1250.80,
      activeUsers: 42,
      lowStockItems: 15,
      profit: 450.20,
      ticketAverage: 29.78
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
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
    console.log(`Gestão Empresarial ERP running on http://localhost:${PORT}`);
  });
}

startServer();
