"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crypto } from "@/lib/api";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { CryptoDetails } from "@/components/crypto-details";
import { motion } from "framer-motion";
import Image from "next/image";

interface CryptoCardProps {
  crypto: Crypto;
  index: number;
}

export function CryptoCard({ crypto, index }: CryptoCardProps) {
  const sparklineData = crypto.sparkline_in_7d?.price.map((price, index) => ({
    value: price
  })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-muted hover:border-blue-500/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <div className="flex items-center gap-2">
              <Image src={crypto.image} alt={crypto.name} width={24} height={24} />
              <span>{crypto.name}</span>
              <span className="text-muted-foreground">({crypto.symbol.toUpperCase()})</span>
            </div>
          </CardTitle>
          <CryptoDetails crypto={crypto} />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-baseline mb-4">
            <div className="text-2xl font-bold">{formatCurrency(crypto.current_price)}</div>
            <span className={`text-sm font-medium ${crypto.price_change_percentage_24h && crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {crypto.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={crypto.price_change_percentage_24h && crypto.price_change_percentage_24h > 0 ? '#22c55e' : '#ef4444'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}