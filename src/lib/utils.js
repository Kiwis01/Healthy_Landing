import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Performance utilities
export function throttle(func, delay) {
  let timeoutId;
  let lastRan;
  return function(...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if ((Date.now() - lastRan) >= delay) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
}

export function rafThrottle(callback) {
  let requestId = null;
  let lastArgs;
  
  const later = (context) => () => {
    requestId = null;
    callback.apply(context, lastArgs);
  };
  
  const throttled = function(...args) {
    lastArgs = args;
    if (requestId === null) {
      requestId = requestAnimationFrame(later(this));
    }
  };
  
  throttled.cancel = () => {
    cancelAnimationFrame(requestId);
    requestId = null;
  };
  
  return throttled;
}