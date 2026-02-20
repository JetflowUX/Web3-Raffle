"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "chainraffle:mock-mode";

export function useMockMode() {
  const [useMock, setUseMock] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored !== null) {
      setUseMock(stored === "true");
      return;
    }
    const envDefault = process.env.NEXT_PUBLIC_USE_MOCKS;
    setUseMock(envDefault ? envDefault === "true" : true);
  }, []);

  const toggleMock = () => {
    setUseMock((current) => {
      const next = !current;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  return { useMock, toggleMock };
}
