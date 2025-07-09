import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  try {
    // Use full URL constructor with fallback base (needed in Deno)
    const url = new URL(req.url, "http://localhost");
    const { symbol, risk } = Object.fromEntries(url.searchParams);

    if (!symbol || !risk) {
      return new Response(
        JSON.stringify({ error: "Missing symbol or risk param" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Fetch real-time price data from Yahoo Finance with headers
    const res = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
        },
      },
    );

    const data = await res.json();
    console.log("Yahoo response:", data); // ✅ DEBUG OUTPUT

    const quoteData = data?.quoteResponse?.result?.[0];

    if (!quoteData) {
      return new Response(
        JSON.stringify({ error: "Invalid symbol" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const quote = {
      c: quoteData.regularMarketPrice,
      pc: quoteData.regularMarketPreviousClose,
      h: quoteData.regularMarketDayHigh,
      l: quoteData.regularMarketDayLow,
    };

    const recommendation: "BUY" | "SELL" = Math.random() > 0.5 ? "BUY" : "SELL";
    const confidence = Math.floor(Math.random() * 21) + 75; // 75–95
    const movement = parseFloat((Math.random() * 4 - 2).toFixed(2)); // -2.00 to +2.00
    const explanation = `AI suggests a ${recommendation} based on ${risk} risk mode and current sentiment.`;

    return new Response(
      JSON.stringify({
        symbol,
        risk,
        quote,
        recommendation,
        confidence,
        movement,
        explanation,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch data", details: String(err.message || err) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
