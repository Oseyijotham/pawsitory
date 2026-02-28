import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components/App/App';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="pawsitory">
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') // Pass the root element here as the second argument
);
