export type ToastFn = (options: { title: string; description?: string; variant?: 'default' | 'destructive' }) => void;

const subscribers: Array<ToastFn> = [];

export function subscribeToast(fn: ToastFn) {
  subscribers.push(fn);
  return () => {
    const index = subscribers.indexOf(fn);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  };
}

export function emitToast(options: Parameters<ToastFn>[0]) {
  subscribers.forEach((fn) => fn(options));
}
