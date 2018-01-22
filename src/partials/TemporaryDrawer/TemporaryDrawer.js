import React from 'react';
import PropTypes from 'prop-types';
import { TcellComponent } from 'tcellcomponent'
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';

const styles = {
    list: {
        width: 250,
    },
    listFull: {
        width: 'auto',
    },
};

class TemporaryDrawer extends TcellComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
        };
    }
    toggleDrawer = () => {
        this.setState({ open: !this.state.open });
    }
    componentWillReceiveProps(nextProps) {
        const { open } = nextProps;
        this.setState({ open });
    }
    render() {
        const { classes } = this.props;
        return (
            <Drawer open={this.state.open} onRequestClose={this.toggleDrawer}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer}
                    onKeyDown={this.toggleDrawer}
                >
                    {this.props.children}
                </div>
            </Drawer>
        );
    }
}
TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(TemporaryDrawer);