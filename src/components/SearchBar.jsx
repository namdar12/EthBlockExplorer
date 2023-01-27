import { useEffect, useState } from 'react';


const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    props.onSearch(searchTerm);
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className = "searchbar" />
      <button className='searchBarButton' onClick={handleSearch}>Search</button>
    </div>
  );
}


export default SearchBar;