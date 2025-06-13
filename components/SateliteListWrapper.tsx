import { useState } from "react";
import AllSateliteList from "./AllSateliteList";
import SateliteFilterBar from "./SateliteFilterBar";

function SateliteListWrapper() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <SateliteFilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {selectedCategory && <AllSateliteList group={selectedCategory} />}
    </>
  );
}

export default SateliteListWrapper;
