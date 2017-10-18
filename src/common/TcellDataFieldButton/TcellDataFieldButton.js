import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import SearchIcon from 'material-ui-icons/Search';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { TcellComponent } from 'tcellcomponent'
import filter from 'lodash/filter';
import style from './style.css'

const styles = theme => ({
    root: {
        padding: 0
    }
});

class ReadOnlyTextField extends TcellComponent {
    render() {
      const { value, ...others } = this.props;
      return (
        <TextField value={ value ? value : '' } { ...others }></TextField>
      )
    };
  }
class TcellDataFieldButton extends TcellComponent {
    constructor(props) {
        super(props);       
        this.handleClick = this.handleClick.bind(this);
        this.state = {           
            display: null
        };
    }

    handleClick() {
        this.props.onClick();
    }

    setDisplayFromDatasource(dataSource, id) {
        let display = null;
        if (id && dataSource && dataSource.length > 0) {
            let found = filter(dataSource, (item) => item.id === id);
            display = found && found.length > 0 ? found[0].text : null
        } else if (id) {
            display = id;
        }
        this.setState({ display: !display ? '' : display })

    }
    componentDidMount() {
        const { dataSource, value } = this.props;      
        this.setDisplayFromDatasource(dataSource, value)
        let inputNode = ReactDOM.findDOMNode(this.textField);
        let inputs = inputNode.querySelectorAll('input');
        try {
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute('readonly', 'readonly')
            }
        } catch (e) {
            alert(e);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.value != nextProps.value) {
            const { dataSource } = this.props;          
            this.setDisplayFromDatasource(dataSource, nextProps.value)
        }
    }
    render() {
        const { onClick, value, dataSource, classes, ...others } = this.props;

        return (
            <ListItem classes={{ root: classes.root }}>
                <ReadOnlyTextField ref={(r) => { this.textField = r }}
                    value={this.state.display}  { ...others }>
                </ReadOnlyTextField>
                <SearchIcon onClick ={ this.handleClick } />               
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
export default withStyles(styles)(TcellDataFieldButton);




