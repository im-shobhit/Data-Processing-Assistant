'use client';

import { useState } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { calculateROI, formatCurrency } from '@/lib/utils';

export default function InvestmentCalculator() {
  const [landPrice, setLandPrice] = useState<number>(500000);
  const [developmentCost, setDevelopmentCost] = useState<number>(300000);
  const [projectedResale, setProjectedResale] = useState<number>(1000000);
  const [timeframe, setTimeframe] = useState<number>(24);

  const totalInvestment = landPrice + developmentCost;
  const profit = projectedResale - totalInvestment;
  const roi = calculateROI(landPrice, developmentCost, projectedResale);
  const monthlyROI = roi / timeframe;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold">Investment Calculator</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Land Purchase Price
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="number"
              value={landPrice}
              onChange={(e) => setLandPrice(Number(e.target.value))}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Development/Construction Cost
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="number"
              value={developmentCost}
              onChange={(e) => setDevelopmentCost(Number(e.target.value))}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Projected Resale Value
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="number"
              value={projectedResale}
              onChange={(e) => setProjectedResale(Number(e.target.value))}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Timeframe (months)
          </label>
          <input
            type="number"
            value={timeframe}
            onChange={(e) => setTimeframe(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={20} />
          Investment Analysis
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Investment</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(totalInvestment)}</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Projected Profit</p>
            <p className={`text-xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(profit)}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">ROI</p>
            <p className={`text-xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {roi.toFixed(2)}%
            </p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Monthly ROI</p>
            <p className={`text-xl font-bold ${monthlyROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {monthlyROI.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-blue-200">
          <p className="text-sm text-gray-600">
            {roi >= 15 ? (
              <span className="text-green-700 font-medium">
                ✓ Strong investment potential with {roi.toFixed(1)}% return
              </span>
            ) : roi >= 8 ? (
              <span className="text-blue-700 font-medium">
                ⓘ Moderate investment return of {roi.toFixed(1)}%
              </span>
            ) : roi >= 0 ? (
              <span className="text-yellow-700 font-medium">
                ⚠ Low investment return of {roi.toFixed(1)}%
              </span>
            ) : (
              <span className="text-red-700 font-medium">
                ✗ Projected loss of {Math.abs(roi).toFixed(1)}%
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
