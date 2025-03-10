import React from 'react';
import UserTable from './pages/user_details/components/UserTable';
import { Provider } from 'react-redux';
import store from './pages/user_details/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      <UserTable />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
};

export default App;


