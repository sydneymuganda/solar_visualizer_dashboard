import React from 'react';
// Router -- using browser router for our application
import { createBrowserRouter } from 'react-router-dom';
// Pages -- get all pages available to render dynamically based on path
import App from './App.jsx';
import Overview from './pages/Overview.jsx';
import Energy from './pages/Energy.jsx';
import Water from './pages/Water.jsx';
import Statistics from './pages/Statistics.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import HistoricWater from './pages/HistoricWater.jsx';
import   MoreInfoPage from './pages/moreInfo.jsx';


// Routes -- object containing details for paths
export const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Overview />,
            },
            {
                path: 'energy',
                element: <Energy />,
            },
            {
                path: 'water',
                element: <Water />,
            },
            {
                path: 'historic-energy',
                element: <Statistics />,
            },
            {
                path: 'historic-water',
                element: <HistoricWater />,
            },
            {
                path: 'more-info',
                element: <MoreInfoPage />,
            },
        ],
    },
    {
        path:'*',
        element: <PageNotFound />,
    }
];

// Implementing the router with our routes
export const router = createBrowserRouter(routes);