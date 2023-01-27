import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import BlockInfo from './components/BlockInfo';
import SearchBar from './components/SearchBar';
import {  Link, NavLink } from 'react-router-dom';
import React from 'react';
import './App.css';
import GasEstimator from './components/GasEstimator';
import { createContext } from 'react';


// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: "4SMB-n5Z8rFCi7QqQI5b_1a6RC68tFrK", //process.env.REACT_APP_ALCHEMY_API_KEY,
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
  
  // let start = blockNumber-10
  // let end = blockNumber
  // const getBlockArray = async (start, end) => {
  //   const blockPromises = Array.from({ length: end - start }, (_, i) => {
  //     return alchemy.core.getBlock(i + start);
  //   });

  //   const blocks = await Promise.all(blockPromises);
  //   setBlockArray(blocks);
  // };

  

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getBlockInformation(){
      if (!isSearching) {
        setBlock(await alchemy.core.getBlock(blockNumber));
      } else {
        setBlock(await alchemy.core.getBlock(parseInt(searchTerm)));  
      }
    }



    // async function getBlockInformation(){
    //   // if(searchTerm !== ''){
    //   //   console.log('Search here')
    //   //   setBlock(await alchemy.core.getBlock(parseInt(searchTerm)));  
    //   // }
    //     setBlock(await alchemy.core.getBlock(blockNumber));
    // }

    getBlockNumber();
    getBlockInformation();
   //console.log(blocksArray)


  }, [searchTerm, block,blockNumber,isSearching]);

    //return (BlockInfo(block));
   return( 
   <div className="app">
    <BlockInfo block = {block}/>
    <SearchBar onSearch={handleSearch} />
      <div className='nav'>
      <NavLink to="/">HOME</NavLink>
      <NavLink to={{pathname: '/gasestimator',
                state: { blockNumber: blockNumber }}
                }>GAS</NavLink>
     <NavLink to={{pathname: '/chain',
     state: { blockNumber: blockNumber }}
                 }>CHAIN</NavLink>
      </div>
  </div>);










// <div className="App">Block Number: {blockNumber}
//       <div>gasLimit: {block.gasLimit ? block.gasLimit.toString() : ''}</div>
//       {block && (
//     <div>
//         <div>Nonce: {block.nonce}</div>
//         <div>Hash: {block.hash}</div>
//         <div>Number: {block.number}</div>
//         <div>Parent Hash: {block.parentHash}</div>
//         <div>SHA3 Uncles: {block.sha3Uncles}</div>
//         <div>Logs Bloom: {block.logsBloom}</div>
//         <div>Transactions Root: {block.transactions}</div>
//         <div>State Root: {block.stateRoot}</div>
//         <div>Receipts Root: {block.receiptsRoot}</div>
//         <div>Miner: {block.miner}</div>
//         <div>Difficulty: {block.difficulty}</div>
//         <div>Total Difficulty: {block.totalDifficulty}</div>
//     </div>
// )}
      
//       </div>;
}

export default App;
