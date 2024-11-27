"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, BarChart2, Users } from "lucide-react";

const stats = [
  {
    title: "Market Cap",
    value: "$2.1T",
    change: "+5.2%",
    icon: DollarSign,
  },
  {
    title: "24h Volume",
    value: "$82.5B",
    change: "+12.3%",
    icon: BarChart2,
  },
  {
    title: "Active Cryptocurrencies",
    value: "10,000+",
    icon: TrendingUp,
  },
  {
    title: "Active Markets",
    value: "600+",
    icon: Users,
  },
];

export function MarketStats() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-muted">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <stat.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      {stat.change && (
                        <p className="text-sm text-green-500">{stat.change}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}