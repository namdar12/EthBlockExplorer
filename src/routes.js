import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import BlockInfo from './components/BlockInfo';
import GasEstimator from './components/GasEstimator';
import Transaction from './components/TransactionInfo';
import TransactionDetail from './components/TransactionDetails';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={App} />
      <Route path="/gasestimator" component={GasEstimator} />
      <Route path="/chain" component={ChainRender}/>
      <Route path="/transaction" component={Transaction}/>
      <Route path="/details" component={TransactionDetail}/>
    </BrowserRouter>
  );
};

export default Routes;