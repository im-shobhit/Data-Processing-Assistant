'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketTrend } from '@/types';

interface MarketTrendsProps {
  trends: MarketTrend[];
  location: string;
}

export default function MarketTrends({ trends, location }: MarketTrendsProps) {
  if (!trends || trends.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Market Trends</h2>
        <p className="text-gray-500">No trend data available for this location.</p>
      </div>
    );
  }

  const firstPrice = trends[0].avgPrice;
  const lastPrice = trends[trends.length - 1].avgPrice;
  const priceChange = lastPrice - firstPrice;
  const percentChange = (priceChange / firstPrice) * 100;
  const isTrendingUp = priceChange > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Market Trends - {location}</h2>
          <p className="text-sm text-gray-600">12-month price history</p>
        </div>
        <div className={`flex items-center gap-2 ${isTrendingUp ? 'text-green-600' : 'text-red-600'}`}>
          {isTrendingUp ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          <div className="text-right">
            <div className="text-2xl font-bold">
              {isTrendingUp ? '+' : ''}{percentChange.toFixed(1)}%
            </div>
            <div className="text-sm">
              ${priceChange.toFixed(2)}/sq ft
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              label={{ value: '$ per sq ft', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Avg Price']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '0.5rem'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgPrice"
              stroke={isTrendingUp ? '#10b981' : '#ef4444'}
              strokeWidth={2}
              dot={{ fill: isTrendingUp ? '#10b981' : '#ef4444', r: 4 }}
              activeDot={{ r: 6 }}
              name="Average Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-600 mb-1">Starting Price</p>
          <p className="text-lg font-semibold">${firstPrice.toFixed(2)}/sq ft</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Current Price</p>
          <p className="text-lg font-semibold">${lastPrice.toFixed(2)}/sq ft</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Net Change</p>
          <p className={`text-lg font-semibold ${isTrendingUp ? 'text-green-600' : 'text-red-600'}`}>
            {isTrendingUp ? '+' : ''}${priceChange.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
