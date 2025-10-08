import { useState } from "react";

export function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (newValue: string) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return value;
      } else {
        localStorage.setItem(key, defaultValue);
        return defaultValue;
      }
    } catch (err) {
      console.error(err);
      return defaultValue;
    }
  });

  function setValue(newValue: string) {
    try {
      localStorage.setItem(key, newValue);
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  }

  return [storedValue, setValue];
}
