import { z } from "zod";

const CryptoSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),
  current_price: z.number(),
  market_cap: z.number(),
  market_cap_rank: z.number(),
  price_change_percentage_24h: z.number().nullable(),
  sparkline_in_7d: z.object({
    price: z.array(z.number())
  }).optional()
});

export type Crypto = z.infer<typeof CryptoSchema>;

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<Response> {
  let lastError: Error | null = null;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-cache',
        next: { revalidate: 60 }
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delay * (i + 1);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      if (i === retries - 1) break;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }

  throw lastError || new Error('Failed to fetch after retries');
}

export async function getTopCryptos(page = 1, perPage = 100): Promise<Crypto[]> {
  try {
    const response = await fetchWithRetry(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true`
    );
    
    const data = await response.json();
    return z.array(CryptoSchema).parse(data);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
}