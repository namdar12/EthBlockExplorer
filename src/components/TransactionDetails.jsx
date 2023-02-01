import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);




function TransactionDetail(hash){
   const transactionHash = hash.location.state.hash
   //const blockNumber = hash.location.state.blockNumber

   const [transactionDetail,setTransactionDetail] = useState([]);
  // const [ blockNumber, setBlockNumber] = useState("")


    useEffect(()=>{

        async function getTransactionDetail(transactionHash) {
          setTransactionDetail(await alchemy.core.getTransactionReceipt(transactionHash));
        }

        getTransactionDetail(transactionHash)
      },[])
      //console.log(transactionHash)
      console.log('TransactionDetail')
      console.log(transactionDetail)
      console.log(transactionDetail.blockNumber)
      const blockNumber = transactionDetail.blockNumber;

    return(
       <> <div className='Transaction-Detail'>
       <h1>Transaction Details</h1>
        <div>Block Hash: {transactionDetail.blockHash}</div>
        <div>Contract Address: {transactionDetail.contractAddress ? transactionDetail.contractAddress : 'NULL'}</div>
       <div>Number: {transactionDetail.blockNumber}</div>
       <div>FROM: {transactionDetail.from}</div>
       <div>TO: {transactionDetail.to}</div>
       <div>Miner: {transactionDetail.transactionIndex}</div>
       </div>
         <div className='nav'>
         <NavLink to="/">HOME</NavLink>
         <NavLink to={{pathname: '/gasestimator',
                   state: { blockNumber: blockNumber }}
                   }>GAS</NavLink>
        <NavLink to={{pathname: '/chain',
                     state: { blockNumber: blockNumber }}
                    }>CHAIN</NavLink>
         </div>

       </> );
}

export default TransactionDetail;

