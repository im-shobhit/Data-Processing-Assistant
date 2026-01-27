export interface Property {
  id: number;
  location: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  pricePerSqFt: number;
  lotSize: number;
  zoningType: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Industrial';
  address: string;
  nearbyAmenities: {
    highways: { name: string; distance: number }[];
    schools: { name: string; distance: number }[];
    hospitals: { name: string; distance: number }[];
  };
  zoningInfo: {
    restrictions: string[];
    maxHeight: string;
    setbackRequirements: string;
  };
  priceHistory: {
    month: string;
    price: number;
  }[];
}

export const properties: Property[] = [
  {
    id: 1,
    location: 'Downtown Austin',
    city: 'Austin',
    state: 'TX',
    lat: 30.2672,
    lng: -97.7431,
    pricePerSqFt: 285,
    lotSize: 5000,
    zoningType: 'Commercial',
    address: '123 Congress Ave, Austin, TX 78701',
    nearbyAmenities: {
      highways: [
        { name: 'I-35', distance: 0.5 },
        { name: 'US-290', distance: 1.2 }
      ],
      schools: [
        { name: 'Austin High School', distance: 0.8 },
        { name: 'University of Texas', distance: 1.5 }
      ],
      hospitals: [
        { name: 'Dell Seton Medical Center', distance: 0.6 },
        { name: 'St. David\'s Medical Center', distance: 1.1 }
      ]
    },
    zoningInfo: {
      restrictions: ['No industrial use', 'Maximum 12 stories', 'Mixed-use allowed'],
      maxHeight: '150 feet',
      setbackRequirements: '10 feet from property line'
    },
    priceHistory: [
      { month: 'Jan 2025', price: 265 },
      { month: 'Feb 2025', price: 268 },
      { month: 'Mar 2025', price: 272 },
      { month: 'Apr 2025', price: 275 },
      { month: 'May 2025', price: 278 },
      { month: 'Jun 2025', price: 280 },
      { month: 'Jul 2025', price: 282 },
      { month: 'Aug 2025', price: 283 },
      { month: 'Sep 2025', price: 284 },
      { month: 'Oct 2025', price: 285 },
      { month: 'Nov 2025', price: 285 },
      { month: 'Dec 2025', price: 285 }
    ]
  },
  {
    id: 2,
    location: 'Westlake Hills',
    city: 'Austin',
    state: 'TX',
    lat: 30.2711,
    lng: -97.8089,
    pricePerSqFt: 425,
    lotSize: 12000,
    zoningType: 'Residential',
    address: '456 Westlake Dr, Austin, TX 78746',
    nearbyAmenities: {
      highways: [
        { name: 'Loop 360', distance: 0.3 },
        { name: 'MoPac Expressway', distance: 1.8 }
      ],
      schools: [
        { name: 'Westlake High School', distance: 0.5 },
        { name: 'Eanes Elementary', distance: 0.7 }
      ],
      hospitals: [
        { name: 'St. David\'s South Austin', distance: 3.2 },
        { name: 'Seton Southwest', distance: 4.1 }
      ]
    },
    zoningInfo: {
      restrictions: ['Single-family only', 'Minimum 1 acre lots', 'No commercial use'],
      maxHeight: '35 feet',
      setbackRequirements: '25 feet from property line'
    },
    priceHistory: [
      { month: 'Jan 2025', price: 395 },
      { month: 'Feb 2025', price: 400 },
      { month: 'Mar 2025', price: 405 },
      { month: 'Apr 2025', price: 408 },
      { month: 'May 2025', price: 412 },
      { month: 'Jun 2025', price: 415 },
      { month: 'Jul 2025', price: 418 },
      { month: 'Aug 2025', price: 420 },
      { month: 'Sep 2025', price: 422 },
      { month: 'Oct 2025', price: 424 },
      { month: 'Nov 2025', price: 425 },
      { month: 'Dec 2025', price: 425 }
    ]
  },
  {
    id: 3,
    location: 'East Austin',
    city: 'Austin',
    state: 'TX',
    lat: 30.2586,
    lng: -97.7089,
    pricePerSqFt: 195,
    lotSize: 7500,
    zoningType: 'Mixed-Use',
    address: '789 E 6th St, Austin, TX 78702',
    nearbyAmenities: {
      highways: [
        { name: 'I-35', distance: 0.8 },
        { name: 'US-183', distance: 2.1 }
      ],
      schools: [
        { name: 'Eastside Memorial High School', distance: 1.2 },
        { name: 'Sanchez Elementary', distance: 0.6 }
      ],
      hospitals: [
        { name: 'Dell Seton Medical Center', distance: 1.5 },
        { name: 'Central Health', distance: 1.8 }
      ]
    },
    zoningInfo: {
      restrictions: ['Mixed residential/commercial', 'Maximum 6 stories', 'Ground floor retail encouraged'],
      maxHeight: '75 feet',
      setbackRequirements: '5 feet from property line'
    },
    priceHistory: [
      { month: 'Jan 2025', price: 175 },
      { month: 'Feb 2025', price: 178 },
      { month: 'Mar 2025', price: 180 },
      { month: 'Apr 2025', price: 183 },
      { month: 'May 2025', price: 186 },
      { month: 'Jun 2025', price: 188 },
      { month: 'Jul 2025', price: 190 },
      { month: 'Aug 2025', price: 192 },
      { month: 'Sep 2025', price: 193 },
      { month: 'Oct 2025', price: 194 },
      { month: 'Nov 2025', price: 195 },
      { month: 'Dec 2025', price: 195 }
    ]
  },
  {
    id: 4,
    location: 'Domain Area',
    city: 'Austin',
    state: 'TX',
    lat: 30.4003,
    lng: -97.7206,
    pricePerSqFt: 310,
    lotSize: 8500,
    zoningType: 'Commercial',
    address: '321 Domain Dr, Austin, TX 78758',
    nearbyAmenities: {
      highways: [
        { name: 'MoPac Expressway', distance: 0.4 },
        { name: 'US-183', distance: 1.0 }
      ],
      schools: [
        { name: 'Anderson High School', distance: 1.5 },
        { name: 'Gullett Elementary', distance: 2.0 }
      ],
      hospitals: [
        { name: 'St. David\'s North Austin', distance: 1.2 },
        { name: 'Seton Northwest', distance: 2.5 }
      ]
    },
    zoningInfo: {
      restrictions: ['Commercial/retail only', 'Maximum 8 stories', 'Parking requirements apply'],
      maxHeight: '100 feet',
      setbackRequirements: '15 feet from property line'
    },
    priceHistory: [
      { month: 'Jan 2025', price: 290 },
      { month: 'Feb 2025', price: 293 },
      { month: 'Mar 2025', price: 296 },
      { month: 'Apr 2025', price: 298 },
      { month: 'May 2025', price: 301 },
      { month: 'Jun 2025', price: 303 },
      { month: 'Jul 2025', price: 305 },
      { month: 'Aug 2025', price: 307 },
      { month: 'Sep 2025', price: 308 },
      { month: 'Oct 2025', price: 309 },
      { month: 'Nov 2025', price: 310 },
      { month: 'Dec 2025', price: 310 }
    ]
  },
  {
    id: 5,
    location: 'South Congress',
    city: 'Austin',
    state: 'TX',
    lat: 30.2467,
    lng: -97.7489,
    pricePerSqFt: 265,
    lotSize: 6000,
    zoningType: 'Mixed-Use',
    address: '555 S Congress Ave, Austin, TX 78704',
    nearbyAmenities: {
      highways: [
        { name: 'I-35', distance: 1.2 },
        { name: 'Ben White Blvd', distance: 1.5 }
      ],
      schools: [
        { name: 'Travis High School', distance: 1.8 },
        { name: 'Bowie Elementary', distance: 0.9 }
      ],
      hospitals: [
        { name: 'South Austin Hospital', distance: 2.0 },
        { name: 'St. David\'s South Austin', distance: 2.8 }
      ]
    },
    zoningInfo: {
      restrictions: ['Mixed-use encouraged', 'Maximum 5 stories', 'Historic district guidelines apply'],
      maxHeight: '60 feet',
      setbackRequirements: '8 feet from property line'
    },
    priceHistory: [
      { month: 'Jan 2025', price: 245 },
      { month: 'Feb 2025', price: 248 },
      { month: 'Mar 2025', price: 251 },
      { month: 'Apr 2025', price: 254 },
      { month: 'May 2025', price: 256 },
      { month: 'Jun 2025', price: 258 },
      { month: 'Jul 2025', price: 260 },
      { month: 'Aug 2025', price: 262 },
      { month: 'Sep 2025', price: 263 },
      { month: 'Oct 2025', price: 264 },
      { month: 'Nov 2025', price: 265 },
      { month: 'Dec 2025', price: 265 }
    ]
  },
  {
    id: 6,
    location: 'Mueller District',
    city: 'Austin',
    state: 'TX',
    lat: 30.2953,
    lng: -97.7089,
    pricePerSqFt: 235,
    lotSize: 5500,
    zoningType: 'Residential',
    address: '888 Mueller Blvd, Austin, TX 78723',
    nearbyAmenities: {
      highways: [
        { name: 'I-35', distance: 1.5 },
        { name: 'US-290', distance: 2.0 }
      ],
      schools: [
        { name: 'Kealing Middle School', distance: 0.5 },
        { name: 'Maplewood Elementary', distance: 0.3 }
      ],
      hospitals: [
        { name: 'Dell Children\'s Medical Center', distance: 0.8 },
        { name: 'Seton Medical Center', distance: 2.5 }
      ]
    },
    zoningInfo: {
      restrictions: ['Residential only', 'Maximum 3 stories', 'Green building standards required'],
      maxHeight: '45 feet',
      setbackRequirements: '12 feet from property line'
    },
    priceHistory: [
      { month: 'Jan 2025', price: 220 },
      { month: 'Feb 2025', price: 222 },
      { month: 'Mar 2025', price: 225 },
      { month: 'Apr 2025', price: 227 },
      { month: 'May 2025', price: 229 },
      { month: 'Jun 2025', price: 231 },
      { month: 'Jul 2025', price: 232 },
      { month: 'Aug 2025', price: 233 },
      { month: 'Sep 2025', price: 234 },
      { month: 'Oct 2025', price: 235 },
      { month: 'Nov 2025', price: 235 },
      { month: 'Dec 2025', price: 235 }
    ]
  }
];

