import { Collapse, Icon, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import NavItem from './NavItem'

function needsToBeOpened(props) {
    return props.location && isUrlInChildren(props.item, props.location.pathname)
}

function isUrlInChildren(parent, url) {
    if ( !parent.children ) {
        return false;
    }

    for ( let i = 0; i < parent.children.length; i++ ) {
        if ( parent.children[i].children ) {
            if ( isUrlInChildren(parent.children[i], url) ) {
                return true;
            }
        }

        if ( parent.children[i].url === url || url.includes(parent.children[i].url) ) {
            return true;
        }
    }

    return false;
}

class NavCollapse extends React.Component {

    constructor(props) {
        super(props)
        this.state = {open: needsToBeOpened(this.props)};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( needsToBeOpened(this.props) ) {
            !prevState.open && this.setState({open: true});
        } else {
            prevState.open && this.setState({open: false});
        }
    }

    handleClick = () => {
        this.setState({open: !this.state.open})
    }

    render() {

        const {item} = this.props

        return (
            <div>
                <ListItem
                    button
                    onClick={this.handleClick}>
                    {
                        item.icon && !item.iconComponent &&
                        <ListItemIcon>
                            <Icon>{item.icon}</Icon>
                        </ListItemIcon>
                    }
                    {
                        item.iconComponent &&
                        <ListItemIcon>
                            {item.iconComponent}
                        </ListItemIcon>
                    }
                    <ListItemText primary={item.title} />
                    <IconButton>
                        <Icon>
                            {this.state.open ? 'expand_less' : 'expand_more'}
                        </Icon>
                    </IconButton>
                </ListItem>
                {item.children && (
                    <Collapse in={this.state.open} className="collapse-children">
                        {
                            item.children.map((item) => (

                                <React.Fragment key={item.id}>
                                    {item.type === 'collapse' && (
                                        <NavCollapse item={item} />
                                    )}

                                    {item.type === 'item' && (
                                        <NavItem item={item} />
                                    )}
                                </React.Fragment>
                            ))
                        }
                    </Collapse>
                )}
            </div>
        );
    }
}

NavCollapse.propTypes = {
    item: PropTypes.object.isRequired
};


export default NavCollapse