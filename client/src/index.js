//Copyright (c) 2022 Panshak Solomon

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers/'


const store = createStore(reducers, compose(applyMiddleware(thunk)))

// Default to the light sidebar theme variables.
document.body.classList.add('light')

ReactDOM.render(
  <Provider store={store} >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);