diff --git a/README.md b/README.md
index 6e8bafe2b9223ca24577e2f90e39af323e59753d..27936c00d0f39357278c0e12843e49abc0439628 100644
--- a/README.md
+++ b/README.md
@@ -1,3 +1,34 @@
-# TraderBlockAI MVP
+# TraderBlockAI
 
-Sim mode bot with sentiment, technical indicators, and predictive models.
+TraderBlockAI is an experimental trading assistant with a Python/FastAPI backend and a Next.js frontend.
+
+## Local Development
+
+1. Install Python dependencies:
+   ```bash
+   pip install -r requirements.txt
+   ```
+2. Create a `.env` file with your API keys:
+   ```
+   FINNHUB_API_KEY=...
+   SUPABASE_URL=...
+   SUPABASE_SERVICE_KEY=...
+   DEFAULT_ALPACA_KEY=...
+   DEFAULT_ALPACA_SECRET=...
+   GNEWS_API_KEY=...
+   ```
+3. Start the API:
+   ```bash
+   uvicorn backend.main:app --host 0.0.0.0 --port 10000
+   ```
+4. In another terminal start the frontend:
+   ```bash
+   cd frontend && npm install && npm run dev
+   ```
+
+## Deployment
+
+- **Backend (Render)**: uses `render.yaml` and runs `uvicorn backend.main:app`.
+- **Frontend (Vercel)**: set `NEXT_PUBLIC_BACKEND_URL` to your Render URL. All `/api/*` routes are proxied to the backend via `vercel.json`.
+
+Models should be placed in `backend/models/saved/` alongside their scalers.
