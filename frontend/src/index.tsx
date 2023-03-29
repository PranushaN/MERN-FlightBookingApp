import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FlightDashBoard from './components/FlightsDashboard/FlightsDashboard';
import store from './app/store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/flights",
    element: <FlightDashBoard />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
