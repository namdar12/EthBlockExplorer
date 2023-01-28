import {Route,BrowserRouter, Switch}  from 'react-router-dom';
import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link,NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom'



const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);



function Transaction(){

  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    history.push('/details');
   }

  const [transaction,setTransaction] = useState([]);
  const [blockNumber, setBlockNumber] = useState("")

  useEffect(()=>{
    async function getTransactionInformation(blockNumber) {
      setTransaction(await alchemy.core.getBlockWithTransactions(blockNumber));
    }
 
    const propValue = location.state.blockNumber; 
    setBlockNumber(propValue)

    getTransactionInformation(propValue)
  },[])

  
 
    return (
      <> <div>
          <h1>TRANSACTION INFORMATION</h1>
        <div>Nonce: {transaction.nonce}</div>
        <div>Hash: {transaction.hash}</div>
        <div>Number: {transaction.number}</div>
        <div>Parent Hash: {transaction.parentHash}</div>
        <div>SHA3 Uncles: {transaction.sha3Uncles}</div>
        <div>State Root: {transaction.stateRoot}</div>
        <div>Receipts Root: {transaction.transactionsRoot}</div>
        <div>Miner: {transaction.miner}</div>
        <div>Difficulty: {transaction.difficulty}</div>
        <div>Total Difficulty: {transaction.totalDifficulty}</div>
        {transaction.transactions && transaction.transactions.map((tx, index) => {
     return  <Link to={{pathname:'/details', state:{hash: tx.hash}}} 
       onClick={() => handleClick()} key={index}>Transaction {index + 1}: {tx.hash}<br></br></Link>})}
    </div>
    <div className='nav'>
        <NavLink to="/">HOME</NavLink>
        <NavLink to={{pathname: '/gasestimator',
      state: { blockNumber: blockNumber }}}>GAS</NavLink>
      <NavLink to={{pathname: '/chain',
              state: { blockNumber: blockNumber }}
              }>CHAIN</NavLink>
        </div>
    
    </>
      );
}

export default Transaction;
