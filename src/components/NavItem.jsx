import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom'

class NavItem extends React.Component {

    render() {

        const {item} = this.props

        return (
            <ListItem
                button
                key={item.id}
                component={Link}
                to={item.url}>
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
            </ListItem>
        );
    }

}

NavItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default NavItem