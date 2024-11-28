"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crypto } from "@/lib/api";
import { formatCurrency, formatLargeNumber } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Info } from "lucide-react";
import Image from "next/image";

interface CryptoDetailsProps {
  crypto: Crypto;
}

export function CryptoDetails({ crypto }: CryptoDetailsProps) {
  const sparklineData = crypto.sparkline_in_7d?.price.map((price, index) => ({
    value: price.toFixed(2),
    day: `Day ${index + 1}`
  })) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Info className="h-4 w-4 mr-1" /> Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image src={crypto.image} alt={crypto.name} width={24} height={24} />
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-2xl font-bold">{formatCurrency(crypto.current_price)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-2xl font-bold">{formatLargeNumber(crypto.market_cap)}</p>
            </div>
          </div>
          <div className="h-[200px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={crypto.price_change_percentage_24h && crypto.price_change_percentage_24h > 0 ? '#22c55e' : '#ef4444'}
                  strokeWidth={1}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}