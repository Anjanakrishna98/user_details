// src/index.js

// import React from 'react';
// import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
// import { Provider } from 'react-redux';
// import store from './pages/user_details/store';
// import App from './App';

// const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);  // Create root using createRoot

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './pages/user_details/store'
import './index.css' //  Import Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
