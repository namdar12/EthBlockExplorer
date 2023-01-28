import React from 'react';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';





function BlockInfo({block}) {
  const blockNumber = block.number

  //const [blockNumber, setBlockNumber] = useState(block.blockNumber);
  const history = useHistory();
  console.log(blockNumber)
  const handleClick = () => {

   history.push("/transaction")
  //   {
  //     pathname: "/transaction",
  //     state: { prop: blockNumber }
  // });
  }
  //to={{pathname: '/transaction', state: { blockNumber: blockNumber }}} 
    return (
    <Link to={{pathname: '/transaction', state: { blockNumber: blockNumber }}} onClick={() => handleClick()}>
      <div className="block-info">
        <div className="block-info__nonce">{block.nonce}</div>
        <div className="block-info__hash">{block.hash}</div>
        <div className="block-info__number">{block.number}</div>
        <div>Nonce: {block.nonce}</div>
        <div>Hash: {block.hash}</div>
        <div>Number: {block.number}</div>
        <div>Parent Hash: {block.parentHash}</div>
        <div>SHA3 Uncles: {block.sha3Uncles}</div>
        <div>Logs Bloom: {block.logsBloom}</div>
        <div>Transactions Root: {block.transactions ? block.transactions[0] : ''}</div>
        <div>Transactions Root: {block.transactions ? block.transactions[1] : ''}</div>
        <div>Transactions Root: {block.transactions ? block.transactions[2] : ''}</div>
        <div>State Root: {block.stateRoot}</div>
        <div>Receipts Root: {block.receiptsRoot}</div>
        <div>Miner: {block.miner}</div>
        <div>Difficulty: {block.difficulty}</div>
        <div>Total Difficulty: {block.totalDifficulty}</div>
      </div>
      </Link>
    );
  }

export default BlockInfo;
