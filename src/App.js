import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import reduxStore from './redux/store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CurrencyRate from './pages/CurrencyRate';

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={reduxStore}>
          <Router>
            <Route exact path="/" component={CurrencyRate} />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
