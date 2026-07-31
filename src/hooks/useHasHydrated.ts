"use client";

import { useState, useEffect } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Used to prevent SSR vs Client localStorage hydration mismatches in Next.js.
 */
export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
}
