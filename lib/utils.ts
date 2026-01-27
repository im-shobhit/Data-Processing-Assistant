import { LandListing, FilterOptions } from '@/types';

export function filterListings(listings: LandListing[], filters: FilterOptions): LandListing[] {
  return listings.filter(listing => {
    if (filters.location && !listing.city.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    if (filters.minPrice && listing.pricePerSqFt < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice && listing.pricePerSqFt > filters.maxPrice) {
      return false;
    }

    if (filters.zoningType && filters.zoningType.length > 0 && !filters.zoningType.includes(listing.zoningType)) {
      return false;
    }

    if (filters.minLotSize && listing.lotSize < filters.minLotSize) {
      return false;
    }

    if (filters.maxLotSize && listing.lotSize > filters.maxLotSize) {
      return false;
    }

    return true;
  });
}

export function calculateROI(landPrice: number, developmentCost: number, projectedResaleValue: number): number {
  const totalInvestment = landPrice + developmentCost;
  const profit = projectedResaleValue - totalInvestment;
  return (profit / totalInvestment) * 100;
}

export function predictFairMarketValue(listing: LandListing, trends: any[]): number {
  if (!trends || trends.length === 0) {
    return listing.pricePerSqFt;
  }

  const recentTrends = trends.slice(-3);
  const avgGrowth = recentTrends.reduce((acc, trend, idx) => {
    if (idx === 0) return 0;
    return acc + (trend.avgPrice - recentTrends[idx - 1].avgPrice);
  }, 0) / (recentTrends.length - 1);

  const predictedPrice = listing.pricePerSqFt + (avgGrowth * 3);

  return Math.max(predictedPrice, listing.pricePerSqFt * 0.9);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
