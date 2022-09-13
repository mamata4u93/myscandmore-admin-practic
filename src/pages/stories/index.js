import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const storiesRouteConfigs = [
    {
        path: '/stories/list',
        element: <Listings />,
    },
    {
        path: '/stories/add',
        element: <AddEdit />,
    },
    {
        path: '/stories/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/stories/view/:id',
        element: <Details />,
    },

];