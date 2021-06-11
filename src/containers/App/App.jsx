import React from 'react';
import Layout from '../../components/Lyout'
import {routes, navigationConfig} from '../../init'


const settings = {
    layout: {
        config: {
            scroll : 'content',
            navbar : {
                display : true,
                folded  : false,
                position: 'left'
            },
            toolbar: {
                display : true,
                style   : 'fixed',
                position: 'below'
            },
            footer : {
                display : true,
                style   : 'fixed',
                position: 'below'
            },
        }
    }
}



export default function App(props) {
    return <Layout routes={routes} navigationConfig={navigationConfig} {...props} settings={settings}/>
}

