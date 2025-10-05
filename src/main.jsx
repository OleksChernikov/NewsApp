import React from 'react';
import ReactDOM from 'react-dom/client';
import NewsApp from './NewsApp';

import './index.css';

import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NewsApp />
    </Provider>
  </React.StrictMode>
);
