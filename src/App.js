import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import BlockInfo from './components/BlockInfo';
import SearchBar from './components/SearchBar';
import {
  BrowserRouter as Router,
  NavLink,
} from "react-router-dom";
import React from 'react';
import './App.css';
import { createContext } from 'react';
import BlockRender from './pages/home';



// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);
const BlockNumberContext = createContext();

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block,setBlock] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);


  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsSearching(true);
  }


  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getBlockInformation(){
      if (!isSearching) {
        setBlock(await alchemy.core.getBlock(blockNumber));
      } else {
        setBlockNumber(parseInt(searchTerm))
        setBlock(await alchemy.core.getBlock(parseInt(searchTerm)));  
      }
    }


    getBlockNumber();
    getBlockInformation();



  }, [searchTerm, block,blockNumber,isSearching,setBlockNumber]);


   return( 
   <div className="app">
    {/* <BlockInfo block = {block}/> */}
    <BlockRender block={block}></BlockRender>
    <SearchBar onSearch={handleSearch} />
    {/* <NavBar block={block}></NavBar> */}
      <div className='nav'>
      <NavLink to="/">HOME</NavLink>
      <NavLink to={{pathname: '/gasestimator',
                state: { blockNumber: blockNumber }}
                }>GAS</NavLink>
      {/* <NavLink to='/chain' blockNumber={blockNumber}>CHAIN</NavLink> */}
     <NavLink to={{pathname: '/chain',
                  state: { blockNumber: blockNumber }}
                 }>CHAIN</NavLink>
      </div>
      
  </div>);


}

export default App;
