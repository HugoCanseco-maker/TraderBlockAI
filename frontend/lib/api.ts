export async function fetchTopPredictions() {
  const res = await fetch("https://traderblock-backend.onrender.com/api/top_predictions");
  if (!res.ok) throw new Error("Failed to fetch predictions");
  return res.json();
}
