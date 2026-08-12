"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CursorContextValue {
  isHovered: boolean;
  setIsHovered: (val: boolean) => void;
  cursorText: string;
  setCursorText: (val: string) => void;
}

const CursorContext = createContext<CursorContextValue>({
  isHovered: false,
  setIsHovered: () => {},
  cursorText: "",
  setCursorText: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  return (
    <CursorContext.Provider value={{ isHovered, setIsHovered, cursorText, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
