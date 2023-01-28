import BlockInfo from './BlockInfo';
import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useLocation,NavLink } from 'react-router-dom';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);


function ChainList (props) {
    console.log('THE  BLOCK NUMBER IS ')
    const blockNumber = props.location.state.blockNumber;
    console.log(blockNumber)
    const fetchBlocks = async () => {
        // Create an array of block number promises
        const blockPromises = Array.from({length: 10}, (_, i) => {
            console.log('HERE'+ blockNumber - i)
            return alchemy.core.getBlock(blockNumber - i);
        });
    
        // Wait for all promises to resolve
        const blocksArray = await Promise.all(blockPromises);
    
        // Update the state with the retrieved blocks
        return blocksArray
    }
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        fetchBlocks().then(blocksArray => setBlocks(blocksArray));
    }, []);

    return (
        <><div>
            <h1 className='Chain-Link-h1'>
                Last 10 Blocks
            </h1>
            {blocks.map((block) => {
                return <BlockInfo key={block.blockNumber} block={block} />;
            })}
        </div><div className='nav'>
                <NavLink to="/">HOME</NavLink>
                <NavLink to={{
                    pathname: '/gasestimator',
                    state: { blockNumber: blockNumber }
                }}>GAS</NavLink>
                <NavLink to={{
                    pathname: '/chain',
                    state: { blockNumber: blockNumber }
                }}>CHAIN</NavLink>
            </div></>
           
    );
}

export default ChainList;

