import { getTopCryptos } from "@/lib/api";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/sections/hero-section";
import { MarketStats } from "@/components/sections/market-stats";
import { TopCoinsSlider } from "@/components/sections/top-coins-slider";
import { LoadingCard } from "@/components/loading-card";
import { Button } from "@/components/ui/button";
import { Coins, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function CryptoContent() {
  const cryptos = await getTopCryptos();

  if (!cryptos.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          Unable to load cryptocurrency data. Please try again later.
        </p>
      </div>
    );
  }

  return <TopCoinsSlider coins={cryptos} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-blue-950/50 to-background">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <Coins className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              CryptoTracker
            </h1>
          </div>
          <ThemeToggle />
        </nav>
      </div>

      <HeroSection />
      <MarketStats />
      <Suspense fallback={
        <div className="py-12 bg-blue-950/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Trending Cryptocurrencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {Array.from({ length: 3 }).map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          </div>
        </div>
      }>
        <CryptoContent />
      </Suspense>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Link href="/coins">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Cryptocurrencies <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}