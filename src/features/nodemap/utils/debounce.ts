export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  const debouncedFunction = function (...args: any[]) {
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
