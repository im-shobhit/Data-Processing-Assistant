export interface LandListing {
  id: string;
  location: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  pricePerSqFt: number;
  lotSize: number;
  zoningType: 'residential' | 'commercial' | 'industrial' | 'agricultural';
  totalPrice: number;
  lastUpdated: string;
  description?: string;
}

export interface MarketTrend {
  month: string;
  avgPrice: number;
  location: string;
}

export interface Amenity {
  name: string;
  type: 'highway' | 'school' | 'hospital' | 'shopping' | 'park';
  distance: number;
}

export interface ZoningInfo {
  type: string;
  restrictions: string[];
  allowedUses: string[];
  maxHeight?: string;
  setbackRequirements?: string;
}

export interface InvestmentCalculation {
  landPrice: number;
  developmentCost: number;
  projectedResaleValue: number;
  roi: number;
  timeframe: number;
}

export interface FilterOptions {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  zoningType?: string[];
  minLotSize?: number;
  maxLotSize?: number;
}
