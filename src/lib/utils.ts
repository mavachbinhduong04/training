export const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/\./g, '').replace(/ VNĐ.*/, ''));
};

export const checkPriceRange = (priceStr: string, range: string) => {
  if (range === 'All') return true;
  if (!priceStr) return false;
  const price = parsePrice(priceStr);
  
  // Scanners & Printers common and specific ranges
  if (range === 'Under 2M') return price < 2000000;
  if (range === '2M - 5M') return price >= 2000000 && price <= 5000000;
  if (range === 'Under 5M') return price < 5000000;
  if (range === '5M - 10M') return price >= 5000000 && price <= 10000000;
  if (range === 'Over 10M') return price > 10000000;
  if (range === 'Over 15M') return price > 15000000; // Keep for backward compatibility if needed
  
  return true;
};
