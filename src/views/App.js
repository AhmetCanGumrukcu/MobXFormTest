import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { TcellComponent } from 'tcellcomponent'
import { device } from 'device.js/dist/device.es'
import Home from 'views/Home'
import FormSample from 'views/FormSample'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import PersistentDrawer from 'partials/PersistentDrawer'
import TemporaryDrawer from 'partials/TemporaryDrawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import { mailFolderListItems, otherMailFolderListItems } from './tileData'
import SimpleExpansionPanel from './collapsePanel';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
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
    },
    content: {
        width: '100%',
        marginLeft: -drawerWidth,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
    },
    fixContent: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
    },
    contentShift: {
        marginLeft: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
});

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            drawerOpen: false,
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.renderDesktop = this.renderDesktop.bind(this);
    }

    state = { open: true };
    get device(){
        return device;
    }
    handleDrawerOpen(){
        this.setState({ drawerOpen: true });       
    };
    handleDrawerClose(){        
        this.setState({ drawerOpen: false });       
    };
    renderDesktop() {
        const { classes, theme } = this.props;
        return <div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar className={classNames(classes.appBar, this.state.drawerOpen && classes.appBarShift)}>
                    <Toolbar disableGutters={!this.state.drawerOpen}>
                        <IconButton
                            color="contrast"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.drawerOpen && classes.hide)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" noWrap>
                            Persistent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <PersistentDrawer
                    open={this.state.drawerOpen}
                    contentShiftLeft={() => this.handleDrawerClose()}
                >
                    <Divider />
                    <div>
                        <SimpleExpansionPanel/>
                    </div>
                    <Divider />
                    
                </PersistentDrawer>
                <main className={classNames(classes.content, this.state.drawerOpen && classes.contentShift)}>
                    <Switch>
                        <Route path="/formsample" component={FormSample} />
                        <Route path="/" component={Home} />
                    </Switch>
                </main>
                
            </div>
        </div>
    }
    renderMobile() {
        const { classes, theme } = this.props;
        return <div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar className={classNames(classes.appBar)}>
                    <Toolbar>
                        <IconButton
                            color="contrast"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" noWrap>
                            Persistent drawer
            </Typography>
                    </Toolbar>
                </AppBar>
                <TemporaryDrawer
                    open={this.state.drawerOpen}
                >
                    <Divider />
                    <SimpleExpansionPanel/>
                    <Divider />
                </TemporaryDrawer>
                <main className={classNames(classes.fixContent)}>
                    <Switch>
                        <Route path="/formsample" component={FormSample} />
                        <Route path="/" component={Home} />
                    </Switch>
                </main>
            </div>
        </div>
    }
    render() {      
        let rendered = "";
        if (this.device.desktop) {
            rendered = this.renderDesktop();
        } else {
            rendered = this.renderMobile();
        }
        return (
            rendered
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);