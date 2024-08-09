import React from 'react';

interface SearchProps {
  keywords: string;
  onSearch: (searchTerm: string) => void;
  setKeywords: (keywords: string) => void;
}

const Search: React.FC<SearchProps> = React.memo(({ keywords, onSearch, setKeywords }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(keywords);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={keywords}
        onChange={handleInputChange}
        placeholder="Search for content..."
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
});

export default Search;
