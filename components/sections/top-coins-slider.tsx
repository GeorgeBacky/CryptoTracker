"use client";

import { Crypto } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface TopCoinsSliderProps {
  coins: Crypto[];
}

export function TopCoinsSlider({ coins }: TopCoinsSliderProps) {
  return (
    <div className="py-12 bg-blue-950/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Trending Cryptocurrencies
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {coins.slice(0, 3).map((coin, index) => (
              <CarouselItem key={coin.id} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-muted hover:border-blue-500/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                        <div>
                          <h3 className="font-semibold">{coin.name}</h3>
                          <p className="text-sm text-muted-foreground">{coin.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-2xl font-bold">{formatCurrency(coin.current_price)}</div>
                        <div className={`text-sm font-medium ${
                          coin.price_change_percentage_24h && coin.price_change_percentage_24h > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}>
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </div>
                      </div>
                      <div className="h-[60px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={coin.sparkline_in_7d?.price.map((price) => ({ value: price }))}>
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke={
                                coin.price_change_percentage_24h && coin.price_change_percentage_24h > 0
                                  ? "#22c55e"
                                  : "#ef4444"
                              }
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}