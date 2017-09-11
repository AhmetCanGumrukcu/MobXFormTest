import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { observable, observe } from 'mobx';
import { observer } from "mobx-react";
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import SearchIcon from 'material-ui-icons/Search';
import DateRangeIcon from 'material-ui-icons/DateRange';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import _ from 'lodash';
import style from './style.css'

const styles = theme => ({
    root: {
        padding: 0
    }
});
class TcellDataFieldButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    compState = observable({
        value: undefined,
        display: undefined
    })
 
    handleChange(event) {
        event.preventDefault();
        event.stopPropagation();        
        debugger
        if (this.props.dataSource && this.props.dataSource.length > 0) {
            return;
        } else {
            this.props.onChange(event);
        }
    }

    handleClick(){       
        this.props.onClick();
    }

    setDisplayFromDatasource(dataSource, id) {
        if (dataSource && dataSource.length > 0) {
            let found = _.filter(dataSource, (item) => item.id === id);
            this.compState.display = found && found.length > 0 ? found[0].text : undefined;
        } else {
            this.compState.display = id;
        }
        //todo
        setTimeout(() => {
            let oldVal = this.compState.display;
            this.compState.display = "";
            this.compState.display = oldVal;
        }, 50)
    }
    componentDidMount() {
        const { dataSource, value } = this.props;
        this.compState.value = this.props.value;
        this.setDisplayFromDatasource(dataSource, value)
    }
    componentWillReceiveProps(nextProps) {      
        if (this.props.value != nextProps.value) {
            const { dataSource } = this.props;
            const { value } = nextProps;
            this.compState.value = value;
            this.setDisplayFromDatasource(dataSource, value)
        }
    }
    render() {
        const { onChange, onClick, value, dataSource, classes, ...others } = this.props;

        return (
            <ListItem classes={{ root: classes.root }}>
                <TextField value={ this.compState.display } onChange={ this.handleChange } readOnly  { ...others }></TextField>
                <IconButton onClick={ this.handleClick } aria-label="Search" className={ style.iconButton }>
                    <DateRangeIcon />
                </IconButton>
            </ListItem>
        );
    };
}
TcellDataFieldButton.propTypes = {
    dataSource: PropTypes.array
}
TcellDataFieldButton.defaultProps = {
    dataSource: []
};
export default withStyles(styles)(observer(TcellDataFieldButton));




