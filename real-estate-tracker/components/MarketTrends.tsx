'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Property } from '@/lib/data';

interface MarketTrendsProps {
  property: Property | null;
}

export default function MarketTrends({ property }: MarketTrendsProps) {
  if (!property) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Trends</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          Select a property to view market trends
        </div>
      </div>
    );
  }

  const priceHistory = property.priceHistory;
  const firstPrice = priceHistory[0].price;
  const lastPrice = priceHistory[priceHistory.length - 1].price;
  const priceChange = lastPrice - firstPrice;
  const percentageChange = ((priceChange / firstPrice) * 100).toFixed(2);
  const isIncreasing = priceChange > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Trends</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{property.location}</h3>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-2xl font-bold text-gray-800">${lastPrice}/sqft</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">12-Month Change</p>
            <p className={`text-2xl font-bold ${isIncreasing ? 'text-green-600' : 'text-red-600'}`}>
              {isIncreasing ? '+' : ''}{percentageChange}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Trend</p>
            <div className="flex items-center gap-2">
              {isIncreasing ? (
                <>
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-green-600 font-semibold">Rising</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  <span className="text-red-600 font-semibold">Falling</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: 'Price ($/sqft)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
              formatter={(value: number) => [`$${value}/sqft`, 'Price']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: '#2563eb', r: 4 }}
              activeDot={{ r: 6 }}
              name="Price per sqft"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Market Analysis</h4>
        <p className="text-sm text-gray-700">
          {isIncreasing 
            ? `This area has shown strong growth over the past 12 months with a ${percentageChange}% increase in land prices. The upward trend suggests high demand and potential for continued appreciation.`
            : `This area has experienced a ${Math.abs(parseFloat(percentageChange))}% decrease in land prices over the past 12 months. This could present a buying opportunity for investors looking for value.`
          }
        </p>
      </div>
    </div>
  );
}
