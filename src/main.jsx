import React from 'react';
import ReactDOM from 'react-dom/client';
import NewsApp from './NewsApp';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <NewsApp />
  </React.StrictMode>
);
