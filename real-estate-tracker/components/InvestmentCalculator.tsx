'use client';

import { useState, useEffect } from 'react';
import { Property, calculateROI } from '@/lib/data';

interface InvestmentCalculatorProps {
  property: Property | null;
}

export default function InvestmentCalculator({ property }: InvestmentCalculatorProps) {
  const [landPrice, setLandPrice] = useState<string>('');
  const [developmentCost, setDevelopmentCost] = useState<string>('');
  const [projectedResale, setProjectedResale] = useState<string>('');
  const [result, setResult] = useState<{ roi: number; profit: number; roiPercentage: number } | null>(null);

  useEffect(() => {
    if (property) {
      const totalLandPrice = property.pricePerSqFt * property.lotSize;
      setLandPrice(totalLandPrice.toString());
      setDevelopmentCost('');
      setProjectedResale('');
      setResult(null);
    }
  }, [property]);

  const handleCalculate = () => {
    const land = parseFloat(landPrice);
    const dev = parseFloat(developmentCost);
    const resale = parseFloat(projectedResale);

    if (!isNaN(land) && !isNaN(dev) && !isNaN(resale)) {
      const calculatedResult = calculateROI(land, dev, resale);
      setResult(calculatedResult);
    }
  };

  if (!property) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Investment Calculator</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          Select a property to calculate ROI
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Investment Calculator</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{property.location}</h3>
        <p className="text-sm text-gray-600">
          Calculate potential ROI based on development and resale projections
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Land Purchase Price ($)
          </label>
          <input
            type="number"
            value={landPrice}
            onChange={(e) => setLandPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter land price"
          />
          <p className="text-xs text-gray-500 mt-1">
            Based on {property.lotSize.toLocaleString()} sqft @ ${property.pricePerSqFt}/sqft
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Development/Construction Cost ($)
          </label>
          <input
            type="number"
            value={developmentCost}
            onChange={(e) => setDevelopmentCost(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter development cost"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Projected Resale Value ($)
          </label>
          <input
            type="number"
            value={projectedResale}
            onChange={(e) => setProjectedResale(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter projected resale value"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Calculate ROI
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h4 className="font-bold text-lg text-gray-800 mb-4">Investment Analysis</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Total Investment</p>
              <p className="text-2xl font-bold text-gray-800">
                ${result.roi.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Projected Profit</p>
              <p className={`text-2xl font-bold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${result.profit.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">ROI Percentage</p>
              <p className={`text-2xl font-bold ${result.roiPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.roiPercentage.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2">Investment Recommendation</h5>
            <p className="text-sm text-gray-700">
              {result.roiPercentage >= 20 
                ? '🟢 Excellent investment opportunity! This project shows strong potential returns.'
                : result.roiPercentage >= 10
                ? '🟡 Good investment potential. Consider market conditions and timeline.'
                : result.roiPercentage >= 0
                ? '🟠 Moderate returns. Evaluate if this aligns with your investment goals.'
                : '🔴 Negative returns projected. Reconsider development costs or resale projections.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
