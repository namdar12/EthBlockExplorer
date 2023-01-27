import BlockInfo from './BlockInfo';
import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';


const settings = {
    apiKey: "4SMB-n5Z8rFCi7QqQI5b_1a6RC68tFrK", //process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);

// function ChainList(props) {
//     let blockNumber = props.location.state.blockNumber;

//     const fetchBlocks = async () => {
//         // Create an array of block number promises
//         const blockPromises = Array.from({length: 10}, (_, i) => {
//             console.log('HERE'+ blockNumber - i)
//             return alchemy.core.getBlock(blockNumber - i);
//         });
    
//         // Wait for all promises to resolve
//         const blocksArray = await Promise.all(blockPromises);
    
//         // Update the state with the retrieved blocks
//        return blocksArray
//     }
//     const blocks = fetchBlocks();
//     console.log('IN CHAIN')
//     console.log(blocks)
//     return (
//       <div>
//         <h1>HELLO WORLD</h1>
//       </div>
//     );
//   }


const ChainList = (props) => {
    let blockNumber = props.location.state.blockNumber;
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

    console.log('IN CHAIN')
    console.log(blocks)
    return (
        <div>
            <h1>
                Last 10 Blocks
            </h1>
            {blocks.map((block) => {
                return <BlockInfo key={block.blockNumber} block={block} />
            })}
        </div>
    );
}

export default ChainList;

