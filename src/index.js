import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route,BrowserRouter, Switch}  from 'react-router-dom';
import GasEstimator from './components/GasEstimator';
import BlockInfo from './components/BlockInfo';
import ChainList from './components/ChainList';



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/gasestimator" component={GasEstimator} />
    <Route path="/chain" component={ChainList}/>
  </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
//    <Route path="/gasestimator" component={GasEstimator} />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

