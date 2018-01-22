import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom'
import { TcellComponent } from 'tcellcomponent'
import Home from 'views/Home'
import FormSample from 'views/FormSample'
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

const drawerWidth = 240;
const styles = theme => ({  
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    }
});
class PersistentDrawer extends TcellComponent {
    constructor(props){
        super(props);
        this.state = {
            open: props.open,
        };
        this.handleDrawerClose = this.handleDrawerClose.bind(this);       
    }   
    handleDrawerClose(){            
        this.setState({ open: false });
        this.props.contentShiftLeft();
    };
    componentWillReceiveProps(nextProps) { 
            const { open } =  nextProps;
           this.setState({ open });       
    }
    render() {     
        const { classes, theme } = this.props;
        return (
            <Drawer
                type="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                open={this.state.open}
            >
                <div>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                   { this.props.children }
                </div>
            </Drawer>
        );
    }
}
PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(PersistentDrawer);