import { createContext, ReactNode, useContext, useState } from "react";

type SateliteContextType = {
  noradId: number | null;
  tleString: string | null;
  setNoradId: (id: number | null) => void;
  setTleString: (tle: string | null) => void;
};

const SateliteContext = createContext<SateliteContextType | undefined>(
  undefined
);

export const SateliteProvider = ({ children }: { children: ReactNode }) => {
  const [noradId, setNoradId] = useState<number | null>(null);
  const [tleString, setTleString] = useState<string | null>(null);

  return (
    <SateliteContext.Provider
      value={{ noradId, setNoradId, tleString, setTleString }}
    >
      {children}
    </SateliteContext.Provider>
  );
};

export const useSatellite = () => {
  const context = useContext(SateliteContext);
  if (!context) {
    throw new Error("useSatellite must be used within a SateliteProvider");
  }
  return context;
};
