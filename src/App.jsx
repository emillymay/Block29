

import { useState } from 'react';
import MainContainer from './components/MainContainer';
import NavBar from './components/NavBar';

import './App.css';

function App() {
 
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query)
  };

  return (
      <div>
        <NavBar onSearch={handleSearch} />
        <MainContainer searchQuery={searchQuery}/>
       
      </div>
  );
}

export default App