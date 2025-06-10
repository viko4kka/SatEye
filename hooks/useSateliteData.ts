import { SateliteData } from "@/components/SateliteListElement";
import { useQuery } from "@tanstack/react-query";
import { getSatelite } from "../services/apiSatelites";

const useSateliteData = () => {
  return useQuery<SateliteData>({
    queryKey: ["satelite-data"],
    queryFn: getSatelite,
  });
};

export default useSateliteData;
