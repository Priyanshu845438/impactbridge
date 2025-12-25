export function formatINR(value: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatPercent(value: number, fractionDigits = 1) {
  return `${value >= 0 ? '+' : ''}${Math.abs(value).toFixed(fractionDigits)}%`;
}

