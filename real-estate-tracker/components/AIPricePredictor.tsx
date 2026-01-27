'use client';

import { Property, predictFairMarketValue } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AIPricePredictorProps {
  property: Property | null;
}

export default function AIPricePredictor({ property }: AIPricePredictorProps) {
  if (!property) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Price Predictor</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          Select a property to see AI price prediction
        </div>
      </div>
    );
  }

  const fairMarketValue = predictFairMarketValue(property);
  const currentPrice = property.pricePerSqFt;
  const difference = fairMarketValue - currentPrice;
  const percentageDiff = ((difference / currentPrice) * 100).toFixed(2);
  const isUndervalued = difference > 0;

  const comparisonData = [
    {
      name: 'Current Price',
      value: currentPrice,
      fill: '#3b82f6'
    },
    {
      name: 'AI Fair Value',
      value: fairMarketValue,
      fill: '#10b981'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Price Predictor</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{property.location}</h3>
        <p className="text-sm text-gray-600">
          AI-powered fair market value estimation based on historical data, zoning, and location factors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Current Market Price</p>
          <p className="text-2xl font-bold text-blue-600">${currentPrice}/sqft</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600 mb-1">AI Fair Market Value</p>
          <p className="text-2xl font-bold text-green-600">${fairMarketValue}/sqft</p>
        </div>

        <div className={`p-4 rounded-lg border ${isUndervalued ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
          <p className="text-sm text-gray-600 mb-1">Price Difference</p>
          <p className={`text-2xl font-bold ${isUndervalued ? 'text-green-600' : 'text-orange-600'}`}>
            {isUndervalued ? '+' : ''}{percentageDiff}%
          </p>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Price ($/sqft)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value: number) => `$${value}/sqft`} />
            <Legend />
            <Bar dataKey="value" name="Price per sqft" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className={`p-4 rounded-lg border ${isUndervalued ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
          <div className="flex items-start gap-3">
            {isUndervalued ? (
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <div>
              <h5 className="font-semibold text-gray-800 mb-1">
                {isUndervalued ? 'Potentially Undervalued' : 'At or Above Fair Value'}
              </h5>
              <p className="text-sm text-gray-700">
                {isUndervalued 
                  ? `Our AI model suggests this property may be undervalued by approximately ${percentageDiff}%. This could represent a good investment opportunity, though market conditions should be carefully evaluated.`
                  : `The current market price is ${Math.abs(parseFloat(percentageDiff))}% ${difference < 0 ? 'above' : 'at'} our AI-predicted fair value. Consider market trends and future development plans before investing.`
                }
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-semibold text-gray-800 mb-3">Factors Considered by AI Model</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">12-month price trends</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">Zoning type multiplier</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">Proximity to highways</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">Amenities accessibility</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h5 className="font-semibold text-gray-800 mb-1">Disclaimer</h5>
              <p className="text-sm text-gray-700">
                This AI prediction is based on historical data and algorithmic analysis. It should be used as one of many factors in your investment decision. Always conduct thorough due diligence and consult with real estate professionals before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
