from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# ✅ User routes
from backend.auth.login import login_user, signup_user
from backend.keys.user_keys import store_user_keys, get_user_keys
from backend.services.trade_executor import execute_trade

# ✅ API routers
from backend.api.top_predictions import router as predictions_router
from backend.api.trades import router as trades_router
from backend.api.predict import router as predict_router
from backend.api.log_prediction import router as log_router

app = FastAPI()

# ✅ CORS for frontend (update this in prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔐 TODO: replace with actual Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Auth + Trading POST endpoints
@app.post("/api/login")
async def login(data: Request):
    body = await data.json()
    result = login_user(body["email"], body["password"])
    return result

@app.post("/api/signup")
async def signup(data: Request):
    body = await data.json()
    result = signup_user(body["email"], body["password"])
    return result

@app.post("/api/save_keys")
async def save_keys(data: Request):
    body = await data.json()
    return store_user_keys(body["user_id"], body["alpaca_key"], body["alpaca_secret"])

@app.post("/api/trade")
async def trade(data: Request):
    body = await data.json()
    user_id = body["user_id"]
    key, secret = get_user_keys(user_id)
    if not key or not secret:
        raise HTTPException(status_code=403, detail="API keys not set")
    return execute_trade(user_id, body["symbol"], body["qty"], body.get("side", "buy"))

# ✅ Live GET API routes
app.include_router(predictions_router, prefix="/api")
app.include_router(trades_router, prefix="/api")
app.include_router(predict_router, prefix="/api")
app.include_router(log_router, prefix="/api")
