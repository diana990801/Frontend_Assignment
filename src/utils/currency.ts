export const formatCurrency = (amount: number, currency: string = '€'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};