export const calculateROI = (
  landPrice: number,
  developmentCost: number,
  projectedResaleValue: number
): { roi: number; profit: number; roiPercentage: number } => {
  const totalInvestment = landPrice + developmentCost;
  const profit = projectedResaleValue - totalInvestment;
  const roiPercentage = (profit / totalInvestment) * 100;
  
  return {
    roi: totalInvestment,
    profit,
    roiPercentage
  };
};

export const predictFairMarketValue = (property: Property): number => {
  const basePrice = property.pricePerSqFt;
  const priceHistory = property.priceHistory;
  
  // Calculate trend
  const recentPrices = priceHistory.slice(-6).map(p => p.price);
  const avgRecentPrice = recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length;
  const trend = avgRecentPrice - priceHistory[0].price;
  
  // Adjust based on zoning
  let zoningMultiplier = 1;
  if (property.zoningType === 'Commercial') zoningMultiplier = 1.15;
  if (property.zoningType === 'Mixed-Use') zoningMultiplier = 1.08;
  if (property.zoningType === 'Residential') zoningMultiplier = 1.05;
  
  // Adjust based on amenities proximity
  const avgHighwayDistance = property.nearbyAmenities.highways.reduce((a, b) => a + b.distance, 0) / property.nearbyAmenities.highways.length;
  const amenityBonus = avgHighwayDistance < 1 ? 1.05 : 1;
  
  const fairValue = basePrice * zoningMultiplier * amenityBonus + (trend * 0.5);
  
  return Math.round(fairValue);
};
