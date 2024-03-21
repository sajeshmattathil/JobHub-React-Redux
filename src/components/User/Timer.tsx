import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  interface SearchResult {
    id: string;
    place_name: string;
    // Add additional properties as needed based on the API response
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`);
      const data = await response.json();
      console.log(data,'data');
      
      setSearchResults(data.features);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Enter location keyword" 
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.place_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
