import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import BlockInfo from './components/BlockInfo';
import GasEstimator from './components/GasEstimator';


const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={App} />
      <Route path="/gasestimator" component={GasEstimator} />
      <Route path="/chain" component={ChainList}/>
    </BrowserRouter>
  );
};

export default Routes;