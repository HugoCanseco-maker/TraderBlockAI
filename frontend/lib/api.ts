// api.ts
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export async function fetchTopPredictions() {
  const res = await fetch(`${BASE_URL}/api/top_predictions`);
  if (!res.ok) throw new Error('Failed to fetch predictions');
  return res.json();
}

export async function fetchTrades() {
  const res = await fetch(`${BASE_URL}/api/trades`);
  if (!res.ok) throw new Error('Failed to fetch trades');
  return res.json();
}

// Add more like login(), executeTrade() etc
