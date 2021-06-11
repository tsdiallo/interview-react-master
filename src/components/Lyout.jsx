import { AppBar, Divider, Drawer, Grid, IconButton, List, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { matchRoutes } from 'react-router-config';
import { Route, withRouter } from 'react-router-dom';


import NavItem from './NavItem'
import NavCollapse from './NavCollapse'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: 0,
    },
})


class Layout extends React.Component {

    constructor(props) {
        super(props)

        this.routeSettingsCheck()

        this.state = {
            open: true,
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    }

    handleDrawerClose = () => {
        this.setState({ open: false });
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.location.pathname, prevProps.location.pathname)) {
            this.routeSettingsCheck();
        }
    }

    routeSettingsCheck = () => {


        // const matched = matchRoutes(this.props.routes, this.props.location.pathname)[0];

        // if (matched && matched.route.settings) {
        //     const routeSettings = _.merge({}, this.props.settings, matched.route.settings);
        //     if (!_.isEqual(this.props.settings, routeSettings)) {
        //         this.props.dispatch({type: 'SET_SETTINGS', value: _.merge({}, routeSettings)})
        //     }
        // }
    }


    render () {

        const { classes, extraProfilMenuItems, navigationConfig, theme, routes, settings } = this.props;

        return (
            <div className={classes.root}>
                {settings.layout.config.toolbar.display && <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>}
                {settings.layout.config.navbar.display && <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {navigationConfig.map((navigation) => {


                            if (navigation.type === 'item') {
                                return <NavItem key={navigation.id} item={navigation} />
                            }

                            if (navigation.type === 'collapse') {
                                return <NavCollapse key={navigation.id} item={navigation} />
                            }

                            if (navigation.type === 'divider') {
                                return (
                                    <Divider key={navigation.id} />
                                )
                            }

                            return null
                        })}
                    </List>
                </Drawer>}
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className="router-content">
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                {...route}
                            />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
}



export default withStyles(styles, { withTheme: true })(withRouter(Layout))