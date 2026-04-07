import React from 'react';

export type Category = 'dashboard' | 'scanners' | 'printers' | 'printerAccessories' | 'ribbons' | 'training';

export interface Scanner {
  id: string;
  name: string;
  brand: string;
  type: string; // 1D/2D
  retailPrice: string;
  dealerPrice: string;
  speed: string;
  durability: string; // IP rating
  distance: string;
  application: string;
  pros: string[];
  cons: string[];
  isWireless: boolean;
  isLongRange: boolean;
  sensorResolution: string;
  isPDA: boolean;
  specialFeatures?: string[];
  screenSize?: string;
  ram?: string;
  cpu?: string;
  stock: number;
  isPriority: boolean;
  imageUrl: string;
  warranty?: string;
  unit?: string;
  notes?: string;
  accessories?: string[];
}

export interface BarcodePrinter {
  id: string;
  name: string;
  brand: string;
  retailPrice: string;
  dealerPrice: string;
  resolution: string;
  speed: number; // in ips for filtering
  width: string;
  volume: string;
  application: string;
  pros: string[];
  isDirectThermal: boolean;
  stock: number;
  isPriority: boolean;
  imageUrl: string;
  connectivity: string;
  warranty: string;
  unit: string;
  memory?: string;
  notes?: string;
  accessories?: string[];
}

export interface PrinterAccessory {
  id: string;
  name: string;
  category: string;
  compatibility: string[];
  price: string;
  stock: number;
  description: string;
  imageUrl: string;
  notes?: string;
}

export interface Ribbon {
  id: string;
  name: string;
  sku: string;
  spec: string;
  color: string;
  type: 'Wax' | 'Wax/Resin' | 'Resin';
  retailPrice: string; // Keep for backward compatibility or summary
  dealerPrice: string; // Keep for backward compatibility or summary
  dealerPrices?: { range: string, price: string }[];
  retailPrices?: { range: string, price: string }[];
  durability: string;
  adhesion?: string;
  material: string;
  application: string;
  priceRange: string;
  imageUrl: string;
  unit?: string;
  notes?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string[];
  icon: React.ReactNode;
}
