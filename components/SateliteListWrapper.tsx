import { useState } from "react";
import AllSateliteList from "./AllSateliteList";
import SateliteFilterBar from "./SateliteFilterBar";
import SearchBarSatelite from "./SearchBarSatelite";

function SateliteListWrapper() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchBarText, setSearchBarText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("🔍 Searching for:", searchBarText);
    setSearchQuery(searchBarText);
  };

  return (
    <>
      <SearchBarSatelite
        searchBarText={searchBarText}
        setSearchBarText={setSearchBarText}
        onSearch={handleSearch}
      />

      <SateliteFilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {selectedCategory && (
        <AllSateliteList group={selectedCategory} searchText={searchQuery} />
      )}
    </>
  );
}

export default SateliteListWrapper;
