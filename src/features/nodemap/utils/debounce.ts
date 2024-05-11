export function debounce(func: (...args: unknown[]) => void, wait: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  const debouncedFunction = function (...args: unknown[]) {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func(...args), wait);
  };

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return { debouncedFunction, cancel };
}
