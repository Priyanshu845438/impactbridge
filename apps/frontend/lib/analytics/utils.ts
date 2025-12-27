export function getStatusCount(
  stats: Array<{ label: string; value: number }> | undefined,
  target: string,
): number {
  if (!stats || !stats.length) {
    return 0;
  }

  const found = stats.find((item) => item.label.toLowerCase() === target.toLowerCase());
  return found?.value ?? 0;
}

