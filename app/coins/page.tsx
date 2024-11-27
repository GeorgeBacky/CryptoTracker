"use client";

import { useEffect, useState } from "react";
import { getTopCryptos } from "@/lib/api";
import { CryptoCard } from "@/components/crypto-card";
import { LoadingCard } from "@/components/loading-card";
import { ErrorCard } from "@/components/error-card";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import type { Crypto } from "@/lib/api";

export default function CoinsPage() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  async function fetchData() {
    try {
      setLoading(true);
      setError(false);
      const data = await getTopCryptos(1, 100);
      if (data.length === 0) {
        setError(true);
      } else {
        setCryptos(data);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCryptos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCryptos = filteredCryptos.slice(startIndex, startIndex + itemsPerPage);

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-blue-950/50 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <ErrorCard />
            <div className="text-center">
              <Button onClick={fetchData} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" /> Try Again
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-blue-950/50 to-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              All Cryptocurrencies
            </h1>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCryptos.map((crypto, index) => (
                <CryptoCard key={crypto.id} crypto={crypto} index={index} />
              ))}
            </div>

            {filteredCryptos.length > itemsPerPage && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}

            {filteredCryptos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No cryptocurrencies found matching your search.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}