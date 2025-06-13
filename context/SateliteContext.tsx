import { useLocalSearchParams, useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";

type SateliteContextType = {
  noradId: number | null;
  setNoradId: (id: number | null) => void;
};

const SateliteContext = createContext<SateliteContextType | undefined>(
  undefined
);

export const SateliteProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const noradIdParam = params.noradId
    ? parseInt(params.noradId as string, 10)
    : null;
    
  console.log(params);

  const [noradId, setNoradId] = useState<number | null>(null);

  return (
    <SateliteContext.Provider value={{ noradId, setNoradId }}>
      {children}
    </SateliteContext.Provider>
  );
};

export const useSatellite = () => {
  const context = useContext(SateliteContext);
  if (!context) {
    throw new Error("useSatellite must be used within a SatelliteProvider");
  }
  return context;
};
