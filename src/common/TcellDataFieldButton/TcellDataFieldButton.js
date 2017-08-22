import React from 'react';
import PropTypes from 'prop-types';
import { observable, observe } from 'mobx';
import { observer } from "mobx-react";

import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import SearchIcon from 'material-ui-icons/Search';

import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import _ from 'lodash';

class TcellDataFieldButton extends React.Component {
    compState = observable({
        value: undefined,
        display: undefined,

    })
    // valueObserver = observe(this.compState, "value", (change) => {
    //     console.log("value changed to ", change.newValue);
    // });
    handleChange = () => { }

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
        const { onChange, value, dataSource, ...others } = this.props;
        this.handleChange = onChange;
        return (
            <List>
                <ListItem>
                    <TextField value={this.compState.display} readOnly  { ...others }></TextField>
                    <IconButton onClick={(event) => console.log("Hiii")}  aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </ListItem>
            </List>
        );
    };
}


TcellDataFieldButton.propTypes = {
    dataSource: PropTypes.array
}
TcellDataFieldButton.defaultProps = {
    dataSource: []
};
export default observer(TcellDataFieldButton);




