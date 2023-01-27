import { useEffect, useState,React} from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import {  Link, NavLink } from 'react-router-dom';

const settings = {
  apiKey: "4SMB-n5Z8rFCi7QqQI5b_1a6RC68tFrK", //process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);



function GasEstimator(props){
  const blockNumber = props.location.state.blockNumber;
  const [gasPrice, setGasPrice] = useState();

  alchemy.core.getGasPrice().then((data)=>{setGasPrice(data);});

  //const blockNumber = useContext(blockNumber);
  console.log('HERE')
  console.log(gasPrice)
  console.log(gasPrice ? gasPrice._hex: '')

    return (
      <div>
        <h1>Current Gas Estimator: {gasPrice ?parseInt(gasPrice._hex): ''}</h1>
        <div className='nav'>
        <NavLink to="/">HOME</NavLink>
        <NavLink to={{pathname: '/gasestimator',
      state: { blockNumber: blockNumber }}}>GAS</NavLink>
        </div>
        </div>
    );
  
};

export default GasEstimator;

