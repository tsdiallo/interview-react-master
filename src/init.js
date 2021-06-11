import _ from 'lodash';
import React from 'react';
import {generateRoutesFromConfigs} from './utils'
import { DashboardConfig } from './containers/Dashboard/DashboardConfig';


const routeConfigs = [
    DashboardConfig
];


export const navigationConfig = [
    {
        'icon': 'dashboard',
        'id': 'dashboard-component',
        'title': 'Dashboard',
        'type': 'item',
        'url': '/dashboard'
    }
];


export const routes = [
    ...generateRoutesFromConfigs(routeConfigs),
    {
        // eslint-disable-next-line react/display-name
        component: () => <div />,
        path: '/',
    }
];


